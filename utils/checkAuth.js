const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if(token) {
        try {
            const decoded = jwt.verify(token, 'ejkrgjebrgjherbjgfhbejrjhberjhgbrhjgbhjbgr')

            req.userID = decoded.id;

            next(); 
        } catch (error) {
            res.status(403).json({
                message: "Користувача не знайдено"
            })
        }

    } else {
        res.status(403).json({
            message: "Немає доступу"
        })
    }
}

module.exports = checkAuth