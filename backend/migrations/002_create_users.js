exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable('users', {
    id: { type: 'serial', primaryKey: true },
    email: { type: 'varchar(255)', notNull: true, unique: true },
    password_hash: { type: 'varchar(255)', notNull: true },
    name: { type: 'varchar(255)', notNull: true },
    role: { type: 'varchar(50)', default: 'user' },
    created_at: { type: 'timestamp with time zone', notNull: true, default: pgm.func('current_timestamp') }
  })
}

exports.down = (pgm) => {
  pgm.dropTable('users')
}
