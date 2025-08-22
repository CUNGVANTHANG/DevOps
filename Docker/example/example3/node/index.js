const express = require("express");
const mysql = require("mysql2");
// const dbConfig = require("./db.config.js");asdf 

const app = express();


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome back Mr.Khalid !!! What I can do for you?" });
});

const connection = mysql.createConnection({
    host: 'mysql',
    user: 'khalid',
    password: 'password123_ABC',
    database: 'db_example'
})


connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
    if (err) throw err

    console.log('The solution is: ', rows[0].solution)
})

connection.end()

// set port, listen for requests
const PORT = process.env.PORT || 3000;

require("./app/routes/tutorial.js")(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});