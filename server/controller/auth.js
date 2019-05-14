import { Op } from "sequelize";
import models from "../models";
import TokenHandler from "../utilities/tokenhandler";

class AuthController {
  static async signup(req, res) {
    const { email, password, firstname, lastname } = req.body;
    const myObject = {
      firstname,
      lastname,
      email,
      password
    };
    models.Users.findOrCreate({
      where: { email: { [Op.iLike]: email } },
      defaults: myObject
    }).spread(async (user, created) => {
      if (!created) {
        return res.status(409).json({
          status: 409,
          error: "Email already taken"
        });
      }
      const token = await TokenHandler.createToken({
        userId: user.id
      });
      return res.status(201).json({
        status: 201,
        data: {
          userId: user.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
        },
        token
      });
    });
  }
}
export default AuthController;
