# 1. Start from the official Bun image (Ubuntu-based)
FROM oven/bun:latest

# 2. Set working directory
WORKDIR /app

# 3. Copy project files
COPY . .

# 4. Force native modules to build from source
ENV npm_config_build_from_source=true

# 5. Install dependencies and build
RUN bun install \
  && bun run build

# 6. Expose port 3000
EXPOSE 3000

# 8. Start the server
CMD ["bun", "run", "vite", "preview", "--port", "3000", "--host"]
