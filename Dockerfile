# ---- build stage: fast installs with Bun ----
FROM oven/bun:1 AS builder
WORKDIR /app

# copy lock + manifest first for layer caching
COPY package.json bun.lock* ./
RUN bun install

# copy source and build
COPY . .
RUN bun run build   # runs "svelte-kit build"

# ---- runtime stage: minimal Node image to run adapter-node server ----
FROM node:20-alpine AS runner
WORKDIR /app

# copy only what runtime needs
COPY package.json ./
# install only production deps (many apps have none; safe either way)
RUN npm i --omit=dev

# bring the built server
COPY --from=builder /app/build ./build

# env + port
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# start node adapter server
CMD ["node", "build"]
