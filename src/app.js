//configuracion de express
import express from "express";
import cors from "cors";

import dotenv from 'dotenv';
dotenv.config();

import adviseesRoutes from './routes/advisees.routes.js';
import advisorsRoutes from './routes/advisors.routes.js';
import advisorySessionsRoutes from './routes/advisorySessions.routes.js';
import degreesRoutes from './routes/degrees.routes.js';
import learningUnitRoutes from './routes/learningUnit.routes.js';
import usersRoutes from './routes/users.routes.js';


const app = express();

const corsOptions = {
    origin: process.env.FRONT_URL || 'http://localhost:4000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

// Habilitar CORS
app.use(cors(corsOptions));

// Middlewares
app.use(express.json());


//usar los router que creamos
app.use(adviseesRoutes);
app.use(advisorsRoutes);
app.use(advisorySessionsRoutes);
app.use(degreesRoutes);
app.use(learningUnitRoutes);
app.use(usersRoutes);

export default app;