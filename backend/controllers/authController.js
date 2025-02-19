import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';

export const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(404).json({ message: 'Admin not found.' });

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials.' });

    const token = jwt.sign({ id: admin._id }, 'your-secret-key', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};