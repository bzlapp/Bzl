# Use a lightweight Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Create the data directory so permissions can be set if needed
# (Though server.js creates it if missing, doing it here ensures the volume mount point exists)
RUN mkdir -p data

ENV PORT=3000

# Expose the default port
EXPOSE ${PORT}

# persist data
VOLUME ["/app/data"]

# Start the server
CMD ["npm", "start"]
