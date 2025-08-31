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

### Run stage: use Bun to run the adapter-node server
FROM oven/bun:latest AS runner

WORKDIR /app

# Copy the built output and package.json for the start script
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json

# Adapter-node reads PORT/HOST and proxy headers at runtime
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Railway sets PORT; adapter-node listens on 0.0.0.0 by default
EXPOSE 3000

# Start the adapter-node server using node directly (avoiding --env-file in container)
CMD ["node", "build"]
