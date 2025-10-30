FROM oven/bun:1.3.1

COPY package.json bun.lock ./

RUN bun install
COPY . .

EXPOSE 3000

CMD ["bun", "start"]