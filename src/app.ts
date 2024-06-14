import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from "./middleware/error.middleware";
import { notFound } from "./middleware/notFound.middleware";


const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());

app.use(errorHandler);
app.all("*", notFound);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});