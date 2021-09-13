module.exports = function (pool) {

    let theMessage;

    let regex = /^[a-zA-Z]+$/;

    async function home(req, res, next) {
        try {
            let counted = await pool.query('select * from users')
            const countRes = counted.rowCount;

            res.render('index', {
                greetMessage: theMessage,
                myCount: countRes
            });
        } catch (err) {
            next(err)
        }
    }

    async function greet(req, res, next) {

        try {
            // addNames
            let checkname = await pool.query(`SELECT username from users WHERE username = $1`, [req.body.enterName]);

            if (checkname.rowCount < 1) {

                await pool.query(`INSERT INTO users (username,counters) VALUES ($1,$2)`, [req.body.enterName, 1])
            }

            else {
                await pool.query(`UPDATE users SET counters = counters + 1 WHERE username = $1`, [req.body.enterName])
            }

            // greetMe
            if (req.body.languages === "English" && regex.test(req.body.enterName.toUpperCase())) {

                theMessage = "HELLO, " + req.body.enterName.toUpperCase()
            }
            else if (req.body.languages === "Swedish" && regex.test(req.body.enterName.toUpperCase())) {

                theMessage = "HALLÅ, " + req.body.enterName.toUpperCase()
            }
            else if (req.body.languages === "Dutch" && regex.test(req.body.enterName.toUpperCase())) {

                theMessage = "HALLO, " + req.body.enterName.toUpperCase()

            }

            if (!req.body.languages) {
                req.flash('info', 'Please enter a valid name');
            }
            res.redirect('/');
        } catch (err) {
            next(err)
        }
    }

    async function greeted(req, res, next) {
        try {
            const result = await pool.query('select * from users')
            let namesL = result.rows;

            res.render('greeted', {
                namesList: namesL
            });

        } catch (err) {
            next(err)
        }

    }

    async function counter(req, res, next) {
        try {
            let users = req.params.username
            let usersTotal = await pool.query('select counters from users WHERE username = $1', [users])
            console.log(usersTotal.rows);
            let counted = usersTotal.rows[0];
            let newCount = counted.counters;

            res.render('counter', {
                name: users,
                counter: newCount
            });
        } catch (err) {
            next(err)
        }
    }
    
    async function resetButton(req, res, next) {
        try {
            await pool.query('delete from users')

            res.redirect('/')
        } catch (err) {
            next(err)
        }
    }

    return {
        home,
        greet,
        greeted,
        counter,
        resetButton
    }


}