const express = require('express');
const faker = require('faker');
const mysql = require('mysql');
const app = express();
const port = 3000;

const config = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
};

const connection = mysql.createConnection(config);

app.get('/', (req, res) => {
  const generatedName = faker.name.findName().replace("'", '');

  connection.query(`INSERT INTO people (name) VALUES ('${generatedName}')`);

  connection.query(`SELECT name FROM people`, (error, results, fields) => {
    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <br>
      ${!!results.length ? results.map(el => `- ${el.name}<br>`).join('') : ''}
    `);
  });
});

app.listen(port, () => {
  console.log('App started');
});
