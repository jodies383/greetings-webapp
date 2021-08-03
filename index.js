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

let message = ""

app.get('/', function (req, res) {

    res.render('index', {

        greetMessage: message
    });
    console.log(message);
});

app.post('/greet', function (req, res) {

    greetings.setName({
        theName: req.body.enterName,
    });

    greetings.getName(),

        greetings.greetMe(req.body.languages)
    if (req.body.languages === "English") {
        message = "Hello " + greetings.getName()
    } else if (req.body.languages === "Afrikaans") {
        message = "Goeie More " + greetings.getName()

    } else if (req.body.languages === "isiXhosa") {
        message = "Molo " + greetings.getName()
    }
        res.redirect('/');

    });


const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log("App started at port:", PORT);
});