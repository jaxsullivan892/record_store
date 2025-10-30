exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable('sr_discogs_inventory', {
    id: { type: 'serial', primaryKey: true },
    discogs_id: { type: 'varchar(255)' },
    title: { type: 'varchar(255)', notNull: true },
    artist: { type: 'varchar(255)', notNull: true },
    price: { type: 'decimal(10,2)', notNull: true },
    quantity: { type: 'integer', default: 0 },
    description: { type: 'text' },
    created_at: { type: 'timestamp with time zone', notNull: true, default: pgm.func('current_timestamp') },
    updated_at: { type: 'timestamp with time zone', notNull: true, default: pgm.func('current_timestamp') }
  })
}

exports.down = (pgm) => {
  pgm.dropTable('sr_discogs_inventory')
}
