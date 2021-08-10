module.exports = function theGreet(existingNames) {

    let theName;
    let theMessage;
    let counter = 0;

    let actionList = [];
    let countList = [];

    var namesGreeted = existingNames || []

    var regex = /^[a-zA-Z]+$/;

    function addNames(checkedRadioBtn) {

        if (!namesGreeted.includes(theName.toUpperCase()) && regex.test(theName.toUpperCase()) && checkedRadioBtn) {
            namesGreeted.push(theName.toUpperCase())
        }

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
        else if (action === "Swedish" && regex.test(theName.toUpperCase())) {

            theMessage = ("Hallå, " + theName)
        }
        else if (action === "Dutch" && regex.test(theName.toUpperCase())) {

            theMessage = ("Hallo, " + theName)


        } else theMessage = ("");

        if (theName && action) {
            actionList.push({
                type: action,
                theName,
                timestamp: new Date()
            });
            counter ++
        }
        countList.push({
            theName,
            number: counter.length
        });
    }
    function actions() {
        return actionList;
    }

    function counted(){
        return countList;
    }

    function actionsFor(type) {
        const filteredActions = [];

        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];
            if (action.type === type) {
                filteredActions.push(action);
            }
        }

        return filteredActions;

    }
    function returnMessage() {
        return theMessage;
    }


    function returnWarn() {
        return warnings;
    }
    function removeValidName() {

        if (regex.test(theName)) {
            return ("");

        }
        else {
            return ("Please enter a name");
        }
    }
    function noName(checkedRadioBtn) {

        if ((!theName && !checkedRadioBtn)) {

            return ("Please enter your name and select a language");

        } else return ("")
    }

    function warnLang(checkedRadioBtn) {
        if (regex.test(theName) && !checkedRadioBtn) {
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
        returnWarn,
        counted,
        actions,
        actionsFor



    }


}