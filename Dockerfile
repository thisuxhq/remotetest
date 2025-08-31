# Use Bun image but run the Node.js build output
FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Expose port (Railway sets this automatically)
EXPOSE $PORT

# Start the production server using Bun to run the Node.js output
CMD ["bun", "run", "build/index.js"]