const userModel = require('./../models/user-model')

const getUsers = async (req, res) => {
    const users = await userModel.all()
    res.status(200).json(users)
}

const postUser = async (req, res) => {
    try {
        await userModel.create(req.body).then(row => {
            res.status(201).json({token: row[0].token})
        })
    } catch(err) {
        console.log("ERR:", err)
        if(err.code=='23505') {
            return res.status(409).send("Username already exists")
        } else {
            return res.status(404).send("Bad Request")
        }
    }
}

const postTopup = async (req, res) => {
    try {
        let amount = parseInt(req.body.amount)
        const token = req.headers['authorization']
        const checkToken = await userModel.whereToken(token)
        if(checkToken.length>0) {
            if(amount>0 && amount<10000000) {
                amount = checkToken[0].balance+amount
                await userModel.topup(token, amount)
                return res.status(204).send("Topup successful")
            } else {
                return res.status(404).send("Invalid topup amount")
            }
        } else {
            return res.status(401).send("User token not valid")
        }
    } catch(err) {
        console.log("ERR:", err)
        return res.status(404).send("Bad request")
    }
}



module.exports = {
    getUsers,
    postUser,
    postTopup
}