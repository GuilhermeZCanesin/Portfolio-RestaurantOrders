# Portfolio-RestaurantOrders
ReactJS, NextJS, ReactNative, NodeJS, Prisma 


# Migrations

Create Migration: yarn prisma migrate dev 


# Initial Config

BACKEND

yarn init -y
yarn add typescript -D (dev dependency)
yarn add express
yarn add @types/express -D (dev dependency)
yarn tsc --init (tsconfig.json creation)
yarn add ts-node-dev -D

"scripts": {
  "dev": "ts-node-dev src/server.ts"
},

yarn add express-async-errors
yarn add cors
yarn add prisma
yarn add @prisma/client
npx prisma init
yarn add bcryptjs
yarn add @types/bcryptjs -D
yarn add jsonwebtoken
yarn add @types/jsonwebtoken -D
yarn add multer
yarn add @types/multer -D

FRONTEND

npx create-next-app@latest
npm install sass
npm install axios
npm install cookies-next
npm install lucide-react