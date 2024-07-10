import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.get('api/auth/logout', (req, res) => {
	console.log('logout route');
});

app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on the ${PORT} port`));
