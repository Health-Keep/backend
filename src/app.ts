import express from 'express';
import cors from 'cors';
import config from './docs/swagger-output.json';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './middleware/error.middleware';
import { notFound } from './middleware/notFound.middleware';
import connect_db from './config/mongo';
import { user_router } from './features/users/routes';
import { org_router } from './features/organizations/routes/';

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(config));
app.use('/api/users', user_router);
app.use('/api/org', org_router);

app.use(errorHandler);
app.all('*', notFound);

app.listen(PORT, () => {
    connect_db();
    console.log(`Server running on port ${PORT}`);
});
