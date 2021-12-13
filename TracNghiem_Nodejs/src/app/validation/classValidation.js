const Joi = require('joi');

function validateClass(req, res, next) {
    const schema = Joi.object({
        NIENKHOA: Joi.string()
            .max(10)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        HOCKY: Joi.number()
            .min(1)
            .max(2)
            .required()
            .messages({
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        NHOM: Joi.number()
            .min(1)
            .required()
            .messages({
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        SOSVTT: Joi.number()
            .min(1)
            .required()
            .messages({
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        MAKH: Joi.string()
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        MAMH: Joi.string()
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        MAGV: Joi.string()
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
    })

    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send({ err: result.error.details[0].message });
    }
    else next();
}

module.exports = { validateClass };