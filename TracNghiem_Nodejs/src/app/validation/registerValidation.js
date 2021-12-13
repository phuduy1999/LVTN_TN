const Joi = require('joi');

function validateRegister(req, res, next) {
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
            .required()
            .messages({
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        MAMH: Joi.string()
            .max(15)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        MAGVDK: Joi.string()
            .max(15)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        TRINHDODK: Joi.string()
            .max(1)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        NGAYTHI: Joi.date()
            // .min('now')
            .required(),
        SCT: Joi.number()
            .required()
            .messages({
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        THOIGIANTHI: Joi.number()
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

function validateRegisterUpdate(req, res, next) {
    const schema = Joi.object({
        TRINHDODK: Joi.string()
            .max(1)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        NGAYTHI: Joi.date()
            // .min('now')
            .required(),
        SCT: Joi.number()
            .required()
            .messages({
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        THOIGIANTHI: Joi.number()
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

function validateRegisterGetQuestion(req, res, next) {
    const schema = Joi.object({
        IDDK: Joi.number()
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

function validateRegisterCheckTrial(req, res, next) {
    const schema = Joi.object({
        MAMH: Joi.string()
            .max(15)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        TRINHDODK: Joi.string()
            .max(1)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        SCT: Joi.number()
            .required()
            .messages({
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        THOIGIANTHI: Joi.number()
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

function validateRegisterCheck(req, res, next) {
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
            .required()
            .messages({
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        MAMH: Joi.string()
            .max(15)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        MASV: Joi.string()
            .max(15)
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

function validateRegisterCheckForTesting(req, res, next) {
    const schema = Joi.object({
        MAMH: Joi.string()
            .max(15)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        TRINHDODK: Joi.string()
            .max(1)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        SCT: Joi.number()
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

module.exports = {
    validateRegister, validateRegisterUpdate,
    validateRegisterGetQuestion, validateRegisterCheckTrial,
    validateRegisterCheck, validateRegisterCheckForTesting
};