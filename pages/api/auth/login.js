import connectDB from '../../../utils/connectDB';
import Users from '../../../models/userModel';
import {
  createAccessToken,
  createRefreshToken,
} from '../../../utils/generateToken';
import bcrypt from 'bcrypt';

connectDB();
export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      await login(req, res);
      break;
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user)
      return res.status(400).json({ err: "This user doesn't exists!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ err: 'Incorrect password!' });
    }

    const access_token = createAccessToken({ id: user._id });
    const refresh_token = createRefreshToken({ id: user._id });

    res.json({
      msg: 'Login Succesful!',
      refresh_token,
      access_token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};