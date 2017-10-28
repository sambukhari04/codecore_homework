const kx = require('./connections')


  kx.schema.createTable('cohorts', table => {
   table.increments('id')
   table.string('name')
   table.string('members')
   table.string('logo_url')
   table.timestamps(false, true)
  }).then(() => process.exit())
   .catch(() => process.exit())
