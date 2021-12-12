const db = require('../db')

;(async () => {
  try {
    await db.schema.dropTableIfExists('users')
    await db.schema.withSchema('public').createTable('users', (table) => {
      table.increments()
      table.string('username').unique().notNullable()
      table.string('token').unique().notNullable()
      table.float('balance').defaultTo(0)
      table.timestamp('created_at').defaultTo(db.fn.now())
      table.timestamp('updated_at').nullable()
    })
    console.log('Created users table!')

    await db.schema.dropTableIfExists('transfer')
    await db.schema.withSchema('public').createTable('transfer', (table) => {
      table.increments()
      table.integer('user_id')
      table.float('value')
      table.string('to')
      table.timestamp('created_at')
    })

    console.log('Created transfer table!')

    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})()
