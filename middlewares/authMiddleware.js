const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (token === undefined || token === "") {
            res.json({
                status: 401,
                success: false,
                message: "Token not provided"
            })
        }
        else {
            jwt.verify(token, XYZ123456, function (err, decoded) {
                if (err) {
                    res.json({
                        status: 401,
                        success: false,
                        message: "Unauthorized User",
                        err
                    })
                }
                else {
                    req.user = decoded;
                    next();
                }
            })
        }
    }
    catch (err) {
        console.log(err);
        res.status(401).send({
            message: "Auth Failed",
            success: false
        })
    }
}