const db = require('../config/db');

// Fetch all data from header_table
exports.getHeaderTable = (req, res) => {
    const query = `SELECT * FROM header_table`;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching data from header_table:", err);
            return res.status(500).json({ error: "Failed to fetch data" });
        }

        res.status(200).json({
            success: true,
            data: results
        });
    });
};

// Fetch all data from detail_table
exports.getDetailTable = (req, res) => {
    const query = `SELECT * FROM detail_table`;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching data from detail_table:", err);
            return res.status(500).json({ error: "Failed to fetch data" });
        }

        res.status(200).json({
            success: true,
            data: results
        });
    });
};

// Fetch all data from item_master
exports.getAllItems = (req, res) => {
    const query = `SELECT * FROM item_master`;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching data from item_master:", err);
            return res.status(500).json({ error: "Failed to fetch items" });
        }

        res.status(200).json({
            success: true,
            data: results
        });
    });
};

// Fetch a single item by item_code
exports.getItemByCode = (req, res) => {
    const { item_code } = req.params;
    const query = `SELECT * FROM item_master WHERE item_code = ?`;

    db.query(query, [item_code], (err, results) => {
        if (err) {
            console.error("Error fetching item from item_master:", err);
            return res.status(500).json({ error: "Failed to fetch item" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Item not found" });
        }

        res.status(200).json({
            success: true,
            data: results[0]
        });
    });
};

// Create a new item in item_master
exports.createItem = (req, res) => {
    const { item_code, item_name, description } = req.body;
    const query = `INSERT INTO item_master (item_code, item_name, description) VALUES (?, ?, ?)`;

    db.query(query, [item_code, item_name, description], (err, results) => {
        if (err) {
            console.error("Error inserting data into item_master:", err);
            return res.status(500).json({ error: "Failed to create item" });
        }

        res.status(201).json({
            success: true,
            message: "Item created successfully",
            itemId: results.insertId
        });
    });
};

// Update an item in item_master
exports.updateItem = (req, res) => {
    const { item_code } = req.params;
    const { item_name, description } = req.body;
    const query = `UPDATE item_master SET item_name = ?, description = ? WHERE item_code = ?`;

    db.query(query, [item_name, description, item_code], (err, results) => {
        if (err) {
            console.error("Error updating data in item_master:", err);
            return res.status(500).json({ error: "Failed to update item" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Item not found" });
        }

        res.status(200).json({
            success: true,
            message: "Item updated successfully"
        });
    });
};

// Delete an item from item_master
exports.deleteItem = (req, res) => {
    const { item_code } = req.params;
    const query = `DELETE FROM item_master WHERE item_code = ?`;

    db.query(query, [item_code], (err, results) => {
        if (err) {
            console.error("Error deleting data from item_master:", err);
            return res.status(500).json({ error: "Failed to delete item" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Item not found" });
        }

        res.status(200).json({
            success: true,
            message: "Item deleted successfully"
        });
    });
};

// Insert data into header_table
exports.insertHeaderTable = (req, res) => {
    const { vr_no, vr_date, ac_name, ac_amt, status } = req.body;
    const query = `INSERT INTO header_table (vr_no, vr_date, ac_name, ac_amt, status) VALUES (?, ?, ?, ?, ?)`;

    db.query(query, [vr_no, vr_date, ac_name, ac_amt, status], (err, results) => {
        if (err) {
            console.error("Error inserting data into header_table:", err);
            return res.status(500).json({ error: "Failed to insert data into header_table" });
        }

        res.status(201).json({
            success: true,
            message: "Data inserted successfully into header_table",
            insertId: results.insertId
        });
    });
};

// Insert data into detail_table
exports.insertDetailTable = (req, res) => {
    const { vr_no, sr_no, item_code, item_name, description, qty, rate } = req.body;
    const query = `INSERT INTO detail_table (vr_no, sr_no, item_code, item_name, description, qty, rate) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [vr_no, sr_no, item_code, item_name, description, qty, rate], (err, results) => {
        if (err) {
            console.error("Error inserting data into detail_table:", err);
            return res.status(500).json({ error: "Failed to insert data into detail_table" });
        }

        res.status(201).json({
            success: true,
            message: "Data inserted successfully into detail_table",
            insertId: results.insertId
        });
    });
};

// Insert data into both header_table and detail_table
exports.insertData = (req, res) => {
    const { header_table, detail_table } = req.body;

    if (!header_table || !Array.isArray(detail_table)) {
        return res.status(400).json({ error: "Invalid data format" });
    }

    const headerQuery = `INSERT INTO header_table (vr_no, vr_date, ac_name, ac_amt, status) VALUES (?, ?, ?, ?, ?)`;
    const headerValues = [
        header_table.vr_no,
        header_table.vr_date,
        header_table.ac_name,
        header_table.ac_amt,
        header_table.status
    ];

    db.query(headerQuery, headerValues, (headerErr) => {
        if (headerErr) {
            console.error("Error inserting data into header_table:", headerErr);
            return res.status(500).json({ error: "Failed to insert data into header_table" });
        }

        const detailQuery = `INSERT INTO detail_table (vr_no, sr_no, item_code, item_name, description, qty, rate) VALUES ?`;
        const detailValues = detail_table.map((detail) => [
            detail.vr_no,
            detail.sr_no,
            detail.item_code,
            detail.item_name,
            detail.description,
            detail.qty,
            detail.rate
        ]);

        db.query(detailQuery, [detailValues], (detailErr) => {
            if (detailErr) {
                console.error("Error inserting data into detail_table:", detailErr);
                return res.status(500).json({ error: "Failed to insert data into detail_table" });
            }

            res.status(201).json({
                success: true,
                message: "Data inserted successfully into both tables"
            });
        });
    });
};
