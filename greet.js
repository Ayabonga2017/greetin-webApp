module.exports = function (pool) {
var greeted='';
  async function GreetLanguage(language, person) {

    let result = await pool.query('select * from greetings where names = $1', [person])

    if (person !=='') {

    }
  if (language == undefined) {
    
  }
    if (result.rows.length === 0) {
      if (person !== '') {
        await pool.query('insert into greetings(names, counts) values($1, $2)', [person, 1])
    }
  } 
    else {
      await pool.query("update greetings set counts=counts+1 where names=$1", [person]);
    } 
     if ( person ==='') {
       
     } else {
       
      if (language === "English") { return "Hey, " + person; }
      if (language === "IsiXhosa") { return "Mhollo, " + person; }
      if (language === "Afrikaans") { return "Halo, " + person; }
     }
   
  }
async function greetedwithL(){

var greeted = await pool.query('select names from greetings ')
  return  greeted;
}
  async function Counter() {
    var counter = await pool.query('select count(*) from greetings ')
    return counter.rows[0].count
  }
  async function greetedNames() {
    var counter = await pool.query('select * from greetings  ')
    return counter.rows;
  }
  async function resetBtn() {
    var reset = await pool.query('delete from greetings ')
    return reset;
  }

  return {
    GreetLanguage,
    greetedwithL,
    Counter,
    resetBtn,
    greetedNames
  }
}