import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath,pathToFileURL } from 'url';
import fs from 'fs';

import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Loading models from directory: %s', __dirname);

export const sequelize =  new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // This line is important for self-signed certificates
    },
  },
});

const db = { sequelize, Sequelize };

const modelFiles = fs.readdirSync(__dirname).filter(file =>
  file.endsWith('.js') && file !== 'index.js' && file !== 'sequelize.js'
);

for (const file of modelFiles) {
    const filePath = path.join(__dirname, file);
    const { default: modelDef } = await import(pathToFileURL(filePath).href); 
    const model = modelDef(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }

Object.values(db)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(db));

console.log('Models loaded:', Object.keys(db).join(', '));

export default db;

export const { User, Product, TradeOffer, TradeMessage,Category } = db;