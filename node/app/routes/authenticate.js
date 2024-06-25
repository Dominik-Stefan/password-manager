module.exports = function (express, db, secret, jwt, bcrypt) {
  const authRouter = express.Router();

  authRouter.route("/register").post(async (req, res) => {
    try {
      const email_err = await db
        .collection("users")
        .findOne({ email: req.body.email });

      if (email_err) {
        res.json({ status: "Email already in use" });
        return;
      }

      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        await db.collection("users").insertOne({
          username: req.body.username,
          email: req.body.email,
          password: hash,
        });
      });

      res.json({ status: "ok" });
    } catch (e) {
      res.json(e);
      console.error(e);
    }
  });

  authRouter.route("/login").post(async (req, res) => {
    try {
      const user = await db
        .collection("users")
        .findOne({ email: req.body.email });

      if (!user) {
        res.json({ status: "User not found" });
        return;
      }

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(user, secret, { expiresIn: "1800s" });
          res.json({ status: "ok", token: token });
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
