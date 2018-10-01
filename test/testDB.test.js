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

    it('should greet Ayabonga in English ', async function(){

        // the Factory Function is called Greet
        let greetEng = Greetfactory(pool);

        assert.equal("Hey, Ayabonga", await greetEng.GreetLanguage("English", "Ayabonga"));

    });

    after(function(){
        pool.end();
    })
});