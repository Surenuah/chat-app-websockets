import { sendMessage as sendMessageService } from '../services/message.service.js';
import { asyncErrorHandler } from '../utils/errorHandler.js';

export const sendMessage = asyncErrorHandler(async (req, res) => {
	const { message } = req.body;
	const { id: receiverId } = req.params;
	const senderId = req.user._id;
	const newMessage = await sendMessageService(senderId, receiverId, message);

	res.status(201).json(newMessage);
});
