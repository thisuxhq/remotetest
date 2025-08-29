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

# 6. Expose port 9876
EXPOSE 9876

# 8. Start the server
CMD ["bun", "run", "vite", "preview", "--port", "9876", "--host"]
