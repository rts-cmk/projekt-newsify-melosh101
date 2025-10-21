# Build stage
FROM oven/bun:1.3 AS build
WORKDIR /app
COPY package*.json bun.lock ./
RUN bun i
COPY . .
RUN bun run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]