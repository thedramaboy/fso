const { rollbackMigration } = require('./db')

rollbackMigration().catch((err) => {
  console.error(err.message)
  console.error(err.cause?.message)
  process.exit(1)
})