import User from '../Models/Users.js';
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
  try {
    console.log("Request body:", req.body); // <-- log the incoming data

    const { fullname, phone, password } = req.body;

    if (!fullname || !phone || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Phone number already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullname, phone, password: hashedPassword});

    await newUser.save();

    res.status(201).json({ success: true, message: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err); // <-- full error logged
    res.status(500).json({ success: false, message: err.message });
  }
};

