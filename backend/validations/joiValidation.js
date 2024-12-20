const Joi = require('joi');

// JOI Schemas
const headerTableSchema = Joi.object({
    vr_no: Joi.number().integer().required(),
    vr_date: Joi.date().required(),
    ac_name: Joi.string().max(200).required(),
    ac_amt: Joi.number().precision(2).required(),
    status: Joi.string().valid('A', 'I').required()
});

const detailTableSchema = Joi.object({
    vr_no: Joi.number().integer().required(),
    sr_no: Joi.number().integer().required(),
    item_code: Joi.string().max(20).required(),
    item_name: Joi.string().max(200).required(),
    description: Joi.string().max(3000).required(),
    qty: Joi.number().precision(3).required(),
    rate: Joi.number().precision(2).required()
});

const itemMasterSchema = Joi.object({
    item_code: Joi.string().max(20).required(),
    item_name: Joi.string().max(200).required()
});

module.exports = {
    itemMasterSchema,
    detailTableSchema,
    headerTableSchema
};