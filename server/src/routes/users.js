import { Router } from "express";
import jwt from "jsonwebtoken";
import authConfig from "../db/config/auth.config.js";
import _ from "underscore";
import { User } from "../db/models/user.js";
import { validateSignUp } from "../middleware/verifySignupBody.js";
import { userAlreadyExists } from "../middleware/userAlreadyExists.js";
import bcrypt from "bcryptjs";
import { validateSignIn } from "../middleware/verifySignInBody.js";
import { Role } from "../db/models/role.js";
const router = Router();

router.post("/signup", validateSignUp, userAlreadyExists, async (req, res) => {
  const body = _.pick(req.body, "username", "email", "password");

  body.password = await bcrypt.hash(body.password, 12);
  const user = new User(body);

  try {
    user.roles = [await (await Role.findOne({ name: "user" }))._id];
    await user.save();
    return res.json({ message: "user saved", id: user._id });
  } catch (e) {
    return res.status(500).json({ message: "Server DB Error", error: e });
  }
});

router.post("/signin", validateSignIn, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );

    if (!user) {
      return res.status(401).json({ message: "No Such User" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: "4h",
    });

    const authorities = [];
    for (let i = 0; i < user.roles.length; i++) {
      authorities.push(`ROLE_` + user.roles[i].name.toUpperCase());
    }

    return res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (e) {
    return res.status(500).json({ message: "Server error", error: e });
  }
});

export { router as authRouter };
