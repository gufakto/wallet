const db = require('./../../db')

const table = "transfer"

const Transfer = {
    all: async () => {
        return await db.select().from(table)
    },
    sendTo: async (data) => {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        data = Object.assign(data, {created_at: today.toISOString()})
        return await db.insert(data).returning('*').into(table)
    },
    topTransactionByUser: async (id, username) => {
        return await db.select("transfer.to", "users.username", "transfer.value")
                    .where("user_id", id)
                    .orWhere('to', username)
                    .innerJoin("users", function() {
                        this.on("transfer.user_id", '=', 'users.id')
                    })
                    .orderBy("value", 'desc')
                    .limit(10)
                    .from(table)
    },
    top_users: async () => {
        return await db.select("users.username", db.raw("SUM(transfer.value) as amount"))
        .innerJoin("users", function() {
            this.on("transfer.user_id", '=', 'users.id')
        })
        .groupBy("users.username")
        .orderBy("amount", 'desc')
        .limit(10)
        .from(table)
    }

}

module.exports = Transfer

