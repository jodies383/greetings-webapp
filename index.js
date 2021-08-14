var moment = require('moment');
moment().format();
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
const app = express();

const greetings = theGreet();


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

app.get('/', function (req, res) {

    res.render('index', {

        greetMessage: greetings.returnMessage(),
        myCount: greetings.theCount()
    });
});

app.post('/greet', function (req, res) {
    greetings.addNames(req.body.enterName)
    greetings.greetMe(req.body.enterName, req.body.languages)
    greetings.getNames()

    // if (greetings.noName(req.body.languages)) {
    //     req.flash('info', 'Please enter your name and select a language');
    // } else if (greetings.removeValidName(req.body.languages)) {
    //     req.flash('info', 'Please enter a valid name');
    // } else if (greetings.warnLang(req.body.languages)) {
    //     req.flash('info', 'Please select a language');
    // }
    res.redirect('/');

});
app.get('/greeted', function (req, res) {
    let namesList = greetings.getNames()
    res.render('greeted', {
        namesList: namesList
    });
});


app.get('/counter/:username', function (req, res) {
    const users = req.params.username
    let namesList = greetings.getNames()
    let theCounter = namesList[users]
    // console.log(namesList);

    res.render('counter', {
        name: users,
        counter: theCounter
    });

});
const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log("App started at port:", PORT);
});