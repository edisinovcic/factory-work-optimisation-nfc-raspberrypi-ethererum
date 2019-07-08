import express from "express";
import compression from "compression"; // compresses requests
import bodyParser from "body-parser";

// Routes (route handlers)
import tagRouter from './routes/tag';
//import employeeRouter from './routes/employee'

const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//Routes
app.use('/api/tag', tagRouter);
//app.use('/api/employee', employeeRouter);

export default app;