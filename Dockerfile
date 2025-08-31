# 1. Start from the official Bun image (Ubuntu-based)
FROM oven/bun:latest

# 2. Set working directory
WORKDIR /app

# 3. Copy only dependency files first (BETTER CACHING)
COPY package.json bun.lock ./

# 4. Force native modules to build from source
ENV npm_config_build_from_source=true

# 5. Install dependencies (CACHED LAYER - only invalidates when package.json/bun.lockb changes)
RUN bun install

# 6. Copy rest of project files (this layer changes often but dependencies are cached)
COPY . .

# 7. Build the application
RUN bun run build

# 8. Set environment variables for production
ENV NODE_ENV=production
ENV PORT=7373

# 9. Expose port 7373
EXPOSE 7373

# 10. Start the built Node.js server directly
CMD ["bun", "run", "start"]