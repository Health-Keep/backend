import express, { json } from "express";
import cors from 'cors';
import config from "./docs/swagger-output.json";
// import cookieParser from "cookie-parser";
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from "./middleware/error.middleware";
import { notFound } from "./middleware/notFound.middleware";
import connect_db from "./config/mongo";
import { userRouter } from "./features/users/routes";


const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(config));
app.use("/api/users", userRouter);

app.use(errorHandler);
app.all("*", notFound);

app.listen(PORT, () => {
    connect_db();
    console.log(`Server running on port ${PORT}`);
});