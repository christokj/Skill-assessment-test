const { headerTableSchema, itemMasterSchema, detailTableSchema } = require("../validations/joiValidation");

// Middleware for Validation
const validateHeaderTable = (req, res, next) => {
    const { error } = headerTableSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validateDetailTable = (req, res, next) => {
    const { error } = detailTableSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validateItemMaster = (req, res, next) => {
    const { error } = itemMasterSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validateInsertData = (req, res, next) => {
    const { header_table, detail_table } = req.body;

    // Validate header_table
    const headerValidation = headerTableSchema.validate(header_table);
    if (headerValidation.error) {
        return res.status(400).json({ error: headerValidation.error.details[0].message });
    }

    // Validate detail_table
    for (let i = 0; i < detail_table.length; i++) {
        const detailValidation = detailTableSchema.validate(detail_table[i]);
        if (detailValidation.error) {
            return res.status(400).json({
                error: `Detail Table Entry ${i + 1}: ${detailValidation.error.details[0].message}`
            });
        }
    }

    next();
};

module.exports = {
    validateHeaderTable,
    validateDetailTable,
    validateItemMaster,
    validateInsertData
};
