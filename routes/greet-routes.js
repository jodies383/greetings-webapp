module.exports = function (pool) {

    const greetFactory = require('../greetFactory');
    const greeted = greetFactory(pool)


    async function home(req, res, next) {
        try {
            let home = await greeted.select()
            let message = greeted.returnMessage()

            res.render('index', {
                greetMessage: message,
                myCount: home
            });
        } catch (err) {
            throw err
        }
    }

    async function greet(req, res, next) {

        try {
            if (req.body.languages){
            await greeted.addNames(req.body.enterName, req.body.languages),
                greeted.greetMe(req.body.enterName, req.body.languages, req)
            }
            res.redirect('/');
        } catch (err) {
            throw err
        }
    }

    async function greetedNames(req, res, next) {
        try {
            let namesList = await greeted.namesList()

            res.render('greeted', {
                namesList: namesList
            });

        } catch (err) {
            throw err
        }

    }

    async function counter(req, res, next) {
        try {
            let users = req.params.username
            let newCount = await greeted.addCounter(users)

            res.render('counter', {
                name: users,
                counter: newCount
            });
        } catch (err) {
            throw err
        }
    }

    async function resetButton(req, res, next) {
        try {
            await greeted.reset()

            res.redirect('/')
        } catch (err) {
            throw err
        }
    }

    return {
        home,
        greet,
        greetedNames,
        counter,
        resetButton
    }


}