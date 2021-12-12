const express = require('express')
const morgan = require('morgan')

const {
  getUsers,
  postUser,
  postTopup
} = require('./src/controllers/user')

const {
  allTransaction,
  balance,
  postTransfer,
  top_transactions_per_user,
  top_users
} = require('./src/controllers/transaction')

const PORT = process.env.PORT || 5000
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => res.send('Hello World halo Siagian!'))

app.get('/users', getUsers)

app.get('/transactions', allTransaction)

app.post('/user', postUser)

app.post('/topup', postTopup)

app.get('/balance', balance)

app.post('/transfer', postTransfer)

app.get('/top_transactions_per_user', top_transactions_per_user)

app.get('/top_users', top_users)

app.listen(PORT, () => console.log(`Server up at http://localhost:${PORT}`))

module.exports = app
