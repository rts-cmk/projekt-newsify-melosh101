# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json bun.lock ./
RUN if [ -f bun.lock ]; then npm install -g bun && bun install; else npm install; fi
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]