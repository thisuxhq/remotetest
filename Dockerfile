# Use the Bun official image
# https://hub.docker.com/_/bun
FROM oven/bun:1

# Create and change to the app directory.
WORKDIR /app

# Copy the files to the container image
COPY package*.json bun.lockb ./

# Install packages
RUN bun install --frozen-lockfile

# Copy local code to the container image.
COPY . ./

# Build the app.
RUN bun run build

# Serve the app
CMD ["bun", "run", "start"]