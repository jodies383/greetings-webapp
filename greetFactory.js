module.exports = function (pool) {

    let theMessage;

    var namesGreeted = {}

    var regex = /^[a-zA-Z]+$/;


    async function addNames(name) {

        if (regex.test(name)) {

            if (namesGreeted[name.toUpperCase()] === undefined) {
                namesGreeted[name.toUpperCase()] = 1,
                    await pool.query('insert into users (username) values ($1)', [name]);

            } else {
                namesGreeted[name.toUpperCase()]++
            }
        }


    }

    async function getNames() {
        const result = await pool.query('select * from users')
        return result.rows;
    }


    async function theCount() {
        const countRes = await pool.query('select count(*) from users')
        return countRes.rows[0].count;

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
        getNames,
        greetMe,
        removeValidName,
        returnMessage,
        resetButton
    }


}