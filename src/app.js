//configuracion de express
import express from "express";
import degreesRoutes from './routes/degrees.routes.js';
//import adviceRoutes from './routes/advice.routes.js';
//import advisedRoutes from './routes/advised.routes.js';
//import advisorRoutes from './routes/advisor.routes.js';
//import learningUnitRoutes from './routes/learningUnit.routes.js';
//import usersRoutes from './routes/users.routes.js';

const app = express();

// Middlewares
app.use(express.json());


//usar los router que creamos
app.use(degreesRoutes);
// app.use(adviceRoutes);
// app.use(advisedRoutes);
// app.use(advisorRoutes);
// app.use(learningUnitRoutes);
// app.use(usersRoutes);

export default app;