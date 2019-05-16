import { Op } from "sequelize";
import debuggerconsole from 'debug';
import models from "../models";
import TokenHandler from "../utilities/tokenhandler";
import verifyPassword from "../utilities/verifyPassword";
import getUserObject from '../utilities/getUserObject';

const mydebugger = debuggerconsole('app:startup');

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

  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const tryLogUser = await models.Users.findOne({ where: { email } });

      if (!tryLogUser)
        return res.status(400).json({ error: "Invalid Login Details" });

      const isPasswordValid = await verifyPassword(
        password,
        tryLogUser.password
      );

      if (!isPasswordValid)
        return res.status(400).json({ error: "Invalid Login Details" });

      const token = await TokenHandler.createToken({
        userId: tryLogUser.id
      });

      const user = getUserObject(tryLogUser.get());
      return res.status(200).json({ user, token });
    } catch (e) {
      mydebugger(e);
    }
    }
}

export default AuthController;
