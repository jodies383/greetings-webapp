module.exports = function (pool) {


    let theMessage;

    let regex = /^[a-zA-Z]+$/;

    async function select() {

        let counted = await pool.query('select * from users')
        const countRes = counted.rowCount;

        return countRes

    }

    function returnMessage() {
        return theMessage;
    }

    async function addNames(name, language, req) {
        let upperName = name[0].toUpperCase() + name.slice(1).toLowerCase()
        if (regex.test(upperName) && language) {
            let checkname = await pool.query(`SELECT username from users WHERE username = $1`, [upperName]);

            if (checkname.rowCount < 1) {

                await pool.query(`INSERT INTO users (username,counters) VALUES ($1,$2)`, [upperName, 1])
            }

            else {
                await pool.query(`UPDATE users SET counters = counters + 1 WHERE username = $1`, [upperName]),
                    req.flash('info', 'This name has already been greeted'),
                    theMessage = ""

            }
        }
    }
    function greetMe(name, language) {
        let upperName = name[0].toUpperCase() + name.slice(1).toLowerCase()
        if (language === "English" && regex.test(upperName)) {

            theMessage = "Hello, " + upperName
        }
        else if (language === "Swedish" && regex.test(upperName)) {

            theMessage = "Hallå, " + upperName
        }
        else if (language === "Dutch" && regex.test(upperName)) {

            theMessage = "Hallo, " + upperName

        }

    }
    function clear() {
        theMessage = ""
    }

    function errors(name, language, req) {
    
        if (!name && !language) {
            req.flash('info', 'Please enter name and select a language');
        }
        else if (name && !language) {
            req.flash('info', 'Please select a language');
        }
        else if (!name || !regex.test(name)) {
            req.flash('info', 'Please enter a valid name');
        }
    }

    async function namesList() {
        const result = await pool.query('select username from users')
        let namesL = result.rows;

        return namesL

    }

    async function addCounter(users) {
        let usersTotal = await pool.query('select counters from users WHERE username = $1', [users])
        let counted = usersTotal.rows[0];
        let newCount = counted.counters;

        return newCount

    }

    async function reset() {
        let deleted = await pool.query('delete from users')

        return deleted
    }

    return {
        select,
        returnMessage,
        addNames,
        clear,
        errors,
        greetMe,
        namesList,
        addCounter,
        reset
    }


}