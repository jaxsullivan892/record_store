import fs from 'fs'
import path from 'path'
import pool from './index.js'
import bcrypt from 'bcrypt'

async function run() {
  try {
    const sqlPath = path.resolve(new URL('.', import.meta.url).pathname, 'schema.sql')
    // If schema.sql exists in the same folder as this script, fall back to repo path
    let schemaFile = path.resolve(process.cwd(), 'src', 'db', 'schema.sql')
    if (!fs.existsSync(schemaFile)) schemaFile = sqlPath

    const sql = fs.readFileSync(schemaFile, 'utf8')
    // Execute the schema statements
    await pool.query(sql)
    console.log('Schema executed')

    // Ensure admin user exists (idempotent)
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@admin.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
    const adminName = process.env.ADMIN_NAME || 'Administrator'

    const res = await pool.query('SELECT id FROM users WHERE email = $1', [adminEmail])
    if (res.rows.length) {
      console.log('Admin user already exists')
    } else {
      const hash = await bcrypt.hash(adminPassword, 10)
      await pool.query('INSERT INTO users (email, password_hash, name, role) VALUES ($1, $2, $3, $4)', [adminEmail, hash, adminName, 'admin'])
      console.log('Admin user created')
    }

    process.exit(0)
  } catch (err) {
    console.error('Migration failed', err)
    process.exit(1)
  }
}

run()
