const {secret} = require("../config");
const jwt = require('jsonwebtoken')

module.exports = function (roles){
    return function (req, res, next){
        if(req.method === "OPTIONS"){
            next()
        };

        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token){
                return res.status(403).json({message: 'користувач не авторизований'})
            }
            const {roles: userRoles} = jwt.verify(token, secret)
            let hasRoles = false
            userRoles.forEach(role => {
                if(roles.includes(role)){
                    hasRoles = true
                }
            })
            if(!hasRoles){
                return res.status(403).json({message: 'нема доступа'})
            }





            next()

        } catch (e){
            console.log(e)
            return res.status(403).json({message: 'користувач не авторизований'})
        }


    }


}