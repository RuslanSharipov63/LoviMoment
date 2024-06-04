const jwt = require("jsonwebtoken"); 


module.exports = (req, res, next) => {
    /* нам сейчас надо спарсить токен и потом его расшифровать */
    /* убираем слово Bearer потому что оно тоже передается вместе с токеном */
    const token = req.session.token;
    console.log(token)
    if (token) {
      try {
        const decoded = jwt.verify(token, "secret123");
        /* мы помним, что в нашем токене зашифрован id пользователя, дата создания и смерти токена. И мы из расшифрованного токена забираем id и вшиваем его в req (request) */
        req.userId = decoded._id;
        /* next() если мы пишем, то значит мы говорим программе, что надо дальше, следующую функцию выполнять. то есть в нашем роуте после checkAuthSession (если все без ошибок) будет выполняться callback */
        next();
      } catch (error) {
        /* если мы не смогли расшифровать токен то пишем */
        return res.status(403).json({ message: "Нет доступа" });
      }
    } else {
      return res.status(403).json({ message: "Нет доступа" });
    }
  };
  