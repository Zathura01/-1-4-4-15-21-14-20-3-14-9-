const mysql = require("mysql2"); // Use mysql2 instead of mysql

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Alicewillington@1",
    database: "todo",
    port: 3308
});

db.connect(err => {
    if (err) {
        console.error("❌ MySQL Connection Error:", err);
        return;
    }
    console.log("✅ MySQL Connected!");
});


module.exports = db;