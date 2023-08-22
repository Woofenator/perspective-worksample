import * as dotenv from 'dotenv';
import { app } from './app.js';

dotenv.config();

const port = process.env.PORT || 3111;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
