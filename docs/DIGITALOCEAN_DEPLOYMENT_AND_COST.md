# Bzl on DigitalOcean with a Domain (Setup + Cost Guide)

Last updated: February 22, 2026

This guide covers:
- starting Bzl on a DigitalOcean droplet
- attaching a domain with Caddy HTTPS
- running multiple Bzl instances on one droplet
- estimating monthly cost based on usage

---

## 1) Provision the droplet

Recommended baseline for production:
- Ubuntu 24.04 LTS
- 2 vCPU / 2 GB RAM (or higher if you run multiple active instances)
- Docker + Docker Compose installed

On first login:

```bash
apt update && apt upgrade -y
apt install -y git curl
```

If Docker is not installed yet:

```bash
curl -fsSL https://get.docker.com | sh
```

---

## 2) Deploy a single Bzl instance

```bash
cd /root
git clone https://github.com/bzlapp/Bzl.git
cd /root/Bzl
cp .env.example .env
```

Edit `.env` and set at least:
- `PORT=3000`
- `HOST=0.0.0.0`
- `REGISTRATION_CODE=<your-code>`

Then start:

```bash
docker compose up -d --build --remove-orphans
curl -fsS http://127.0.0.1:3000/api/health
```

---

## 3) Point your domain to the droplet

Create DNS `A` records:
- `chat.example.com -> <droplet_public_ip>`
- (optional stream hostname) `stream.chat.example.com -> <droplet_public_ip>`

If you use Cloudflare:
- Keep normal web hostnames proxied if you want Cloudflare proxy features.
- For TURN/real-time UDP endpoints, use **DNS only**.

---

## 4) Configure Caddy HTTPS reverse proxy

Install Caddy if needed:

```bash
apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
apt update && apt install -y caddy
```

Example `/etc/caddy/Caddyfile`:

```caddy
chat.example.com {
  reverse_proxy 127.0.0.1:3000
}
```

Apply:

```bash
caddy fmt --overwrite /etc/caddy/Caddyfile
systemctl reload caddy
```

---

## 5) Add more Bzl instances on the same droplet

Create each instance:

```bash
cd /root/Bzl
npm run instance:create -- --path=/opt/bzl-community1 --port=3002 --registration-code='community1' --hostname=community1.example.com
npm run instance:create -- --path=/opt/bzl-community2 --port=3003 --registration-code='community2' --hostname=community2.example.com
```

Then add Caddy routes:

```caddy
community1.example.com {
  reverse_proxy 127.0.0.1:3002
}

community2.example.com {
  reverse_proxy 127.0.0.1:3003
}
```

Reload Caddy and verify each `/api/health`.

---

## 6) Update all instance folders at once

```bash
cd /root/Bzl
npm ci --omit=dev
npm run instances:update -- --roots=/root,/srv,/opt,/home --max-depth=7 --dry-run
npm run instances:update -- --roots=/root,/srv,/opt,/home --max-depth=7
```

Fast restart without pull/build:

```bash
npm run instances:update -- --roots=/root,/srv,/opt,/home --max-depth=7 --skip-git --skip-build
```

---

## 7) Monthly cost model (DigitalOcean)

Use this formula:

`monthly_total = droplet + backups(optional) + block_storage(optional) + transfer_overage(optional) + domain`

### Droplet baseline pricing inputs

DigitalOcean Basic Droplets are shown at:
- `$4/mo` (1 vCPU / 512 MiB / 10 GiB SSD / 500 GiB transfer)
- `$6/mo` (1 vCPU / 1 GiB / 25 GiB SSD / 1,000 GiB transfer)
- `$12/mo` (1 vCPU / 2 GiB / 50 GiB SSD / 2,000 GiB transfer)

Bandwidth overage is listed as `$0.01/GiB` after included transfer.

Optional services:
- Droplet backups: `20%` of droplet price
- Block Storage: starts at `$10/month`

### Example monthly scenarios

1. Small private community (single instance)
- Droplet: `$6`
- Backups: `$1.20`
- Total infra (before domain): **`$7.20/month`**

2. Multiple communities on one droplet (3-4 low/medium traffic instances)
- Droplet: `$12`
- Backups: `$2.40`
- Total infra (before domain): **`$14.40/month`**

3. Heavier usage with extra storage
- Droplet: `$24` (or higher tier)
- Backups: `$4.80`
- Block storage: `$10`
- Total infra (before domain/overage): **`$38.80/month`**

Domain cost depends on registrar + TLD and is billed separately.

---

## 8) Cost control tips

- Start at one droplet tier up from your minimum acceptable RAM.
- Enable backups only for instances you cannot quickly recreate.
- Keep uploads bounded with Bzl upload limits and retention policies.
- Watch transfer and disk usage monthly; upgrade before CPU/RAM saturation.

---

## References

- DigitalOcean Droplet pricing: https://www.digitalocean.com/pricing/droplets
- DigitalOcean pricing calculator: https://www.digitalocean.com/pricing/calculator
- DigitalOcean bandwidth overage + backups + storage examples: https://docs.digitalocean.com/products/droplets/details/pricing/
