const Joi = require('joi');

function validateSubject(req, res, next) {
    const schema = Joi.object({
        MAMH: Joi.string()
            .max(15)
            .required()
            .messages({
                'string.max': 'Độ dài {{#label}} phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
                'any.required': 'Trường {{#label}} là bắt buộc.'
            }),
        TENMH: Joi.string()
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

module.exports = { validateSubject };