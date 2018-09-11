module.exports = function () {

var NameStorage ={};
  var GreetingMessage = "";
  var Countkeep = NameStorage || {};
  var person="";
var language ="";

  function setperson(value) {
    if (value !== "") {
    return person;
    }

  }

  function GreetLanguage(language,person) {


    if (Countkeep[person] === undefined) {

      Countkeep[person] = 0;
    }

    if (language === "English") {

      GreetingMessage = "Hey, " + person;

    }
    if (language === "IsiXhosa") {

      GreetingMessage = "Mhollo, " + person;

    }
    if (language === "Afrikaans") {

      GreetingMessage = "Halo, " + person;
      console.log(language);

    }

  }

  function setlang(value) {language = value;}
  function LanguageReturn() { return language; }
  function PersonReturn() { return Countkeep; }
  function Message() { return GreetingMessage;}
  function Counter() { return Object.keys(Countkeep).length;}

  function resetBtn() {

     NameStorage ={};
     GreetingMessage = "";
     Countkeep = 0;
     person="";
     language ="";
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