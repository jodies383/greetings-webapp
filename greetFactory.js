module.exports = function theGreet(existingNames) {

    let theName;
    let theMessage;


    var namesGreeted = existingNames || []

    var regex = /^[a-zA-Z]+$/;

    function addNames(enterName, checkedRadioBtn) {

        if (!namesGreeted.includes(enterName.toUpperCase()) && regex.test(enterName.toUpperCase()) && checkedRadioBtn) {
            namesGreeted.push(enterName.toUpperCase())
        }
        localStorage.setItem('namesList', JSON.stringify(namesGreeted));

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
    function getName(){
        return theName;
    }
    function greetMe(action) {


        if ( action === "English") {

            theMessage = ("Hello" + theName)
        }
        else if (action === "Afrikaans") {

            theMessage = ("Goeie More" + theName)
        }
        else if (action === "isiXhosa") {

            theMessage = ("Molo" + theName)


        } else theMessage = ("");
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
        warnLang,



    }


}