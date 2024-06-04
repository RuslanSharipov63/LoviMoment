const { body } = require('express-validator')
const loginValidation = [
    body('email', 'Неверный формат электронной почты').isEmail(),
    body('password', 'Пароль слишком короткий. Минимум 5 символов').isLength({ min: 5 }),
]
module.exports = loginValidation; 