const assert = require('assert');
const Greetfactory = require('../greet');
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/greetings_tests';

const pool = new Pool({
    connectionString
});

describe('The basic database web app', function(){
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

       await greetEng.GreetLanguage("English", 'Ayabonga');
   
        assert.equal("hey , Ayabonga" , await greetEng.GreetLanguage ());

    });
    it('should fail to greet Aya in Afrikaans ', async function(){

        // the Factory Function is called Greet
        let greetEng = Greetfactory(pool);

       await greetEng.GreetLanguage("Aya", 'Afrikaans');
       

       assert.equal("hey , Aya" , await greetEng.GreetLanguage ());

    });

    it('should greet 3 people and return 3 for the Counter ', async function(){

        // the Factory Function is called Greet
        let greetEng = Greetfactory(pool);

       await greetEng.GreetLanguage("Aya", 'Afrikaans');
       await greetEng.GreetLanguage("Asa", 'IsiXhosa');
       await greetEng.GreetLanguage("Ala", 'English');
       

        assert.equal(3, await greetEng.Counter());

    });
    after(function(){
        pool.end();
    })
});