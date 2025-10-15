import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";
import { verifyRefreshToken, generateAccessToken } from "../utils/token";
import User from "../models/User";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const { user, accessToken, refreshToken } = await AuthService.registerUser(
      name,
      email,
      password,
      role
    );

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message, error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await AuthService.loginUser(
      email,
      password
    );

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Token required" });

    const decoded = verifyRefreshToken(token) as any;

    // extra security
        const user = await User.findById(decoded.userId);

    if (!user || !user.refreshTokens.includes(token)) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const accessToken = generateAccessToken(decoded.userId, decoded.role);

    res.status(200).json({ success: true, accessToken });
  } catch {
    res.status(403).json({ success: false, message: "Invalid refresh token" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res.status(400).json({ message: "Refresh token required" });

    const LogOut = await AuthService.logoutUser(refreshToken);

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch {
    res.status(400).json({ success: false, message: "Invalid token" });
  }
};
