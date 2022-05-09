# Songswarm
## Listen to music in the ... swarm?

This is a Soundcloud-inspired music player app.  You can upload music, listen to music, and currently, comment on music.  Music and image uploads (for song covers) are handled using the AWS SDK and using React/Redux the music player works no matter where you are in the app! This project was built solo in the course of a week so I decided to limit the feautures to those for now, but as I have time I plan to bring more features to this project such as playlists, likes, visualizations, and discovery views.

### Getting started

1. Clone this repository

   `git clone git@github.com:kairality/songswarm.git`

2. Install dependencies with `npm install`

3. Create a .env file based on the examples given ... however you will need an AWS bucket and key. You will need to do this in the frontend and backend folders.

4. Set up your database user with the DBCREATE permission.

5. Migrate and Seed models
   `npx dotenv sequelize-cli db:create`
   `npx dotenv sequelize-cli db:migrate`
   `npx dotenv sequelize-cli db:seed:all`

6. Start the app with  the following command

   `npm start`
   
 

You will need to run this command in both the frontend and backend. But it might be annoying to set up an AWS account just to test this, so why not just check it out on

### Live
https://songswarm.herokuapp.com/

Note: demo user login is controlled via an environmental variable, I may occasionally have it disabled if I am presenting this project, etc.
