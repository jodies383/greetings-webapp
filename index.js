var moment = require('moment');
moment().format();
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

// const greetings = theGreet();


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

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/users';

const dbpool = new Pool({
    connectionString,
    user: 'codex',
    host: connectionString,
    database: 'users',
    password: 'pg123',
    port: 3011,
});

// dbpool
//     .query('select * from users')
//     .then(function (namesGreeted) {
//         console.log(namesGreeted.rows);
//     })


const greetings = greetFactory(dbpool)


app.get('/', async function (req, res, next) {
    try {
        const counted = await greetings.theCount()

        res.render('index', {
            greetMessage: greetings.returnMessage(),
            myCount: counted
        });
    } catch (error) {
        next(error)
    }
});

app.post('/greet', async function (req, res, next) {

    try {
        greetings.addNames(req.body.enterName);
        greetings.greetMe(req.body.enterName, req.body.languages);

        if (greetings.removeValidName(req.body.languages)) {
            req.flash('info', 'Please enter a valid name');
        }
        res.redirect('/');
    } catch (error) {
        next(error)
    }



});

app.get('/greeted', async function (req, res, next) {
    try {
        let namesL = await greetings.getNames();

        res.render('greeted', {
            namesList: namesL
        });

    } catch (error) {
        next(error)
    }

});


app.get('/counter/:username', async function (req, res, next) {
    try {
        const users = req.params.username
        const counted = await greetings.userCount(users)


        res.render('counter', {
            name: users,
            counter: counted
        });
    } catch (error) {
        next(error)
    }


});

app.post('/reset', function (req, res, next) {
    try {
        greetings.resetButton()
        res.redirect('/')
    } catch (error) {
        next(error)
    }
});

const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log("App started at port:", PORT);
});