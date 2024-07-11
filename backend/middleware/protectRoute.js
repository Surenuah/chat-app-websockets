import jwt from 'jsonwebtoken';
import { asyncErrorHandler } from '../utils/errorHandler.js';
import { User } from '../models/user.model.js';

export const protectRoute = asyncErrorHandler(async (req, res, next) => {
	const token = req.cookies.jwt;

	if (!token) {
		return res.status(401).json({ error: 'Unauthorized - No token provided' });
	}

	const decoded = jwt.verify(token, process.env.JWT_SECRET);

	if (!decoded) {
		return res.status(401).json({ error: 'Unauthorized - Invalid token' });
	}

	const user = await User.findById(decoded.userId).select('-password');

	if (!user) {
		return res.status(404).json({ error: 'User not found' });
	}

	req.user = user;
	next();
});
