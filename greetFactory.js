module.exports = function theGreet(existingNames) {

    let theName;
    let theMessage;
    let warnings;


    var namesGreeted = existingNames || []

    var regex = /^[a-zA-Z]+$/;

    function addNames(checkedRadioBtn) {

        if (!namesGreeted.includes(theName.toUpperCase()) && regex.test(theName.toUpperCase()) && checkedRadioBtn) {
            namesGreeted.push(theName.toUpperCase())
        }
        // localStorage.setItem('namesList', JSON.stringify(namesGreeted));

    }
    function returnNames() {
        return namesGreeted;
    }

    function theCount() {
        return namesGreeted.length;
    }

    function setName(name) {
        theName = name.theName;

    }
    function getName() {
        return theName;
    }
    function greetMe(action) {


        if (action === "English" && regex.test(theName.toUpperCase())) {

            theMessage = ("Hello, " + theName)
        }
        else if (action === "Afrikaans" && regex.test(theName.toUpperCase())) {

            theMessage = ("Goeie More, " + theName)
        }
        else if (action === "isiXhosa" && regex.test(theName.toUpperCase())) {

            theMessage = ("Molo, " + theName)


        } else theMessage = ("");
    }

    function returnMessage() {
        return theMessage;
    }

    function warnMessage(checkedRadioBtn) {
        if (!theName && !checkedRadioBtn) {
            warnings = ("Please enter your name and select a language");
        } else if (!regex.test(theName)) {
            warnings = ("Please enter a name");

        } else if (regex.test(theName) && !checkedRadioBtn) {
            warnings = ("Please select a language");
        } else {
            warnings = ("");
        }
    }
    function returnWarn() {
        return warnings;
    }
    function removeValidName(param1) {

        if (param1 && regex.test(param1)) {
            return ("");

        }
        else {
            return ("Please enter a name");
        }
    }
    function noName(param1, checkedRadioBtn) {

        if ((!param1 && !checkedRadioBtn)) {

            return ("Please enter your name and select a language");

        } else return ("")
    }

    function warnLang(param1, checkedRadioBtn) {
        if (regex.test(param1) && !checkedRadioBtn) {
            return ("Please select a language");
        } else return ("")

    }

    return {
        addNames,
        theCount,
        setName,
        getName,
        returnNames,
        greetMe,
        removeValidName,
        noName,
        returnMessage,
        warnLang,
        warnMessage,
        returnWarn



    }


}