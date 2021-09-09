const pg = require("pg");
const Pool = pg.Pool;
const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const exphbs = require('express-handlebars');
const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});

const bodyParser = require('body-parser');
const theGreet = require('./greetFactory');
const greetFactory = require('./greetFactory');
const app = express();

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
    secret: "enter-name",
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}

// const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/users';

// const dbpool = new Pool({
//     connectionString,
//     ssl : useSSL
// });

const dbpool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/users',
    ssl: {
        useSSL,
      rejectUnauthorized: false
    }
  });

const greetings = greetFactory(dbpool)

app.get('/', greetings.home);
app.post('/greet', greetings.greet);
app.get('/greeted', greetings.greeted);
app.get('/counter/:username', greetings.counter);
app.post('/reset', greetings.resetButton);

const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log("App started at port:", PORT);
});