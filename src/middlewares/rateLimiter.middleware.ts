import rateLimit from "express-rate-limit";

// Limit login attempts
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10,
  message: "Too many login attempts, please try again later.",
});

// Limit AI endpoints (they’re compute-heavy)
export const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 5,
  message: "Too many AI requests, please slow down.",
});