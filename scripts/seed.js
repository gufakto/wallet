const db = require('../db')

;(async () => {
  try {
    await db('users').insert({ username: 'gufakto', token: '29435530', balance: 0 })
    await db('users').insert({ username: 'bahran', token: '11111', balance:0 })
    console.log('Added dummy users!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})()
