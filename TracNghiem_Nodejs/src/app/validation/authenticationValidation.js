const Joi = require('joi');

function validateLogin(req, res, next) {
    const schema = Joi.object({
        EMAIL: Joi.string()
            .email()
            .max(50)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        PASSWORD: Joi.string()
            .max(50)
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

function validateRefreshToken(req, res, next) {
    const schema = Joi.object({
        refreshToken: Joi.string()
            .required()
            .messages({
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
    })

    const result = schema.validate(req.body);
    if (result.error) {
        res.status(403).send({ err: result.error.details[0].message });
    }
    else next();
}

function validateChangePassword(req, res, next) {
    const schema = Joi.object({
        EMAIL: Joi.string()
            .email()
            .max(50)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        PASSWORD: Joi.string()
            .max(50)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        PASSWORD_NEW: Joi.string()
            .max(50)
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

module.exports = { validateLogin, validateRefreshToken, validateChangePassword };