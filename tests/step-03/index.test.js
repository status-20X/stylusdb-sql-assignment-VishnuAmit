// const readCSV = require('../../src/csvReader');
// const parseQuery = require('../../src/queryParser');

// test('Read CSV File', async () => {
//     const data = await readCSV('./sample.csv');
//     expect(data.length).toBeGreaterThan(0);
//     expect(data.length).toBe(3);
//     expect(data[0].name).toBe('John');
//     expect(data[0].age).toBe('30'); //ignore the string type here, we will fix this later
// });

// test('Parse SQL Query', () => {
//     const query = 'SELECT id, name FROM sample';
//     const parsed = parseQuery(query);
//     expect(parsed).toEqual({
//         fields: ['id', 'name'],
//         table: 'sample'
//     });
// });

// tests/index.test.js

const {readCSV} = require("../../src/csvReader");
const {parseSelectQuery} = require("../../src/queryParser");

test("Read CSV File", async () => {
  const data = await readCSV("./student.csv");
  expect(data.length).toBeGreaterThan(0);
  expect(data.length).toBe(4);
  expect(data[0].name).toBe("John");
  expect(data[0].age).toBe("30"); //ignore the string type here, we will fix this later
});

test("Parse SQL Query", () => {
  const query = "SELECT id, name FROM student";
  const parsed = parseSelectQuery(query);
  expect(parsed).toEqual({
    fields: ["id", "name"],
    table: "student",
    whereClauses: [],
    "joinCondition": null,
    joinTable: null,
    "limit": null,
    "isDistinct": false,
    
    joinType:null,
    groupByFields: null,
    hasAggregateWithoutGroupBy:false,
    orderByFields: null,

  });
});

test('Parse SQL Query with WHERE clause', () => {
    const query = 'SELECT id, name FROM student WHERE age = 30';
    const parsed = parseSelectQuery(query);
    expect(parsed).toEqual({
        fields: ['id', 'name'],
        table: 'student',
        joinCondition: null,
        joinTable: null,
        joinType: null,
        whereClauses: [{"field" : "age"
        ,"operator" : "="
        ,"value" : "30"}],
        "isDistinct": false,
        groupByFields: null,
        hasAggregateWithoutGroupBy:false,
        "limit": null,
        orderByFields: null,

        
    });
});

test('Parse Invalid SQL Query -No FROM - Throw Error', () => {
    const invalidQuery = 'SELECT id name student';
    expect(() => parseSelectQuery(invalidQuery)).toThrow("Query parsing error: Invalid SELECT clause. Ensure it follows 'SELECT field1, field2 FROM table' format.");
});

test('Parse Invalid SQL Query  - Throw Error', () => {
    const invalidQuery = 'id name FROM student';
    expect(() => parseSelectQuery(invalidQuery)).toThrow("Query parsing error: Invalid SELECT clause. Ensure it follows 'SELECT field1, field2 FROM table' format.");
});