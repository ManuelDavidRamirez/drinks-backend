const createError = require("http-errors")
const User = require("../models/User")
const generateTokenRandom = require("../helpers/generateTokenRandom")
const generateJWT = require("../helpers/generateJWT")

const register = async(req,res) => {

    try {
        const {name, email, password} = req.body

        if ([name, email, password].includes("") || !name || !email || !password) {
            throw createError(400, "Todos los campos son obligatorios")
        }

        let user = await User.findOne({
            email
        })

        if (user) {
            throw createError(400, "El email ya se encuentra registrado")
        }

        user = new User(req.body)
        user.token = generateTokenRandom()
        const userStore = await user.save()

        console.log(userStore);

        //TODO: ENVIAR EMAIL DE CONFIRMACIÓN DE REGISTRO

        return res.status(201).json({
            ok : true,
            message : "Se enviará un mail para confirmar el registro"
        })

    } catch (error) {
        return res.status(error.status || 500).json({
            ok : false,
            message : error.message || "Upss, hubo un error"
        })
    }
}

const login = async (req, res) => {

    try {
        const {email, password} = req.body

        if ([email, password].includes("") || !email || !password) {
            throw createError(400, "Todos los campos son obligatorios")
        }

        let user = await User.findOne({
            email
        }).populate("favorites")

        if (!user) {
            throw createError(400, "Usuario inexistente")
        }

        if (await user.checkedPassword(password)) {
            return res.status(200).json({
                ok : true,
                token : generateJWT({
                    user : {
                        id : user._id,
                        name : user.name,
                        favorites : user.favorites ? user.favorites.map(favorite => favorite.drink) : []
                    }
                })
            })
        } else {
            throw createError(403, "Credenciales inválidas")
        }

    } catch (error) {
        return res.status(error.status || 500).json({
            ok : false,
            message : error.message || "Upss, hubo un error"
        })
    }
}

module.exports = {
    register,
    login
}