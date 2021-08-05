const express = require('express');
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

let warnings = ""

app.get('/', function (req, res) {

    res.render('index', {

        greetMessage: greetings.returnMessage(),
        warningName: greetings.returnWarn,
        myCount: greetings.theCount()
    });
});

app.post('/greet', function (req, res) {

    greetings.setName({
        theName: req.body.enterName,
    });

    greetings.getName(),
        greetings.greetMe(req.body.languages),
        greetings.addNames(req.body.languages),
        greetings.warnMessage(req.body.languages) 
    res.redirect('/');

});


const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log("App started at port:", PORT);
});