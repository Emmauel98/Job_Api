import User from "../models/User";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/token";
import { IUser } from "../models/User";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already registered");

  const user = await User.create({ name, email, password, role });
  const accessToken = generateAccessToken(user._id.toString(), user.role);
  const refreshToken = generateRefreshToken(user._id.toString(), user.role);

  user.refreshTokens.push(refreshToken);
  await user.save();

  return { user, accessToken, refreshToken };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user._id.toString(), user.role);
  const refreshToken = generateRefreshToken(user._id.toString(), user.role);

  user.refreshTokens.push(refreshToken);
  await user.save();

  return { user, accessToken, refreshToken };

};

// export const refreshUserToken = async (token:string) => {
//   try {

//     const decoded = verifyRefreshToken(token) as any;
//     const user = await User.findById(decoded.userId);

//     if (!user || !user.refreshTokens.includes(token)) {
//       return res.status(403).json({ message: "Invalid refresh token" });
//     }

//     const accessToken = generateAccessToken(decoded.userId, decoded.role);
//     res.status(200).json({ success: true, accessToken });
//   } catch {
//     res.status(403).json({ success: false, message: "Invalid refresh token" });
//   }
// };


export const logoutUser = async (refreshToken: string) => {
    const decoded = verifyRefreshToken(refreshToken) as any;
    const user = await User.findById(decoded.userId);
    if (!user) throw new Error("Invalid credentials");

    user.refreshTokens = user.refreshTokens.filter((t: string) => t !== refreshToken);
    await user.save();

    return 
    // res.status(200).json({ success: true, message: "Logged out successfully" });
};
