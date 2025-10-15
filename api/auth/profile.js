import connectDB from '../../lib/mongodb.js';
import User from '../../models/User.js';
import { verifyToken } from '../../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const user = await verifyToken(req);
    const { fullName, phoneNumber, companyName, isAgency } = req.body;

    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (companyName !== undefined) updateData.companyName = companyName;
    if (isAgency !== undefined) updateData.isAgency = isAgency === 'yes' || isAgency === true;

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Profile update error:', error);
    if (error.message === 'Invalid token') {
      res.status(401).json({ message: 'Unauthorized' });
    } else {
      res.status(500).json({ message: 'Server error during profile update' });
    }
  }
}