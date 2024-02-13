module.exports = function (express, db, secret, jwt, bcrypt) {
  const authRouter = express.Router();

  authRouter.route("/register").post(async (req, res) => {
    try {
      const user_err = await db
        .collection("users")
        .findOne({ username: req.body.username });

      if (user_err) {
        res.json({ status: "Username already exists" });
        return;
      }

      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        await db
          .collection("users")
          .insertOne({ username: req.body.username, password: hash });
      });
    } catch (e) {
      res.json(e);
      console.error(e);
    }
  });

  authRouter.route("/login").post(async (req, res) => {
    try {
      const user = await db
        .collection("users")
        .findOne({ username: req.body.username });

      if (!user) {
        res.json({ status: "User not found" });
        return;
      }

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(user, secret, { expiresIn: "1800s" });
          res.json(token);
          return;
        }

        res.json({ status: "Wrong password" });
      });
    } catch (e) {
      res.json(e);
      console.error(e);
    }
  });

  return authRouter;
};
