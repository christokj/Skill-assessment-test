const { headerTableSchema, detailTableSchema, itemMasterSchema } = require("../validations/joiValidation");

const validateAllTables = (req, res, next) => {
    const { header_table, detail_table, item_master } = req.body;
    console.log(header_table)
    // Validate header_table
    if (header_table) {
        const { error } = headerTableSchema.validate(header_table[0]);
        if (error) {
            return res.status(400).json({ error: `Header Table: ${error.details[0].message}` });
        }
    } else {
        return res.status(400).json({ error: "Header Table data is required." });
    }

    // Validate detail_table
    if (Array.isArray(detail_table) && detail_table.length > 0) {
        for (let i = 0; i < detail_table.length; i++) {
            const { error } = detailTableSchema.validate(detail_table[i]);
            if (error) {
                return res.status(400).json({
                    error: `Detail Table Entry ${i + 1}: ${error.details[0].message}`,
                });
            }
        }
    } else {
        return res.status(400).json({ error: "Detail Table data must be a non-empty array." });
    }

    // Validate item_master (if provided)
    if (item_master) {
        const { error } = itemMasterSchema.validate(item_master);
        if (error) {
            return res.status(400).json({ error: `Item Master: ${error.details[0].message}` });
        }
    }
    console.log(header_table, detail_table, item_master)
    // next(); // Proceed to the next middleware or route handler
};

module.exports = { validateAllTables };
