import { createUser, checkUsernameExists } from '../services/user.service.js';

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

export const loginUser = (req, res) => console.log('login user');
export const logoutUser = (req, res) => console.log('logout user');
