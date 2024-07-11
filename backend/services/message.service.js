import { asyncErrorHandler } from '../utils/errorHandler.js';
import { Conversation } from '../models/conversation.model.js';
import { Message } from '../models/message.model.js';

export const sendMessage = asyncErrorHandler(
	async (senderId, receiverId, message) => {
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		await Promise.all([conversation.save(), newMessage.save()]);
		return newMessage;
	}
);
