# # 1. Start from the official Bun image (Ubuntu-based)
# FROM oven/bun:latest

# # 2. Set working directory
# WORKDIR /app

# # 3. Copy only dependency files first (BETTER CACHING)
# COPY package.json bun.lockb ./

# # 4. Force native modules to build from source
# ENV npm_config_build_from_source=true

# # 5. Install dependencies (CACHED LAYER - only invalidates when package.json/bun.lockb changes)
# RUN bun install

# # 6. Copy rest of project files (this layer changes often but dependencies are cached)
# COPY . .

# # 7. Build the application
# RUN bun run build

# # 8. Expose port 7373
# EXPOSE 7373


# # 9. Start the server
# CMD ["bun", "run", "vite", "preview", "--port", "7373", "--host"]



# Use the Node alpine official image
# https://hub.docker.com/_/node
FROM node:lts-alpine

# Create and change to the app directory.
WORKDIR /app

# Copy the files to the container image
COPY package*.json ./

# Install packages
RUN npm ci

# Copy local code to the container image.
COPY . ./

# Build the app.
RUN npm run build

# Serve the app
CMD ["npm", "run", "start"]