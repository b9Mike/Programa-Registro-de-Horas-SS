//configuracion de express
import express from "express";

import adviseesRoutes from './routes/advisees.routes.js';
import advisorsRoutes from './routes/advisors.routes.js';
import advisorySessionsRoutes from './routes/advisorySessions.routes.js';
import degreesRoutes from './routes/degrees.routes.js';
import learningUnitRoutes from './routes/learningUnit.routes.js';
import usersRoutes from './routes/users.routes.js';

const app = express();

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