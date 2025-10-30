exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable('orders', {
    id: { type: 'serial', primaryKey: true },
    user_id: { type: 'integer', references: 'users' },
    status: { type: 'varchar(50)', default: 'pending' },
    total: { type: 'decimal(10,2)', notNull: true },
    shipping_address: { type: 'text' },
    created_at: { type: 'timestamp with time zone', notNull: true, default: pgm.func('current_timestamp') }
  })

  pgm.createTable('order_items', {
    id: { type: 'serial', primaryKey: true },
    order_id: { type: 'integer', references: 'orders' },
    product_id: { type: 'integer', references: 'sr_discogs_inventory' },
    quantity: { type: 'integer', notNull: true },
    price_at_time: { type: 'decimal(10,2)', notNull: true },
    created_at: { type: 'timestamp with time zone', notNull: true, default: pgm.func('current_timestamp') }
  })
}

exports.down = (pgm) => {
  pgm.dropTable('order_items')
  pgm.dropTable('orders')
}
