const bcrypt = require('bcrypt')

exports.shorthands = undefined

exports.up = async (pgm) => {
  // Create inventory
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

  // Users
  pgm.createTable('users', {
    id: { type: 'serial', primaryKey: true },
    email: { type: 'varchar(255)', notNull: true, unique: true },
    password_hash: { type: 'varchar(255)', notNull: true },
    name: { type: 'varchar(255)', notNull: true },
    role: { type: 'varchar(50)', default: 'user' },
    created_at: { type: 'timestamp with time zone', notNull: true, default: pgm.func('current_timestamp') }
  })

  // Orders and items
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

  // Seed an admin user idempotently
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@admin.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
  const adminName = process.env.ADMIN_NAME || 'Administrator'
  const hash = await bcrypt.hash(adminPassword, 10)
  // Insert if not exists
  pgm.sql(`INSERT INTO users (email, password_hash, name, role)
           SELECT '${adminEmail}', '${hash}', '${adminName}', 'admin'
           WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = '${adminEmail}')`)
}

exports.down = (pgm) => {
  pgm.dropTable('order_items')
  pgm.dropTable('orders')
  pgm.dropTable('users')
  pgm.dropTable('sr_discogs_inventory')
}
