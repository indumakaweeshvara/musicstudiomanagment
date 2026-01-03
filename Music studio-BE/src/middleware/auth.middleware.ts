import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user.model'; 

// TypeScript වලට user ID eka recognize karanna aluth type ekak hadamu
interface AuthRequest extends Request {
  user?: { id: string, role: string }; // User ge details request ekata add wenawa
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  // 1. Header eke 'Bearer <TOKEN>' format eka balanawa
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Token eka header eken ganna
      token = req.headers.authorization.split(' ')[1];

      // 2. Token eka verify kirima
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

      // 3. Token eke id eka athi user data tika database eken ganna
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      // 4. User data eka anith controllers walata pawichchi karanna request ekata add kirima
      req.user = { id: user._id.toString(), role: user.role };

      next(); // Success nam, next function eka (controller eka) run wenawa
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// --- Role-Based Authorization ---
export const admin = (req: AuthRequest, res: Response, next: NextFunction) => {
    // Middleware eka run wenakota req.user eka thiyenna ona
    if (req.user && req.user.role === 'admin') {
        next(); // Admin nam, next function eka run karanna
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};