module.exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE IF NOT EXISTS sr_discogs_inventory (
      id SERIAL PRIMARY KEY,
      discogs_id VARCHAR(255),
      title VARCHAR(255) NOT NULL,
      artist VARCHAR(255) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      quantity INTEGER DEFAULT 0,
      description TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

module.exports.down = (pgm) => {
  pgm.sql('DROP TABLE IF EXISTS sr_discogs_inventory;');
};
