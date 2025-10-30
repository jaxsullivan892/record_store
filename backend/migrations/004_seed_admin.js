const bcrypt = require('bcrypt')

exports.shorthands = undefined

exports.up = async (pgm) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@admin.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
  const adminName = process.env.ADMIN_NAME || 'Administrator'

  const hash = await bcrypt.hash(adminPassword, 10)
  pgm.sql(`INSERT INTO users (email, password_hash, name, role)
           SELECT '${adminEmail}', '${hash}', '${adminName}', 'admin'
           WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = '${adminEmail}')`)
}

exports.down = (pgm) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@admin.com'
  pgm.sql(`DELETE FROM users WHERE email = '${adminEmail}'`)
}
