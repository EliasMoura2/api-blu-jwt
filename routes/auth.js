// const { Router } = require('express')
// const router = Router()
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const verifyToken = require('../middleware/verifyToken')

// Validaciones datos user
const schemaRegister = Joi.object({
  username: Joi.string().min(6).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
})

router.post('/register', async (req, res, next) => {
  // res.json({
  //   error: null,
  //   data: 'Aqui va la data'
  // })

    // validar datos ingresados
    const { error } = schemaRegister.validate(req.body)

    if( error ){
      return res.status(400).json({ error: error.details[0].message})
    }

    // validar email
    const isEmailExist = await User.findOne({ email: req.body.email})
    if(isEmailExist){
      return res.status(400).json({
        error: true,
        message: 'Email registrado'
      })
    }

    // password hash
    const salt = await bcrypt.genSalt(10)
    const passwordHashed = await bcrypt.hash(req.body.password, salt)
    // const passwordHashed = await user.encryptPass(req.body.password);

    const { username, email } = req.body
    // console.log(username, email, password);
    const user = new User({
      username,
      email,
      password : passwordHashed
    })

    try{
      const userDB = await user.save();
      res.json({
        error: null,
        data: userDB
      })
    } catch (error){
      res.status(400).json({error})
    }
  // user.password = await user.encryptPass(user.password);
  
  //podria ir lo exportado en config.secret
  // const token = jwt.sign({id: user._id}, process.env.SECRET,{
      // expiresIn: 60 * 60 * 24 //expiracion del token = segundos * minutos * horas = 1 dia
    // });
    // console.log(user)
    // res.json({ auth: true, token})
})

// validaciones datos login
const schemaLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required()
})

router.post('/login', async (req, res, next) => {
  
  // validaciones
  const { error } = schemaLogin.validate(req.body)
  if( error ){
    return res.status(400).json({ error: error.details[0].message })
  }

  // buscamos el usuario
  const user = await User.findOne({ email: req.body.email})
  if(!user){
    // return res.status(400).json({ error: true, message: 'Usuario no encontrado'})
    return res.status(400).json({ error: true, message: 'datos no valido'})
  } // el email no existe

  // validar password
  const validPassword = await bcrypt.compare( req.body.password, user.password)
  // const validPass = await user.validatePass(password); 

  if(!validPassword){
    // return res.status(400).json({ error: true, message: 'Password no valida'})
    return res.status(400).json({ auth: false, error: true, message: 'datos no valido'})
  }


  // user.password = await user.encryptPass(user.password);
  
  //creacion token
  const token = jwt.sign(
    {
      username: user.username,
      id: user._id
    }, process.env.TOKEN_SECRET,{
      expiresIn: 60 * 60 * 24 //expiracion del token = segundos * minutos * horas = 1 dia
    });
    // console.log(user)
    // res.json({ auth: true, token})

    // res.header('auth-token', token).json({
    //   error: null,
    //   data: { token}
    // })

        // console.log(user)
        // res.json({ auth: true, token})

  res.json({
    auth: true,
    error: null,
    data: 'Ingreso exitoso, Bienvenido',
    token: token
  })
})

router.get('/me', verifyToken, async(req, res, next) => {
  /*
      codigo pasado a la funcion verifyToken
  */
  //console.log(decoded);
  //res.json('me')

  const user = await User.findById(req.user, {password : 0}); 
  //la constrasenia no debe ser devuelta, en ese objeto podemos poner lo que no qeuremos que devuelva
  if(!user){
      return res.status(404).send('No user found')
  }
  
  res.json(user)
});

router.get('/dashboard', verifyToken, (req, res) => {
  res.json('dashboard')
})

module.exports = router