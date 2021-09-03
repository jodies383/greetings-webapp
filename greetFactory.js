module.exports = function (pool) {

    let theMessage;

    var namesGreeted = {}

    var regex = /^[a-zA-Z]+$/;


    async function addNames(name) {
        var checkname = await pool.query(`SELECT username from users WHERE username = $1`, [name]);

        if (checkname.rowCount < 1) {
    
            await pool.query(`INSERT INTO users (username,user_count) VALUES ($1,$2)`, [name, 1])
        }
    
        else {
            await pool.query(`UPDATE users SET  user_count = user_count + 1 WHERE username = $1`, [name])
        }
    }



            // if (regex.test(name)) {

        //     if (namesGreeted[name.toUpperCase()] === undefined) {
        //         namesGreeted[name.toUpperCase()] = 1,
        //             await pool.query('insert into users (username) values ($1)', [name]);

        //     } else {
        //         namesGreeted[name.toUpperCase()]++
        //     }
        // }

    async function getNames() {
        const result = await pool.query('select * from users')
        return result.rows;
    }


    async function theCount() {
        const countRes = await pool.query('select * from users')
        return countRes.rowCount;

    }

    async function userCount() {
        const usersTotal = await pool.query('select username, count(*) as Total from users group by username')
        console.log(usersTotal);
        return usersTotal.rows[0].count;
    }

    // var namesList = Object.keys(namesGreeted)
    // return namesList.length;
    function greetMe(name, language) {


        if (language === "English" && regex.test(name.toUpperCase())) {

            theMessage = "HELLO, " + name.toUpperCase()
        }
        else if (language === "Swedish" && regex.test(name.toUpperCase())) {

            theMessage = "HALLÅ, " + name.toUpperCase()
        }
        else if (language === "Dutch" && regex.test(name.toUpperCase())) {

            theMessage = "HALLO, " + name.toUpperCase()


        }


    }

    function returnMessage() {
        return theMessage;
    }


    function removeValidName(param1) {

        if (param1 && regex.test(param1)) {
            return ("");

        }

        else {
            return ("Please enter a valid name");
        }
    }

    async function resetButton() {
        await pool.query('delete from users')
    }

    return {
        addNames,
        theCount,
        userCount,
        getNames,
        greetMe,
        removeValidName,
        returnMessage,
        resetButton
    }


}