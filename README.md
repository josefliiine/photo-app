[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/3quacgcd)
# FED23 API-utveckling Prisma Boilerplate

This is a starter template/boilerplate for a TypeScript Node.js REST API using Express, Prisma and Express-validator.

## Usage

Clone this repository, create an `.env` file and copy the contents from `.env.example`. Create a new MySQL-database and change the database-name in `DATABASE_URL` after the last slash to the name of your database.

Don't forget to change the DEBUG prefix in `package.json` to your own project name.

Run `npm install` to install all packages and then start the server using `npm run dev`.

## Build

Run `npm run build` to transpile TypeScript into JavaScript. This will create a `build` folder with the transpiled code, which can be run using `npm start`. The `build` folder is ignored by git. The script also runs `npx prisma migrate deploy` to deploy the database schema to the database, as well as `npx prisma db seed` to seed the database with some initial data (if you have any seed data in `prisma/seed.ts`).
