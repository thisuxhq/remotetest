# 1. Start from the official Bun image (Ubuntu-based)
FROM oven/bun:latest

# 2. Set working directory
WORKDIR /app

# 3. Copy only dependency files first (BETTER CACHING)
COPY package.json bun.lockb ./

# 4. Force native modules to build from source
ENV npm_config_build_from_source=true

# 5. Install dependencies (CACHED LAYER - only invalidates when package.json/bun.lockb changes)
RUN bun install

# 6. Copy rest of project files (this layer changes often but dependencies are cached)
COPY . .

# 7. Build the application
RUN bun run build

# 8. Expose port dynamically (Railway provides PORT env var)
EXPOSE $PORT

# 9. Start the server (use Railway's PORT environment variable)
CMD ["sh", "-c", "bun run start"]