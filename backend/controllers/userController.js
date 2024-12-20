const db = require('../config/db');

// Utility function to execute queries with async/await
const executeQuery = (query, values = []) => {
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// Fetch all data from header_table
exports.getHeaderTable = async (req, res) => {
    try {
        const query = `SELECT * FROM header_table`;
        const results = await executeQuery(query);
        res.status(200).json({ success: true, data: results });
    } catch (err) {
        console.error("Error fetching data from header_table:", err);
        res.status(500).json({ error: "Failed to fetch data" });
    }
};

// Fetch all data from detail_table
exports.getDetailTable = async (req, res) => {
    try {
        const query = `SELECT * FROM detail_table`;
        const results = await executeQuery(query);
        res.status(200).json({ success: true, data: results });
    } catch (err) {
        console.error("Error fetching data from detail_table:", err);
        res.status(500).json({ error: "Failed to fetch data" });
    }
};

// Fetch all data from item_master
exports.getAllItems = async (req, res) => {
    try {
        const query = `SELECT * FROM item_master`;
        const results = await executeQuery(query);
        res.status(200).json({ success: true, data: results });
    } catch (err) {
        console.error("Error fetching data from item_master:", err);
        res.status(500).json({ error: "Failed to fetch items" });
    }
};

// Create a new item in item_master
exports.createItem = async (req, res) => {
    const { item_code, item_name } = req.body;
    try {
        const query = `INSERT INTO item_master (item_code, item_name) VALUES (?, ?)`;
        const results = await executeQuery(query, [item_code, item_name]);

        res.status(201).json({
            success: true,
            message: "Item created successfully",
            itemId: results.insertId
        });
    } catch (err) {
        console.error("Error inserting data into item_master:", err);
        res.status(500).json({ error: "Failed to create item" });
    }
};


// Insert data into header_table
exports.insertHeaderTable = async (req, res) => {
    const { vr_no, vr_date, ac_name, ac_amt, status } = req.body;
    try {
        const query = `INSERT INTO header_table (vr_no, vr_date, ac_name, ac_amt, status) VALUES (?, ?, ?, ?, ?)`;
        const results = await executeQuery(query, [vr_no, vr_date, ac_name, ac_amt, status]);

        res.status(201).json({
            success: true,
            message: "Data inserted successfully into header_table",
            insertId: results.insertId
        });
    } catch (err) {
        console.error("Error inserting data into header_table:", err);
        res.status(500).json({ error: "Failed to insert data into header_table" });
    }
};

// Insert data into detail_table
exports.insertDetailTable = async (req, res) => {
    const { vr_no, sr_no, item_code, item_name, description, qty, rate } = req.body;
    try {
        const query = `INSERT INTO detail_table (vr_no, sr_no, item_code, item_name, description, qty, rate) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const results = await executeQuery(query, [vr_no, sr_no, item_code, item_name, description, qty, rate]);

        res.status(201).json({
            success: true,
            message: "Data inserted successfully into detail_table",
            insertId: results.insertId
        });
    } catch (err) {
        console.error("Error inserting data into detail_table:", err);
        res.status(500).json({ error: "Failed to insert data into detail_table" });
    }
};

