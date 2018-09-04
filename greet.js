module.exports =function GreetmeFunction(NameStorage) {

  var GreetPerson = "";
  var Countkeep = NameStorage || {};
  var person = "";
  var language = "";

  function setperson(value) {
    if (value !== "") {
      return person;
    }

  }
  function setlang(value) {

    language = value;
  }

  function GreetLanguage(person, language) {


    if (Countkeep[person] === undefined) {

      Countkeep[person] = 0;
    }

    if (language === "English") {

      GreetPerson = "Hey, " + person;

    }
    if (language === "IsiXhosa") {

      GreetPerson = "Mhollo, " + person;

    }
    if (language === "Afrikaans") {

      GreetPerson = "Halo, " + person;
      console.log(language);

    }

  }


  function GreetMe() {

    return Countkeep;
  }

  function GreetedPerson() {
    return GreetPerson;
  }

  function CountPeople() {
    //console.log(Object.keys(Countkeep).length);
    return Object.keys(Countkeep).length;

  }

  return {
    GreetLanguage,
    GreetMe,
    CountPeople,
    GreetedPerson,
    setperson,
    setlang
  }
}
