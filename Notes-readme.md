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
after initializing the app we then set up the middleware for it, using morgan, cookieparser, and express.json
then we also set up the helmet.crossOriginResourcePolicy middle ware and the
csurf middleware for site security.

* study up on site security in the future *

I like this paragraph explaining the use of the middleware:
The `csurf` middleware will add a `_csrf` cookie that is HTTP-only (can't be
read by JavaScript) to any server response. It also adds a method on all
requests (`req.csrfToken`) that will be set to another cookie (`XSRF-TOKEN`)
later on. These two cookies work together to provide CSRF (Cross-Site Request
Forgery) protection for your application. The `XSRF-TOKEN` cookie value needs to
be sent in the header of any request with all HTTP verbs besides `GET`. This
header will be used to validate the `_csrf` cookie to confirm that the
request comes from your site and not an unauthorized site.

now routes. set up an express router and a test route. then export the route and
connect it to the app by app.use(routes) then export the app at the bottom.

next we set up the www file in the bin folder. this is used to make an executable
that we can use to start the app by typing in the file name in the terminal as
a command

this is what starts the express app to listen for server requests only after
authenticating the db connection.
now the db, express app, and server are all set up.
we added some scripts to the package.json file:
"sequelize": "sequelize",
    "sequelize-cli": "sequelize-cli",
    "start": "per-env",
    "start:development": "nodemon ./bin/www",
    "start:production": "node ./bin/www",
    "build": "node psql-setup-script.js"
npm start does per-env which will run the /bin/www in nodemon
when started in the dev environment with the env vars in .env
loaded or in node when started in production. now we start.
so when we start it runs the start script then the start dev
script which rund nodemon ./bin/www then it runs the app and
checks for a db connection by doing a basic select as from the
db.

we added a restore csrf route. then we created the api folder and connected it to our routes/index.js file
the main purpose of this express app is to be a REST API server.
representational state transfer application programming interface.
an api is a set of rules and protocols that allow different software apps
to communicate with one another, allowing for the exchange of data
and perform actions by following a set of standards. kinda like a middlegrounds
for apps to interact with one another without needing to know the deets
of the other system. a restful api is the get post delete put stuff?
