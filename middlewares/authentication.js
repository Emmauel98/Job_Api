const jwt = require('jsonwebtoken');

const authentication = async (req,res,next)=>{
    const authHeader = req.headers.authorization;

    // confirm if token is present
    if (!authHeader || !authHeader.startsWith("Bearer")) {
       return res.status(404).json({error: "Token is not found"});
    }

    // Verify token
    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.user = { userId: payload.id, name: payload.name }
        // console.log(payload.id);
        next()
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = authentication;