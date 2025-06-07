import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
console.log('JWT_SECRET:', process.env.JWT_SECRET); // Debug line
const JWT_SECRET = process.env.JWT_SECRET;

// Signup
export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Username already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login
export const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log("Login request for:", username);
  
      const user = await User.findOne({ username });
      if (!user) {
        console.log("User not found");
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("Password mismatch");
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,  
        { expiresIn: '1d' }
      );
  
      console.log("Token created successfully");
      res.status(200).json({ token });
  
    } catch (err) {
      console.error('Login error:', err);  
      res.status(500).json({ message: 'Server error' });
    }
  };
  