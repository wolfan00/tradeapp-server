import express, { json, urlencoded } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mainRoutes from './routes/mainRoutes.js';
import { adminJs, adminRouter } from './admin.js';
import {sequelize} from './models/index.js';
import path from 'path';
// Configuring dotenv
dotenv.config();

const app = express();
const port = 3000;
//middle wares
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


app.use(cookieParser()); //cookie okumak için gerekli!
app.use(json()); // JSON verisini okumak için gerekli!
app.use(urlencoded({ extended: true })); // Form verisi için gerekli!
app.use('/', mainRoutes); // routes all Main routes

app.listen(port, () => {
  console.log(`AdminJS: http://localhost:${port}${adminJs.options.rootPath}`); //admin paneli girişi
  console.log(`Server is running on http://localhost:${port}/`); //server girişi
});

// Syncing the database
sequelize.sync({ alter: true }).then(() => {
  console.log('Database & tables created!');
}).catch((error) => {
  console.error('Error creating database & tables:', error);
});