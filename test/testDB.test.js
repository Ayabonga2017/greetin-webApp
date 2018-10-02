const assert = require('assert');
const Greetfactory = require('../greet');
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres@localhost:5432/greetings_tests';

const pool = new Pool({
    connectionString
});

describe('The basic database web app tests', function(){
    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query('delete from greetings');
    });

    it('should return 1 for the counter if the same name has been greeted twice ', async function(){

        // the Factory Function is called Greet
        let greetEng = Greetfactory(pool);

       await greetEng.GreetLanguage("Aya", 'English');
       await greetEng.GreetLanguage("Aya", 'English');

        assert.equal(1, await greetEng.Counter());

    });

    it('should return  " hey Ayabonga "  when Ayabonga is greeted in English  ', async function(){

        // the Factory Function is called Greet
        let greetEng = Greetfactory(pool);

       
        assert.equal("Hey, Ayabonga" , await greetEng.GreetLanguage("English", 'Ayabonga'));

    });
    it('should  greet Aya in Afrikaans ', async function(){

        // the Factory Function is called Greet
        let greetEng = Greetfactory(pool);

        let greet = await greetEng.GreetLanguage("Afrikaans", 'Aya');
        
       assert.equal("Halo, Aya" , greet);
      

    });

    it('should greet 3 people and return 3 for the Counter ', async function(){

        // the Factory Function is called Greet
        let greetEng = Greetfactory(pool);

       await greetEng.GreetLanguage("Aya", 'Afrikaans');
       await greetEng.GreetLanguage("Asa", 'IsiXhosa');
       await greetEng.GreetLanguage("Ala", 'English');
       
        assert.equal(3, await greetEng.Counter());
        
    });
    it('should return nothing if no one i greeted', async function(){

        // the Factory Function is called Greet
        let greetEng = Greetfactory(pool);

        let greet = await greetEng.GreetLanguage("");
     
       assert.equal( "Please enter a name and choose a language",greet);

    });
    after(function(){
        pool.end();
    })
});