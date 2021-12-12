const userModel = require("./../models/user-model")
const transferModel = require("./../models/transfer-model")

const allTransaction = async (req, res) => {
    const data = await transferModel.all()
    return res.status(200).json(data)
}

const balance = async (req, res) => {
    try {
        const token = req.headers['authorization']
        const checkToken = await userModel.whereToken(token)
        if(checkToken.length>0) {
            return res.status(200).json({balance: checkToken[0].balance})
        } else {
            return res.status(401).send("Unauthorized user")
        }
    } catch(err) {
        console.log("ERR:", err)
        return res.status(409).send("Bad Request")
    }
}

const postTransfer = async (req, res) => {
    try {
        const token = req.headers['authorization']
        const username = req.body.to_username
        let amount = parseInt(req.body.amount)

        const checkFrom = await userModel.whereToken(token)
        const checkToUsername = await userModel.where('username', username)
        if(checkFrom.length>0) {
            if(checkToUsername.length>0) {
                amountDeducted = checkFrom[0].balance-amount
                if(amountDeducted>0) {
                    const amountAdded = amount+checkToUsername[0].balance
                    await userModel.topup(token, amountDeducted)
                    await userModel.addedBalance(username, amountAdded)
                    await transferModel.sendTo({
                        user_id: checkFrom[0].id,
                        value: amount,
                        to: checkToUsername[0].username
                    })
                    return res.status(204).json({balance: amount})
                } else {
                    return res.status(401).send("Insufficient balance")
                }
            } else {
                return res.status(404).send("Destination user not found")
            }
        } else {
            return res.status(401).send("Unauthorized")
        }
    } catch(err) {
        console.log("ERR", err)
        res.status(409).send("Bad request")
    }
}

const top_transactions_per_user = async (req, res) => {
    try {
        const token = req.headers['authorization']
        const checkToken = await userModel.whereToken(token)
        if(checkToken.length>0) {
            const data = await transferModel.topTransactionByUser(checkToken[0].id, checkToken[0].username)
            var result = []
            data.forEach(r => {
                if(r.username==checkToken[0].username) {
                    result.push({
                        username: r.to,
                        amount: r.value*-1
                    })
                } else {
                    result.push({
                        username: r.username,
                        amount: r.value
                    })
                }
            })
            return res.status(200).json(result)
        } else {
            return res.status(401).send("Unauthorized")
        }
    } catch(err) {
        console.log("ERR:", err)
        return res.status(500).send("Bad Request")
    }
}

const top_users = async (req, res) => {
    try {
        const token = req.headers['authorization']
        const checkToken = await userModel.whereToken(token)
        if(checkToken.length>0) {
            const data = await transferModel.top_users()
            let result = []
            data.forEach((r) => {
                result.push({
                    username: r.username,
                    transacted_value: r.amount*-1
                })
            })
            res.status(200).json(result)
        } else {
            return res.status(401).send("Unauthorized")
        }
    } catch(err) {
        console.log("ERR:", err)
        return res.status(500).send("Bad Request")
    }
}

module.exports = {
    allTransaction,
    balance,
    postTransfer,
    top_transactions_per_user,
    top_users
}