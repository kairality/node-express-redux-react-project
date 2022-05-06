# Songswarm
## Listen to music in the ... swarm?

This is a Soundcloud-inspired music player app.  You can upload music, listen to music, and currently, comment on music. More features to come!

### Getting started

1. Clone this repository

   `git clone git@github.com:kairality/songswarm.git`

2. Install dependencies

   `npm install`

3. Create a .env file based on the example given ... however you will need an AWS bucket and key.

4. Set up your database user with DBCREATE permission.

5. Migrate and Seed models
   `npx dotenv sequelize-cli db:create`
   `npx dotenv sequelize-cli db:migrate`
   `npx dotenv sequelize-cli db:seed:all`

6. Start the app with  the following command

   `npm start`

But it might be annoying to set up an AWS account just to test this, so why not just check it out on

### Live
https://songswarm.herokuapp.com/
