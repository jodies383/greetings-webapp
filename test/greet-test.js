// const assert = require('assert');
// const greet = require('../greetFactory');

// describe('Greetings', function () {

//     const greeting = greet();

//     describe('Greetings', function () {
//         it('should greet "HELLO, JODIE"', function () {
//             (greeting.greetMe('Jodie', 'English'),

//                 assert.equal(greeting.returnMessage('HELLO, JODIE'), 'HELLO, JODIE'));
//         });
//         it('should greet "HALLÅ, AMY"', function () {
//             (greeting.greetMe('Amy', 'Swedish'),

//                 assert.equal(greeting.returnMessage('HALLÅ, AMY'), 'HALLÅ, AMY'));
//         });
//         it('should greet "HALLO, PAUL"', function () {
//             (greeting.greetMe('Paul', 'Dutch'),

//                 assert.equal(greeting.returnMessage('HALLO, PAUL'), 'HALLO, PAUL'));
//         });
//     });
//     describe('Storing Names', function () {

//         it('should return the list of names and times the names have been greeted', function () {
//             greeting.addNames("Jodie", "English");
//             greeting.addNames("Paul", "Swedish");
//             greeting.addNames("Amy", "Dutch");
//             assert.deepEqual({ JODIE: 1, PAUL: 1, AMY: 1 }, greeting.getNames());
//         });
//         it('should return the list of names and times the names have been greeted', function () {
//             greeting.addNames("Jodie", "English");
//             greeting.addNames("Jodie", "Dutch");
//             greeting.addNames("Jodie", "Swedish");
//             greeting.addNames("Paul", "Swedish");
//             greeting.addNames("Paul", "Swedish");
//             greeting.addNames("Amy", "Dutch");
//             assert.deepEqual({ JODIE: 4, PAUL: 3, AMY: 2}, greeting.getNames());
//         });
//     });
//     describe('Counter', function () {

//         it('should return the list of names that have been greeted', function () {
//             greeting.addNames("Jodie", "English");
//             greeting.addNames("Paul", "Swedish");
//             greeting.addNames("Amy", "Dutch");
//             assert.equal(3, greeting.theCount());

//         });
//         it('should test that the function is not counting duplicates', function () {
//             greeting.addNames("Jodie", "English");
//             greeting.addNames("Jodie", "Swedish");
//             greeting.addNames("Jodie", "English");
//             greeting.addNames("paul", "Swedish");
//             greeting.addNames("Paul", "Swedish");
//             greeting.addNames("Amy", "Dutch");
//             assert.equal(3, greeting.theCount());

//         });
//     });
//     describe('Return error message', function () {

//         it('should return the message "Please enter a valid name"', function () {
//             greeting.addNames("123", "English");

//             assert.equal("Please enter a valid name", greeting.removeValidName());
//         });
//         it('should return the message "Please enter a valid name"', function () {
//             greeting.addNames("", "Dutch");

//             assert.equal("Please enter a valid name", greeting.removeValidName());
//         });
//         it('should return the message "Please enter a valid name"', function () {
//             greeting.addNames("!@#$%^", "Swedish");

//             assert.equal("Please enter a valid name", greeting.removeValidName());
//         });
//     });
// });
const assert = require('assert');
// const CategoryService = require('../services/category-service');
const pg = require("pg");
const greetFactory = require('../greetFactory');
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/users';

const pool = new Pool({
    connectionString
});

describe('The basic database web app', function(){

    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("delete from users;");
    });

    it('should pass the db test', async function(){
        
        // the Factory Function is called greetFactory
        let greet = greetFactory(pool);
        await greet.greet(
            
        );

        // let count = await greet.getNames();
        assert.equal();

    });
  

    after(function(){
        pool.end();
    })
});