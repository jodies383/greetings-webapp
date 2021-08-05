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
    greetings.setName({
        theName: req.body.enterName,
    });

    greetings.getName(),
        greetings.greetMe(req.body.languages),
        greetings.addNames(req.body.languages)
    if (greetings.noName(req.body.languages)) {
        req.flash('info', 'Please enter your name and select a language');
    } else if (greetings.removeValidName(req.body.languages)) {
        req.flash('info', 'Please enter a valid name');
    } else if (greetings.warnLang(req.body.languages)) {
        req.flash('info', 'Please select a language');
    }
    res.redirect('/');

});
app.post('/action', function (req, res) {
    greetings.greetMe(req.body.languages)
    res.redirect('/');
});

app.get('/actions', function (req, res) {
    var newAction = greetings.actions();
    newAction.forEach(element => {
        element.newTime = moment(element.timestamp).fromNow()
    });

    res.render('actions', { actions: newAction });

});
app.get('/actions/:actiontype', function (req, res) {
    const actionType = req.params.actiontype;
    res.render('actions', { actions: greetings.actionsFor(actionType) });

});
const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log("App started at port:", PORT);
});