import { getSidebarUsers as getSidebarUsersService } from '../services/user.service.js';
import { asyncErrorHandler } from '../utils/errorHandler.js';

export const getSidebarUsers = asyncErrorHandler(async (req, res) => {
	const loggedInUserId = req.user._id;
	const allUsers = await getSidebarUsersService(loggedInUserId);

	res.status(200).json(allUsers);
});
