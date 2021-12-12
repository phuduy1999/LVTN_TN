const Joi = require('joi');

function validateTeacher(req, res, next) {
    const schema = Joi.object({
        MAGV: Joi.string()
            .max(15)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        MANQ: Joi.string()
            .max(15)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        HO: Joi.string()
            .max(50)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        TEN: Joi.string()
            .max(15)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        DIACHI: Joi.string()
            .max(200)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        SDT: Joi.string()
            .max(12)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        EMAIL: Joi.string()
            .email()
            .max(50)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        MAKH: Joi.string()
            .required()
            .messages({
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
    })

    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send({ err: result.error.details[0].message });
    }
    else next();
}

function validateTeacherUpdate(req, res, next) {
    const schema = Joi.object({
        HO: Joi.string()
            .max(50)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        TEN: Joi.string()
            .max(15)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        DIACHI: Joi.string()
            .max(200)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        SDT: Joi.string()
            .max(12)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        MAKH: Joi.string()
            .required()
            .messages({
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
    })

    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send({ err: result.error.details[0].message });
    }
    else next();
}

module.exports = { validateTeacher, validateTeacherUpdate };