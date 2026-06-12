# ==========================================
# Stage 1: Build the React/Vite application
# ==========================================
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
# (Using npm ci is strictly better for CI/CD pipelines as it uses the lockfile)
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of your source code
COPY . .

# Build the project (Vite outputs to the 'dist' folder)
RUN npm run build

# ==========================================
# Stage 2: Serve the application
# ==========================================
FROM nginx:alpine

# Remove the default Nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy the compiled Vite files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 inside the container for Cloudflare to connect to
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]