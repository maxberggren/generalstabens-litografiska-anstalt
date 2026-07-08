# Build the Vite app on Node 24 (Vite 8 requires Node >=22.12; Coolify's
# bundled Nixpacks can't provide one, hence this Dockerfile)
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve the static bundle
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
