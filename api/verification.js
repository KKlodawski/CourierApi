const { secretKey } = require('./config/config');
const jwt = require('jsonwebtoken');

const Roles = {
    CLIENT: 'Client',
    COURIER: 'Courier',
    MANAGER: 'Menager'
}

/**
 *
 * @param roles (Array of roles)
 */
const verifyToken = (roles = []) => ( req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Access token not provided' });
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        if(roles && roles.length > 0) {
            let isRoleCorrect = false;
            roles.forEach((e) => {
                if (e === decoded.role)
                    isRoleCorrect = !isRoleCorrect;
            })
            if (!isRoleCorrect) {
                throw new Error();
            }
        }
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
}

module.exports = {verifyToken, Roles };