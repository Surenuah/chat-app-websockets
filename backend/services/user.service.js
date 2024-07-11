import { asyncErrorHandler } from '../utils/errorHandler.js';
import { User } from '../models/user.model.js';

export const getSidebarUsers = asyncErrorHandler(async loggedInUserId => {
	const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
		'-password'
	);

	return allUsers;
});
