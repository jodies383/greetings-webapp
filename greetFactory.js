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

    async function addNames(name) {
        if (regex.test(name)) {
            let checkname = await pool.query(`SELECT username from users WHERE username = $1`, [name]);

            if (checkname.rowCount < 1) {

                await pool.query(`INSERT INTO users (username,counters) VALUES ($1,$2)`, [name, 1])
            }

            else {
                await pool.query(`UPDATE users SET counters = counters + 1 WHERE username = $1`, [name])
            }
        }
    }
    function greetMe(name, language, req) {
        let upperName = name.toUpperCase()
        if (language === "English" && regex.test(upperName)) {

            theMessage = "HELLO, " + upperName
        }
        else if (language === "Swedish" && regex.test(upperName)) {

            theMessage = "HALLÅ, " + upperName
        }
        else if (language === "Dutch" && regex.test(upperName)) {

            theMessage = "HALLO, " + upperName

        }
      
        if (!name & !language) {
            req.flash('info', 'Please enter name and select a language');
        }
        else if (!name || !regex.test(name)) {
            req.flash('info', 'Please enter a valid name');
        } 
        else if (!language) {
            req.flash('info', 'Please select a language');

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
        greetMe,
        namesList,
        addCounter,
        reset
    }


}