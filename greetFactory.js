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
        } catch (error) {
            next(error)
        }
    }

    async function greet(req, res, next) {

        try {
            // addNames
            let checkname = await pool.query(`SELECT username from users WHERE username = $1`, [req.body.enterName]);

            if (checkname.rowCount < 1) {

                await pool.query(`INSERT INTO users (username,user_count) VALUES ($1,$2)`, [req.body.enterName, 1])
            }

            else {
                await pool.query(`UPDATE users SET user_count = user_count + 1 WHERE username = $1`, [req.body.enterName])
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
        } catch (error) {
            next(error)
        }
    }

    async function greeted(req, res, next) {
        try {
            const result = await pool.query('select * from users')
            let namesL = result.rows;

            res.render('greeted', {
                namesList: namesL
            });

        } catch (error) {
            next(error)
        }

    }

    async function counter(req, res, next) {
        try {
            const users = req.params.username
            const usersTotal = await pool.query('select user_count from users WHERE username = $1', [users])
            console.log(usersTotal.rows);
            const counted = usersTotal.rows;

            res.render('counter', {
                name: users,
                counter: counted
            });
        } catch (error) {
            next(error)
        }
    }
    
    async function resetButton(req, res, next) {
        try {
            await pool.query('delete from users')

            res.redirect('/')
        } catch (error) {
            next(error)
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