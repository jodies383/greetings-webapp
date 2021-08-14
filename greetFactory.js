module.exports = function theGreet(existingNames) {

    let theMessage;

    let actionList = [];

    var namesGreeted = existingNames || {}

    var regex = /^[a-zA-Z]+$/;

    function addNames(name) {

        if (namesGreeted[name.toUpperCase()] === undefined) {
            namesGreeted[name.toUpperCase()] = 1
        } else {
            namesGreeted[name.toUpperCase()]++
        }

    }
    function getNames() {
        return namesGreeted;
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

    function actions() {
        return actionList;
    }

   
    function returnMessage() {
        return theMessage;
    }


     function noName(checkedRadioBtn) {

        if ((!theName && !checkedRadioBtn)) {

            return ("Please enter your name and select a language");

        } else return ("")
    }

    return {
        addNames,
        theCount,
        getNames,
        greetMe,
        noName,
        returnMessage,
        actions
    }


}