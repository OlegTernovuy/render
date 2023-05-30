const jwt = require('jsonwebtoken')

const generateAccessToken = (id,role) => {
	const payload = {
		id,
		role
	}

	return jwt.sign(payload,'SECRET_KEY',{expiresIn:'24h'})
}

module.exports = generateAccessToken