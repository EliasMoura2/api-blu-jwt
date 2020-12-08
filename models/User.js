const { Schema, model } = require("mongoose");
// const bcrypt = require('bcrypt')
const userSchema = new Schema({
  username:{ type: String, required: true, min: 6, max: 255 },
  email: { type: String, required: true, min: 6, max: 1024 },
  password: { type: String, required: true, minlength: 6 },
  created_at: { type: Date, default: Date.now },
})

// userSchema.methods.encryptPass = async (password) => {
//   const salt = await bcrypt.genSalt(10)
//   return bcrypt.hash(password, salt)
// }
// userSchema.methods.validatePass = async function (password){
//   return  await bcrypt.compare(password, this.password)
// }

module.exports = model('User', userSchema)
