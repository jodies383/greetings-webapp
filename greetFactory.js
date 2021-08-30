// const { Pool } = require("pg");

module.exports = function(pool) {

    let theMessage;

    var namesGreeted = pool || {}

    var regex = /^[a-zA-Z]+$/;

    function addNames(name) {
        if (regex.test(name)) {

            if (namesGreeted[name.toUpperCase()] === undefined) {
                namesGreeted[name.toUpperCase()] = 1
            } else {
                namesGreeted[name.toUpperCase()]++
            }
        }
    }
    
    async function getNames() {
        const result = await pool.query ('select username from users')
        return result.rows;
    }

    function theCount() {
        var namesList = Object.keys(namesGreeted)
        return namesList.length;
    }

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

    return {
        addNames,
        theCount,
        getNames,
        greetMe,
        removeValidName,
        returnMessage
    }


}