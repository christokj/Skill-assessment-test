const db = require('../config/db');
exports.getUsers = (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};
exports.addUser = (req, res) => {
    const { name, email } = req.body;
    db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err) => {
        if (err) throw err;
        res.status(201).send('User added');
    });
};