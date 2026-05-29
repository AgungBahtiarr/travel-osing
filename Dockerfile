# Stage 1: Build Astro static site using Bun
FROM oven/bun:1-alpine AS builder
WORKDIR /app

# Copy package manifests and lockfile
COPY package.json bun.lock ./

# Install dependencies with frozen lockfile for deterministic builds
RUN bun install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the production bundle (generates static files in /app/dist)
RUN bun run build

# Stage 2: Serve static files with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration for clean URLs and asset caching
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
