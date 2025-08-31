### Build stage: use Bun to install deps and build
FROM oven/bun:latest AS build

WORKDIR /app

# Copy dependency manifests for better caching
COPY package.json bun.lock ./

# Ensure native modules (if any) build from source
ENV npm_config_build_from_source=true

# Install dependencies
RUN bun install

# Copy the rest of the source
COPY . .

# Build SvelteKit with adapter-node
RUN bun run build

### Run stage: use Node to run the adapter-node server
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only the built output and any runtime files needed
COPY --from=build /app/build ./build

# Adapter-node reads PORT/HOST and proxy headers at runtime
ENV NODE_ENV=production

# Railway sets PORT; adapter-node listens on 0.0.0.0 by default
EXPOSE 3000

# Start the adapter-node server (not vite preview)
CMD ["node", "--env-file=.env" "build"]
