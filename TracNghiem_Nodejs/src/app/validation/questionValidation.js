const Joi = require('joi');

function validateQuestion(req, res, next) {
    const schema = Joi.object({
        TRINHDO: Joi.string()
            .max(1)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        NOIDUNG: Joi.string()
            .required()
            .messages({
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        DAP_AN: Joi.string()
            .max(30)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        MAMH: Joi.string()
            .max(15)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        MALOAICH: Joi.string()
            .max(15)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        MAGV: Joi.string()
            .max(15)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        CAC_LUA_CHON: Joi.array()
            .items(Joi.object({
                STT: Joi.string()
                    .max(1)
                    .required()
                    .messages({
                        'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                        'any.required': 'Trường {{#label}} là bắt buộc.'
                    }),
                NOIDUNG: Joi.string()
                    .max(200)
                    .required()
                    .messages({
                        'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                        'any.required': 'Trường {{#label}} là bắt buộc.'
                    }),
            })),
    })

    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send({ err: result.error.details[0].message });
    }
    else next();
}

function validateQuestionUpdate(req, res, next) {
    const schema = Joi.object({
        TRINHDO: Joi.string()
            .max(1)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        NOIDUNG: Joi.string()
            .required()
            .messages({
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        DAP_AN: Joi.string()
            .max(30)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        MAMH: Joi.string()
            .max(15)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        CAC_LUA_CHON: Joi.array()
            .items(Joi.object({
                STT: Joi.string()
                    .max(1)
                    .required()
                    .messages({
                        'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                        'any.required': 'Trường {{#label}} là bắt buộc.'
                    }),
                NOIDUNG: Joi.string()
                    .max(200)
                    .required()
                    .messages({
                        'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                        'any.required': 'Trường {{#label}} là bắt buộc.'
                    }),
            })),
    })

    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send({ err: result.error.details[0].message });
    }
    else next();
}

module.exports = { validateQuestion, validateQuestionUpdate };