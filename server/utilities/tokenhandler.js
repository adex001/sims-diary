import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class TokenHandler {
  static async createToken(payload) {
    const token = await jwt.sign(payload, process.env.SECRET);
    return token;
  }

  static verifyToken(req, res, next) {
    const { token } = req.headers;
    if (typeof token === 'undefined') {
      return res.status(400).json({
        message: 'No token provided',
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded) {
      req.decoded = decoded;
      return next();
        }
    return null;
  }
}
export default TokenHandler;
