import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';
import { PROFILE_PICTURES } from '../constants/index.js';

export const createUser = async ({ fullName, username, password, gender }) => {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const boyProfilePicture = `${PROFILE_PICTURES.MALE}${username}`;
	const girlProfilePicture = `${PROFILE_PICTURES.FEMALE}${username}`;

	const newUser = new User({
		fullName,
		username,
		password: hashedPassword,
		gender,
		profilePicture: gender === 'male' ? boyProfilePicture : girlProfilePicture,
	});

	await newUser.save();
	return newUser;
};

export const checkUsernameExists = async username => {
	return await User.findOne({ username });
};
