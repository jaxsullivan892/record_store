module.exports.up = (pgm) => {
  pgm.sql(`
    INSERT INTO users (email, password_hash, name, role)
    VALUES (
      'admin@admin.com',
      '$2b$10$qUMkXTEtIC/0NHNRvFhp6O1fO962LXEzL1gnfANL9Or04o0.JrIH2',
      'Administrator',
      'admin'
    )
    ON CONFLICT (email) DO NOTHING;
  `);
};

module.exports.down = (pgm) => {
  pgm.sql("DELETE FROM users WHERE email = 'admin@admin.com';");
};
