module.exports = function () {
 
  var GreetedNames = {};
  var GreetingMessage = "";
  var name ="";
  var language = "";
var counter = 0;

  var GreetLanguage = function (language, person) {

    // var personName = name;

    // if (personName != "") {
    //   if (GreetedNames[personName] === undefined) {
    //     GreetedNames[personName] = 0;
    //   }
    // }

    if (language === 'English') {
      GreetingMessage = "Hallo, " + person;
    }
    if (language === 'IsiXhosa') {
      GreetingMessage = "Mholo, " + person;
    }
    if (language === 'English') {
      GreetingMessage = "Hello, " + person;
    }

    counter ++;
    return GreetingMessage;
  }

  function setperson(value) {   
    name = value;

}
function setlang(value) {

  language = value;
}
  function LanguageReturn() { return language; }

  function PersonReturn() { return name; }

  function Message() { return GreetingMessage; }

  function Counter() { return counter;}
  function resetBtn() {
    GreetedNames = {};
    GreetingMessage = "";
    person = "";
  }

  return {
    GreetLanguage,
    Message,
    Counter,
    LanguageReturn,
    PersonReturn,
    resetBtn,
    setperson,
    setlang

  }

}