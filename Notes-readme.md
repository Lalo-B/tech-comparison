starts with a readme - should have the api documentation. (reminder what is the api documentation?)
    answer: api docs are the docs for each route/ end point with the expected input, output, and error handling
in the api readme is example api docs for airbnb theres also meet up ones in second project folder

db schema ss goes in images

heres an explanation of everything we use and why:

`npm install` the following packages as dependencies:

- `cookie-parser` - parsing cookies from requests
- `cors` - CORS
- `csurf` - CSRF protection
- `dotenv` - load environment variables into Node.js from a `.env` file
- `express` - Express
- `express-async-errors` - handling `async` route handlers
- `helmet` - security middleware
- `jsonwebtoken` - JWT
- `morgan` - logging information about server requests/responses
- `per-env` - use environment variables for starting app differently
- `sequelize@6` - Sequelize
- `sequelize-cli@6` - use `sequelize` in the command line
- `pg` - use Postgres as the production environment database

`npm install -D` the following packages as dev-dependencies:

- `sqlite3` - SQLite3
- `dotenv-cli` - use `dotenv` in the command line
- `nodemon` - hot reload server `backend` files

then we configure the app. in the backend folder make your .env file to define
the environment variables. this is the port, db file, jwt secret, and schema name

then we make the config folder and the index.js file
each env var will be read and exported as a key from this file.

then make the .sequelizerc file. we put the module.exports stuff here and a
const path = require('path')

to initialize sequelize to the db folder we ran npx sequelize init in the back end
then we replaced the stuff in the new backend/config/database.js file to the given code

this allows us to load the database config env vars from the .env file into the config/index.js
as well as define the gobal schema for the project

we also set up the script to set up postgresql which just checks if the project schema exists and
makes it if it doesnt already

then we npx dotenv sequelize db:migrate to finish the set up

this is the set up for sequelize done. now we set up express

make an app.js in the backend folder so we can initialize the express app
