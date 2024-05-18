'use strict';

import fs from 'fs';
import path from 'path';
import { fileURLToPath }  from 'url';

import Sequelize from 'sequelize';
import { sequelize } from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const db = {};

const files = fs.readdirSync(__dirname).filter(file => {
  return (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js' &&
    file.indexOf('.test.js') === -1
  );
});

for (const file of files) {
  const model = (await import(path.join(__dirname, file))).default(sequelize);
  db[model.name] = model;
}

for (const modelName of Object.keys(db)) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
