const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    photo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo', /* то есть мы ссылаемся на другую схему и таким образом делаем связь между двумя таблицами. то есть в будущем мы можем сказать, чтобы нам нашли пользователя по id */
    },
    avatarUrl: String,
},
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('User', UserSchema)