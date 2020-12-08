const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.headers['auth-token'];
    if(!token){
      return res.status(401).json({
        auth: false,
        message: 'No token provided, Denied access'
      })
    }

    try{
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      // req.userId = decoded.id;
      req.user = decoded.id // creamos un req.user que puede ser usado en otra ruta
      next(); // continuamos
    }catch(error){
      res,status(400).json({error: true, message: 'token no valido'})
    }
}

module.exports = verifyToken;