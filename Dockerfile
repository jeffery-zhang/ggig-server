# dependencies
FROM node:18-alpine AS dependencies
WORKDIR /apps/ggig-server
COPY package.json ./
RUN npm install

# build
FROM dependencies AS build
WORKDIR /apps/ggig-server
COPY . .
COPY --from=dependencies /apps/ggig-server/node_modules ./node_modules
RUN npm run build
RUN npm prune --production

# production
FROM base AS production
WORKDIR /apps/ggig-server
COPY --from=build /apps/ggig-server/dist ./dist
COPY --from=build /apps/ggig-server/node_modules ./node_modules

CMD ["node", "dist/index"]

