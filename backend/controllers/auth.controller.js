import {
	createUser,
	checkUsernameExists,
	validatePassword,
} from '../services/user.service.js';
import { generateTokenAndSetCookie } from '../utils/generateToken.js';

export const signupUser = async (req, res) => {
	try {
		const { fullName, username, password, confirmPassword, gender } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: 'Passwords do not match' });
		}

		const user = await checkUsernameExists(username);

		if (user) {
			return res.status(400).json({ error: 'Username already exists' });
		}

		const newUser = await createUser({ fullName, username, password, gender });

		if (newUser) {
			generateTokenAndSetCookie(newUser._id, res);
			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePicture: newUser.profilePicture,
			});
		} else {
			return res.status(400).json({ error: 'Invalid user data' });
		}
	} catch (error) {
		console.log('Error in signup controller', error.message);
		res.status(500).json({ error: error.message });
	}
};

export const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await checkUsernameExists(username);
		const isPasswordCorrect = await validatePassword(
			password,
			user?.password || ''
		);

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: 'Invalid username or password' });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePicture: user.profilePicture,
		});
	} catch (error) {
		console.log('Error in login controller', error.message);
		res.status(500).json({ error: error.message });
	}
};

export const logoutUser = (req, res) => console.log('logout user');
