import jwt from "jsonwebtoken";
import { config } from "dotenv";

const { verify } = jwt;
config();

export const verifyToken = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // 1. Get token from cookie 
      const token = req.cookies?.token;

      // 2. Check if token exists
      if (!token) {
        return res.status(401).json({ message: "Please login first" });
      }

      // 3. Validate token
      const decodedToken = verify(token, process.env.SECRET_KEY);

      // 4. Role Authorization
      if (allowedRoles.length > 0 && !allowedRoles.includes(decodedToken.role)) {
        return res.status(403).json({ message: "You are not authorized for this action" });
      }

      // 5. Attach decoded user data to request object
      req.user = decodedToken;
      
      next();
    } catch (err) {
      // Handles expired or tampered tokens
      return res.status(401).json({ message: "Session expired or invalid token" });
    }
  };
};