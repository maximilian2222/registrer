const User = require('./models/Users')
const Role = require('./models/Role')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const {secret} = require('./config')




const generateAccessToken = (id, roles) =>{
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24"})

}



class authController {
    async registration(req, res) {
        try {
           const errors = validationResult(req)
            if (!errors.isEmpty()){
                return res.status(400).json({message: 'помилка', errors})
            }
            const { username, password } = req.body
            const candidate =  await User.findOne({username})
            if(candidate){
                return res.status(400).json({message: 'такий користувач вже є'})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({ value: 'USER'})
            const user = new User( {username, password: hashPassword, role: userRole.value})
            await user.save()
            return res.json({message:'користувач зарегістрований'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "registration error"})
        }
    }

    async login(req, res) {
        try {
            const { username, password} = req.body
            const user = await User.findOne({username})
            if(!user){
                return res.status(400).json({message: `користувач${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword){
                return res.status(400).json({message: `невірний пароль`})
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})



        } catch (e) {
            console.log(e)
            res.status(400).json({message: "login error"})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.findOne()
            res.json(users)

        } catch (e) {

        }
    }
}

module.exports = new authController()