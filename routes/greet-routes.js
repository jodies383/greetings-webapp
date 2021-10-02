module.exports = function (pool) {

    const greetFactory = require('../greetFactory');
    const greeted = greetFactory(pool)


    async function home(req, res) {
        let home = await greeted.select()
        let message = greeted.returnMessage()

        res.render('index', {
            greetMessage: message,
            myCount: home
        });

    }

    async function greet(req, res) {
        greeted.clear()
        greeted.errors(req.body.enterName, req.body.languages, req)
        if (req.body.languages) {
            await greeted.addNames(req.body.enterName, req.body.languages),
                greeted.greetMe(req.body.enterName, req.body.languages)
        }
        res.redirect('/');

    }

    async function greetedNames(req, res) {
        let namesList = await greeted.namesList()

        res.render('greeted', {
            namesList: namesList
        });
    }

    async function counter(req, res) {
        let users = req.params.username
        let newCount = await greeted.addCounter(users)

        res.render('counter', {
            name: users,
            counter: newCount
        });

    }

    async function resetButton(req, res) {
        greeted.clear()
        await greeted.reset()

        res.redirect('/')

    }

    return {
        home,
        greet,
        greetedNames,
        counter,
        resetButton
    }


}