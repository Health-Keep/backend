import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import swaggerUi from 'swagger-ui-express';


const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});