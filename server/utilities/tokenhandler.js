import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET;

class TokenHandler {
  static async createToken(payload) {
    const token = await jwt.sign(payload, secretKey);
    return token;
  }

  static verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];

    if (typeof token === 'undefined') {
      return res.status(400).json({
        message: 'No token provided',
      });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
      if (!decoded) {
        return res.status(401).json({
          status: 401,
          error: 'Token expired please login again',
        });
      }
      req.decoded = decoded;
      next();
    });

  }
}
export default TokenHandler;