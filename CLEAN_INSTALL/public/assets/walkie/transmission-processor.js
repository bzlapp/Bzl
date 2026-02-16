/* eslint-disable no-undef */
class XorShift32 {
  constructor(seed) {
    this.state = (seed >>> 0) || 0x12345678;
  }
  nextU32() {
    let x = this.state >>> 0;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    this.state = x >>> 0;
    return this.state;
  }
  nextFloat() {
    return (this.nextU32() >>> 0) / 0xffffffff;
  }
  nextSigned() {
    return this.nextFloat() * 2 - 1;
  }
}
function dbToLin(db) {
  return Math.pow(10, db / 20);
}
function clamp(x, a, b) {
  return Math.min(b, Math.max(a, x));
}
function softClipTanh(x) {
  return Math.tanh(x);
}

class TransmissionSatProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      { name: "drive", defaultValue: 0.25, minValue: 0, maxValue: 1, automationRate: "k-rate" },
      { name: "asym", defaultValue: 0.1, minValue: 0, maxValue: 1, automationRate: "k-rate" },
      { name: "mix", defaultValue: 1, minValue: 0, maxValue: 1, automationRate: "k-rate" },
    ];
  }
  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];
    const out = output[0];
    const in0 = input?.[0];
    if (!out) return true;
    const drive = parameters.drive[0] ?? 0.25;
    const asym = parameters.asym[0] ?? 0.1;
    const mix = parameters.mix[0] ?? 1;
    const pre = 1 + drive * 10.5;
    const bias = asym * 0.18;
    const dryMix = 1 - clamp(mix, 0, 1);
    const wetMix = clamp(mix, 0, 1);
    for (let i = 0; i < out.length; i++) {
      const x = in0 ? in0[i] : 0;
      const y = softClipTanh((x + bias) * pre) - bias * 0.45;
      out[i] = clamp(x * dryMix + y * wetMix, -1, 1);
    }
    return true;
  }
}
class WalkieClickProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      { name: "walkieEnable", defaultValue: 0, minValue: 0, maxValue: 1, automationRate: "k-rate" },
      { name: "thresholdDb", defaultValue: -45, minValue: -80, maxValue: -20, automationRate: "k-rate" },
      { name: "minSilenceMs", defaultValue: 220, minValue: 80, maxValue: 600, automationRate: "k-rate" },
      { name: "clickMs", defaultValue: 12, minValue: 5, maxValue: 200, automationRate: "k-rate" },
      { name: "clickLevel", defaultValue: 0.6, minValue: 0, maxValue: 1, automationRate: "k-rate" },
      { name: "dispatchMode", defaultValue: 0, minValue: 0, maxValue: 1, automationRate: "k-rate" },
    ];
  }
  constructor(options) {
    super();
    const seed = (options?.processorOptions?.seed ?? 0xdecafbad) >>> 0;
    this.prng = new XorShift32(seed);
    this.rmsWindowSamples = Math.max(1, Math.floor(sampleRate * 0.01));
    this.ring = new Float32Array(this.rmsWindowSamples);
    this.ringIndex = 0;
    this.sumSquares = 0;
    this.belowCount = 0;
    this.inSilence = false;
    this.clickRemaining = 0;
    this.clickTotal = 0;
    this.clickAmp = 0;
    this.clickFreq = 1800;
    this.clickPhase = 0;
    this.noiseHpState = 0;
    this.port.onmessage = (ev) => {
      const msg = ev.data;
      if (msg?.type === "reset") {
        this.prng = new XorShift32((msg.seed ?? 0) >>> 0);
        this.sumSquares = 0;
        this.ring.fill(0);
        this.ringIndex = 0;
        this.belowCount = 0;
        this.inSilence = false;
        this.clickRemaining = 0;
        this.noiseHpState = 0;
      }
    };
  }
  _triggerClick(clickMs, clickLevel) {
    this.clickTotal = Math.max(1, Math.floor((clickMs / 1000) * sampleRate));
    this.clickRemaining = this.clickTotal;
    this.clickAmp = clickLevel * (0.55 + 0.55 * this.prng.nextFloat());
    this.clickFreq = 1300 + this.prng.nextFloat() * 1600;
    this.clickPhase = this.prng.nextFloat() * Math.PI * 2;
  }
  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];
    const out = output[0];
    if (!out) return true;
    const enable = (parameters.walkieEnable[0] ?? 0) >= 0.5;
    const threshold = dbToLin(parameters.thresholdDb[0] ?? -45);
    const minSilenceSamples = Math.max(1, Math.floor(((parameters.minSilenceMs[0] ?? 220) / 1000) * sampleRate));
    const dispatch = (parameters.dispatchMode[0] ?? 0) >= 0.5;
    const clickMs = parameters.clickMs[0] ?? 12;
    const clickLevel = parameters.clickLevel[0] ?? 0.6;
    const inChans = input?.length ? input.length : 0;
    const in0 = inChans > 0 ? input[0] : null;
    const in1 = inChans > 1 ? input[1] : null;
    for (let i = 0; i < out.length; i++) {
      const dry = in0 ? (in1 ? 0.5 * (in0[i] + in1[i]) : in0[i]) : 0;
      const old = this.ring[this.ringIndex];
      const x2 = dry * dry;
      this.ring[this.ringIndex] = x2;
      this.ringIndex = (this.ringIndex + 1) % this.rmsWindowSamples;
      this.sumSquares += x2 - old;
      const rms = Math.sqrt(Math.max(0, this.sumSquares / this.rmsWindowSamples));
      if (enable) {
        if (rms < threshold) this.belowCount++;
        else this.belowCount = 0;
        const nowSilence = this.belowCount >= minSilenceSamples;
        if (!this.inSilence && nowSilence) {
          this.inSilence = true;
          this._triggerClick(clickMs, clickLevel);
        } else if (this.inSilence && rms >= threshold * 1.15) {
          this.inSilence = false;
          this.belowCount = 0;
          this._triggerClick(clickMs, clickLevel);
        }
      } else {
        this.inSilence = false;
        this.belowCount = 0;
      }
      let y = dry;
      if (this.clickRemaining > 0) {
        const t = 1 - this.clickRemaining / this.clickTotal;
        const n = this.prng.nextSigned() * 0.10;
        const hp = (n - this.noiseHpState) + 0.995 * this.noiseHpState;
        this.noiseHpState = n;
        if (dispatch) {
          // Dispatch-style two-tone beep (short "dee-doo"), still clipped and noisy.
          const aHz = 1150 + this.prng.nextSigned() * 25;
          const bHz = 820 + this.prng.nextSigned() * 18;
          const split = 0.52;
          const hz = t < split ? aHz : bHz;
          const env = Math.sin(Math.min(1, t * 12) * Math.PI * 0.5) * Math.sin(Math.min(1, (1 - t) * 10) * Math.PI * 0.5);
          this.clickPhase += (2 * Math.PI * hz) / sampleRate;
          const s = Math.sin(this.clickPhase);
          const beep = softClipTanh((s * 0.95 + hp * 0.35) * (this.clickAmp * 2.4)) * env;
          y += beep;
        } else {
          // Click/squelch pop (very short transient).
          const env = Math.exp(-t * 14);
          const s = Math.sin(this.clickPhase);
          this.clickPhase += (2 * Math.PI * this.clickFreq) / sampleRate;
          const click = softClipTanh((s * 0.85 + hp) * (this.clickAmp * 3.2)) * env;
          y += click;
        }
        this.clickRemaining--;
      }
      out[i] = clamp(y, -1, 1);
    }
    return true;
  }
}

function clampFreq(hz) {
  return clamp(hz, 40, sampleRate * 0.45);
}

class SvfBandpass {
  constructor() {
    this.ic1 = 0;
    this.ic2 = 0;
  }
  reset() {
    this.ic1 = 0;
    this.ic2 = 0;
  }
  process(input, freqHz, q) {
    const f = clampFreq(freqHz);
    const g = Math.tan((Math.PI * f) / sampleRate);
    const k = 1 / Math.max(0.08, q);
    const v0 = input - this.ic2;
    const v1 = (g * v0 + this.ic1) / (1 + g * (g + k));
    const v2 = this.ic2 + g * v1;
    this.ic1 = 2 * v1 - this.ic1;
    this.ic2 = 2 * v2 - this.ic2;
    return v1;
  }
}

class TuningNoiseProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      { name: "enable", defaultValue: 0, minValue: 0, maxValue: 1, automationRate: "k-rate" },
      { name: "mode", defaultValue: 0, minValue: 0, maxValue: 1, automationRate: "k-rate" }, // 0 edges, 1 search
      { name: "source", defaultValue: 0, minValue: 0, maxValue: 1, automationRate: "k-rate" }, // 0 synth, 1 sample
      { name: "amount", defaultValue: 0.35, minValue: 0, maxValue: 1, automationRate: "k-rate" },
      { name: "snippetMs", defaultValue: 140, minValue: 40, maxValue: 600, automationRate: "k-rate" },
      { name: "cutDepth", defaultValue: 0.55, minValue: 0, maxValue: 1, automationRate: "k-rate" },
    ];
  }

  constructor(options) {
    super();
    const seed = (options?.processorOptions?.seed ?? 0x71c19e51) >>> 0;
    this.prng = new XorShift32(seed);
    const p = options?.processorOptions ?? {};
    const initialSample = p.sampleData;
    const initialRate = p.sampleRate;
    const leadEnd = Number(p.leadEnd);
    const tailStart = Number(p.tailStart);
    this.sampleData =
      initialSample instanceof Float32Array
        ? initialSample
        : initialSample instanceof ArrayBuffer
          ? new Float32Array(initialSample)
          : null;
    this.sampleRate = Number.isFinite(initialRate) ? Number(initialRate) : 0;

    this.sampleIndex = 0;
    this.leadEnd = Number.isFinite(leadEnd) ? Math.max(0, Math.floor(leadEnd)) : 0;
    this.tailStart = Number.isFinite(tailStart) ? Math.max(0, Math.floor(tailStart)) : Number.POSITIVE_INFINITY;

    this.eventRemaining = 0;
    this.eventTotal = 0;
    this.f0 = 1200;
    this.f1 = 3200;
    this.q = 6;
    this.phase = 0;
    this.playPos = 0;
    this.playStep = 1;
    this.svf = new SvfBandpass();

    this.port.onmessage = (ev) => {
      const msg = ev.data;
      if (msg?.type === "reset") {
        this.prng = new XorShift32((msg.seed ?? 0) >>> 0);
        this.sampleIndex = 0;
        this.eventRemaining = 0;
        this.eventTotal = 0;
        this.phase = 0;
        this.playPos = 0;
        this.playStep = 1;
        this.svf.reset();
      } else if (msg?.type === "setEdges") {
        const leadEnd = Number(msg.leadEnd);
        const tailStart = Number(msg.tailStart);
        if (Number.isFinite(leadEnd)) this.leadEnd = Math.max(0, Math.floor(leadEnd));
        if (Number.isFinite(tailStart)) this.tailStart = Math.max(0, Math.floor(tailStart));
      } else if (msg?.type === "setSample") {
        const sr = Number(msg.sampleRate);
        const data = msg.data;
        this.sampleData = data instanceof Float32Array ? data : null;
        this.sampleRate = Number.isFinite(sr) ? sr : 0;
      }
    };
  }

  _triggerEvent(snippetMs) {
    this.eventTotal = Math.max(8, Math.floor((snippetMs / 1000) * sampleRate));
    this.eventRemaining = this.eventTotal;
    const r = this.prng.nextFloat();
    const s = this.prng.nextFloat();
    this.f0 = 250 + r * 3500;
    this.f1 = 600 + s * 7000;
    if (this.prng.nextFloat() < 0.5) {
      const tmp = this.f0;
      this.f0 = this.f1;
      this.f1 = tmp;
    }
    this.q = 4 + this.prng.nextFloat() * 8;
    this.phase = this.prng.nextFloat() * Math.PI * 2;
    this.svf.reset();
  }

  _sampleAt(pos) {
    const d = this.sampleData;
    if (!d || d.length < 4) return 0;
    let p = pos % d.length;
    if (p < 0) p += d.length;
    const i0 = p | 0;
    const frac = p - i0;
    const i1 = (i0 + 1) % d.length;
    const a = d[i0];
    const b = d[i1];
    return a + (b - a) * frac;
  }

  _eventEnv(t) {
    const a = Math.min(1, t / 0.08);
    const b = Math.min(1, (1 - t) / 0.12);
    return Math.sin(a * Math.PI * 0.5) * Math.sin(b * Math.PI * 0.5);
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];
    const out = output[0];
    const in0 = input?.[0];
    if (!out) return true;

    const enable = (parameters.enable[0] ?? 0) >= 0.5;
    const mode = (parameters.mode[0] ?? 0) >= 0.5 ? 1 : 0;
    const srcMode = (parameters.source[0] ?? 0) >= 0.5 ? 1 : 0;
    const amount = clamp(parameters.amount[0] ?? 0.35, 0, 1);
    const snippetMs = parameters.snippetMs[0] ?? 140;
    const cutDepth = clamp(parameters.cutDepth[0] ?? 0.55, 0, 1);

    const ratePerSec = 0.08 + 5.5 * amount * amount;
    const pPerSample = ratePerSec / sampleRate;

    for (let i = 0; i < out.length; i++) {
      const x = in0 ? in0[i] : 0;

      if (enable && mode === 1 && this.eventRemaining <= 0 && this.prng.nextFloat() < pPerSample) {
        this._triggerEvent(snippetMs);
      }
      if (enable && mode === 0 && this.eventRemaining <= 0) {
        const inEdge = this.sampleIndex < this.leadEnd || this.sampleIndex >= this.tailStart;
        if (inEdge) this._triggerEvent(snippetMs);
      }

      let y = x;
      if (enable && this.eventRemaining > 0) {
        const t = 1 - this.eventRemaining / this.eventTotal;
        const env = this._eventEnv(t);

        // If using a provided tuning sample, just cut it in (no extra resonant sweeping).
        const chosen = srcMode === 1 && this.sampleData && this.sampleRate > 0 ? { sampleRate: this.sampleRate, data: this.sampleData } : null;
        if (chosen && chosen.data instanceof Float32Array && Number.isFinite(chosen.sampleRate) && chosen.sampleRate > 0) {
          if (this.eventRemaining === this.eventTotal) {
            const start = Math.floor(this.prng.nextFloat() * chosen.data.length);
            const ratio = chosen.sampleRate / sampleRate;
            const varRatio = 0.92 + 0.16 * this.prng.nextFloat();
            this.playPos = start;
            this.playStep = ratio * varRatio;
          }
          const prev = this.sampleData;
          const prevSr = this.sampleRate;
          this.sampleData = chosen.data;
          this.sampleRate = chosen.sampleRate;
          const s = this._sampleAt(this.playPos);
          this.playPos += this.playStep;
          this.sampleData = prev;
          this.sampleRate = prevSr;
          const hiss = this.prng.nextSigned() * (0.02 + 0.06 * amount);
          const noise = softClipTanh((s * (0.9 + 1.8 * amount) + hiss) * 1.1) * env;

          if (mode === 1) {
            const duck = 1 - cutDepth * env;
            y = x * duck + noise * (0.75 + 0.65 * amount);
          } else {
            y = x + noise * (0.55 + 0.75 * amount);
          }
        } else {
          // Synth tuning: swept, bandpassed noise (intentionally resonant).
          const f = this.f0 + (this.f1 - this.f0) * t;
          const src = this.prng.nextSigned();
          const bp = this.svf.process(src, f, this.q);
          const osc = Math.sin(this.phase) * 0.12;
          this.phase += (2 * Math.PI * (40 + 70 * amount)) / sampleRate;
          const noise = softClipTanh((bp * 2.2 + osc) * (0.6 + 1.6 * amount)) * env;

          if (mode === 1) {
            const duck = 1 - cutDepth * env;
            y = x * duck + noise * (0.55 + 0.65 * amount);
          } else {
            y = x + noise * (0.45 + 0.75 * amount);
          }
        }

        this.eventRemaining--;
      }

      out[i] = clamp(y, -1, 1);
      this.sampleIndex++;
    }

    return true;
  }
}
class TransmissionPostProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      { name: "drive", defaultValue: 0.35, minValue: 0, maxValue: 1, automationRate: "k-rate" },
      { name: "asym", defaultValue: 0.1, minValue: 0, maxValue: 1, automationRate: "k-rate" },
      { name: "comp", defaultValue: 0.25, minValue: 0, maxValue: 1, automationRate: "k-rate" },
      { name: "crush", defaultValue: 0, minValue: 0, maxValue: 1, automationRate: "k-rate" },
      { name: "badAmount", defaultValue: 0.25, minValue: 0, maxValue: 1, automationRate: "k-rate" },
      { name: "wowDepth", defaultValue: 0.25, minValue: 0, maxValue: 1, automationRate: "k-rate" },
      { name: "dropRate", defaultValue: 0.25, minValue: 0, maxValue: 1, automationRate: "k-rate" },
      { name: "dropDepth", defaultValue: 0.35, minValue: 0, maxValue: 1, automationRate: "k-rate" },
      { name: "crackle", defaultValue: 0.25, minValue: 0, maxValue: 1, automationRate: "k-rate" },
      { name: "lfoRate", defaultValue: 0.7, minValue: 0.1, maxValue: 3, automationRate: "k-rate" },
      { name: "noise", defaultValue: 0.2, minValue: 0, maxValue: 1, automationRate: "k-rate" },
      { name: "noiseColor", defaultValue: 0, minValue: 0, maxValue: 1, automationRate: "k-rate" },
      { name: "hiss", defaultValue: 0.2, minValue: 0, maxValue: 1, automationRate: "k-rate" },
      { name: "outGain", defaultValue: 0.9, minValue: 0, maxValue: 1.5, automationRate: "k-rate" },
    ];
  }
  constructor(options) {
    super();
    const seed = (options?.processorOptions?.seed ?? 0xdecafbad) >>> 0;
    this.prng = new XorShift32(seed);
    this.env = 0;
    this.lfoPhase = 0;
    this.dropoutRemaining = 0;
    this.dropoutTotal = 0;
    this.dropoutDepth = 1;
    this.crackleRemaining = 0;
    this.crackleTotal = 0;
    this.p0 = 0;
    this.p1 = 0;
    this.p2 = 0;
    this.p3 = 0;
    this.p4 = 0;
    this.p5 = 0;
    this.p6 = 0;
    this.prevNoise = 0;
    this.crushHold = 0;
    this.crushPhase = 0;
    this.port.onmessage = (ev) => {
      const msg = ev.data;
      if (msg?.type === "reset") {
        this.prng = new XorShift32((msg.seed ?? 0) >>> 0);
        this.env = 0;
        this.lfoPhase = 0;
        this.dropoutRemaining = 0;
        this.crackleRemaining = 0;
        this.p0 = this.p1 = this.p2 = this.p3 = this.p4 = this.p5 = this.p6 = 0;
        this.prevNoise = 0;
        this.crushHold = 0;
        this.crushPhase = 0;
      }
    };
  }
  _pinkFromWhite(white) {
    this.p0 = 0.99886 * this.p0 + white * 0.0555179;
    this.p1 = 0.99332 * this.p1 + white * 0.0750759;
    this.p2 = 0.969 * this.p2 + white * 0.153852;
    this.p3 = 0.8665 * this.p3 + white * 0.3104856;
    this.p4 = 0.55 * this.p4 + white * 0.5329522;
    this.p5 = -0.7616 * this.p5 - white * 0.016898;
    const pink = this.p0 + this.p1 + this.p2 + this.p3 + this.p4 + this.p5 + this.p6 + white * 0.5362;
    this.p6 = white * 0.115926;
    return pink * 0.11;
  }
  _maybeTriggerDropout(rateAmount, depthAmount) {
    if (rateAmount <= 0) return;
    if (this.dropoutRemaining > 0) return;
    const ratePerSec = 0.15 + 1.9 * rateAmount * rateAmount;
    const p = ratePerSec / sampleRate;
    if (this.prng.nextFloat() < p) {
      const ms = 18 + 140 * rateAmount;
      this.dropoutTotal = Math.max(1, Math.floor((ms / 1000) * sampleRate));
      this.dropoutRemaining = this.dropoutTotal;
      const minGain = 1 - clamp(depthAmount, 0, 1) * 0.95;
      this.dropoutDepth = clamp(minGain * (0.78 + 0.22 * this.prng.nextFloat()), 0.02, 1);
    }
  }
  _maybeTriggerCrackle(amount) {
    if (amount <= 0) return;
    if (this.crackleRemaining > 0) return;
    const ratePerSec = 0.35 + 7.5 * amount * amount;
    const p = ratePerSec / sampleRate;
    if (this.prng.nextFloat() < p) {
      const ms = 2 + 10 * amount;
      this.crackleTotal = Math.max(1, Math.floor((ms / 1000) * sampleRate));
      this.crackleRemaining = this.crackleTotal;
    }
  }
  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];
    const out = output[0];
    const in0 = input?.[0];
    if (!out) return true;
    const drive = parameters.drive[0] ?? 0.35;
    const asym = parameters.asym[0] ?? 0.1;
    const comp = parameters.comp[0] ?? 0.25;
    const crush = parameters.crush[0] ?? 0;
    const badAmount = parameters.badAmount[0] ?? 0.25;
    const wowCtrl = parameters.wowDepth[0] ?? badAmount;
    const dropRateCtrl = parameters.dropRate[0] ?? badAmount;
    const dropDepthCtrl = parameters.dropDepth[0] ?? badAmount;
    const crackleCtrl = parameters.crackle[0] ?? badAmount;
    const lfoRate = parameters.lfoRate[0] ?? 0.7;
    const noise = parameters.noise[0] ?? 0.2;
    const noiseColor = parameters.noiseColor[0] ?? 0;
    const hiss = parameters.hiss[0] ?? 0.2;
    const outGain = parameters.outGain[0] ?? 0.9;
    const pre = 1 + drive * 12;
    const bias = asym * 0.22;
    const compAmt = comp * 0.75;
    const thr = 0.18 + (1 - drive) * 0.16;
    const attack = Math.exp(-1 / (sampleRate * (0.003 + 0.01 * (1 - drive))));
    const release = Math.exp(-1 / (sampleRate * (0.06 + 0.16 * (1 - drive))));
    const wowDepth = clamp(wowCtrl, 0, 1) * 0.45;
    const dropRate = clamp(dropRateCtrl, 0, 1);
    const dropDepth = clamp(dropDepthCtrl, 0, 1);
    const crackleAmount = clamp(crackleCtrl, 0, 1);

    const crushAmt = clamp(crush, 0, 1);
    const bits = Math.round(16 - crushAmt * 12);
    const quant = Math.pow(2, Math.max(1, bits - 1));
    const downsample = Math.max(1, Math.round(1 + crushAmt * 15));
    const noiseLevel = noise * 0.12;
    const pinkMix = clamp(noiseColor, 0, 1);
    const hissAmt = hiss * 0.6;
    for (let i = 0; i < out.length; i++) {
      const xIn = in0 ? in0[i] : 0;
      let x = (xIn + bias) * pre;
      const a = Math.abs(x);
      const coeff = a > this.env ? attack : release;
      this.env = a + coeff * (this.env - a);
      let g = 1;
      if (this.env > thr) g = 1 / (1 + compAmt * (this.env - thr) * 4.2);
      x = softClipTanh(x * g) - bias * 0.5;

      if (crushAmt > 0.0001) {
        if (this.crushPhase === 0) {
          this.crushHold = clamp(Math.round(x * quant) / quant, -1, 1);
        }
        this.crushPhase = (this.crushPhase + 1) % downsample;
        x = this.crushHold;
      } else {
        this.crushPhase = 0;
        this.crushHold = x;
      }

      this._maybeTriggerDropout(dropRate, dropDepth);
      this._maybeTriggerCrackle(crackleAmount);
      this.lfoPhase += (2 * Math.PI * lfoRate) / sampleRate;
      if (this.lfoPhase > Math.PI * 2) this.lfoPhase -= Math.PI * 2;
      const wow = 1 - wowDepth * (0.5 + 0.5 * Math.sin(this.lfoPhase));
      let drop = 1;
      if (this.dropoutRemaining > 0) {
        const t = 1 - this.dropoutRemaining / this.dropoutTotal;
        const fade = t < 0.2 ? t / 0.2 : t > 0.85 ? (1 - t) / 0.15 : 1;
        drop = 1 - (1 - this.dropoutDepth) * fade;
        this.dropoutRemaining--;
      }
      let crackle = 0;
      if (this.crackleRemaining > 0) {
        const t = 1 - this.crackleRemaining / this.crackleTotal;
        const env = (t < 0.15 ? t / 0.15 : 1) * (t > 0.7 ? (1 - t) / 0.3 : 1);
        crackle = this.prng.nextSigned() * (0.10 + 0.30 * crackleAmount) * env;
        this.crackleRemaining--;
      }
      const wn = this.prng.nextSigned();
      const pn = this._pinkFromWhite(wn);
      const n = (1 - pinkMix) * wn + pinkMix * pn;
      const hissHp = n - this.prevNoise;
      this.prevNoise = n;
      const noiseOut = n * noiseLevel + hissHp * (noiseLevel * hissAmt);
      let y = x * wow * drop + crackle + noiseOut;
      y *= outGain;
      out[i] = clamp(y, -1, 1);
    }
    return true;
  }
}
registerProcessor("walkie-click", WalkieClickProcessor);
registerProcessor("transmission-sat", TransmissionSatProcessor);
registerProcessor("transmission-post", TransmissionPostProcessor);
registerProcessor("tuning-noise", TuningNoiseProcessor);
