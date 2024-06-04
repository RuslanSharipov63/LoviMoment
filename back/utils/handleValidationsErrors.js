const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
    /* мы сделаем логику: если произошла какая-то ошибка валидации, то дальше мы запрос выполнять не будем */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    next();
} 

module.exports = handleValidationErrors;