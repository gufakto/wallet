const db = require('./../../db')

const table = "users"

function makeid(length) {
    var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

const User = {
    all: async () => {
        return await db.select().from(table)
    },
    whereID: async (id) => {
        return await db.select().where("id", id).from(table)
    },
    whereToken: async (token) => {
        return await db.select().where('token', token).from(table)
    },
    where: async (column, value) => {
        return await db.select().where(column, value).from(table);
    },
    create: async (data) => {
        data = Object.assign(data, {balance: 0, token: makeid(8)})
        // console.log("TEST", data)
        return await db.insert(data).returning('*').into(table)
    },
    topup: async (token, amount) => {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        return await db(table).where('token', token).update({balance: amount, updated_at: today.toISOString()}, ['id', 'username', 'balance'])
    },
    addedBalance: async (username, amount) => {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        return await db(table).where('username', username).update({balance: amount, updated_at: today.toISOString()}, ['id', 'username', 'balance'])
    },

}

module.exports = User

