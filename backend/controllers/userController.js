const db = require('../config/db');

// Fetch all data from header_table
exports.getHeaderTable = async (req, res) => {
    const query = `SELECT * FROM header_table, detail_table`;

    try {
        const [results] = await db.query(query); // Destructure the results from the promise

        res.status(200).json({ success: true, data: results });
    } catch (err) {
        console.error('Error fetching data from header_table:', err);
        res.status(500).json({ error: "Failed to fetch data" });
    }
};

// Fetch all data from detail_table
exports.getDetailTable = async (req, res) => {
    const query = `SELECT * FROM detail_table`;
    try {
        const [results] = await db.query(query); // Destructure the results from the promise

        res.status(200).json({ success: true, data: results });
    } catch (err) {
        console.error('Error fetching data from detail_table:', err);
        res.status(500).json({ error: "Failed to fetch data" });
    }

};

// Fetch all data from item_master
exports.getAllItems = async (req, res) => {
    const query = `SELECT * FROM item_master`;
    try {
        const [results] = await db.query(query); // Destructure the results from the promise
        res.status(200).json({ success: true, data: results });
    } catch (err) {
        console.error('Error fetching data from item_master:', err);
        res.status(500).json({ error: "Failed to fetch items" });
    }
};

// Save all data in one call using transactions
exports.saveAllData = async (req, res) => {
    try {
        const { header_table, detail_table, item_master } = req.body;

        // Perform database operations here
        // Insert into header_table
        const headerInsertQuery = `INSERT INTO header_table (vr_no, vr_date, ac_name, ac_amt, status) VALUES (?, ?, ?, ?, ?)`;
        await db.promise().query(headerInsertQuery, [
            header_table.vr_no,
            header_table.vr_date,
            header_table.ac_name,
            header_table.ac_amt,
            header_table.status,
        ]);

        // Insert into detail_table
        const detailInsertQuery = `INSERT INTO detail_table (vr_no, sr_no, item_code, item_name, description, qty, rate) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const detailInsertPromises = detail_table.map((detail) =>
            db.promise().query(detailInsertQuery, [
                detail.vr_no,
                detail.sr_no,
                detail.item_code,
                detail.item_name,
                detail.description,
                detail.qty,
                detail.rate,
            ])
        );
        await Promise.all(detailInsertPromises);

        // Insert into item_master if provided
        if (item_master) {
            const itemInsertQuery = `INSERT INTO item_master (item_code, item_name) VALUES (?, ?)`;
            await db.promise().query(itemInsertQuery, [item_master.item_code, item_master.item_name]);
        }

        res.status(201).json({ success: true, message: "Data saved successfully" });
    } catch (err) {
        console.error("Error saving data:", err);
        res.status(500).json({ error: "An error occurred while saving data" });
    }
};
