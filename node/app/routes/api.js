module.exports = function (express, db, secret, jwt, bcrypt) {
  const ObjectId = require("mongodb").ObjectId;
  const apiRouter = express.Router();

  function checkAuth(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token not provided" });
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res
            .status(401)
            .json({ message: "Unauthorized: Token expired" });
        }
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }

      req.user = decoded;
      next();
    });
  }

  // --------------------------ACCOUNTS--------------------------

  apiRouter
    .route("/accounts")
    .get(checkAuth, async (req, res) => {
      try {
        let accounts = await db
          .collection("accounts")
          .find({
            userID: req.user._id,
          })
          .toArray();
        accounts = accounts.map((account) => {
          return {
            id: account._id,
            name: account.name,
            username: account.username,
            password: account.password,
            folder: account.folder,
          };
        });
        res.json(accounts);
      } catch (e) {
        res.json(e);
        console.error(e);
      }
    })
    .post(checkAuth, async (req, res) => {
      try {
        const account = {
          userID: req.user._id,
          name: req.body.name,
          username: req.body.username,
          password: req.body.password,
          folder: req.body.folder,
        };

        await db.collection("accounts").insertOne(account);
        res.sendStatus(200);
      } catch (e) {
        res.json(e);
        console.error(e);
      }
    })
    .put(checkAuth, async (req, res) => {
      try {
        const account = {
          userID: req.user._id,
          name: req.body.name,
          username: req.body.username,
          password: req.body.password,
          folder: req.body.folder,
        };

        await db.collection("accounts").updateOne(
          {
            _id: new ObjectId(req.body.id),
          },
          {
            $set: account,
          }
        );
        res.sendStatus(200);
      } catch (e) {
        res.json(e);
        console.error(e);
      }
    });

  apiRouter.route("/accounts/:id").delete(checkAuth, async (req, res) => {
    try {
      await db.collection("accounts").deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.sendStatus(200);
    } catch (e) {
      res.json(e);
      console.error(e);
    }
  });

  // --------------------------CARDS--------------------------

  apiRouter
    .route("/cards")
    .get(checkAuth, async (req, res) => {
      try {
        let cards = await db
          .collection("cards")
          .find({
            userID: req.user._id,
          })
          .toArray();
        cards = cards.map((card) => {
          return {
            id: card._id,
            name: card.name,
            cardholder_name: card.cardholder_name,
            number: card.number,
            brand: card.brand,
            expiration: card.expiration,
            cvv: card.cvv,
            folder: card.folder,
          };
        });
        res.json(posts);
      } catch (e) {
        res.json(e);
        console.error(e);
      }
    })
    .post(checkAuth, async (req, res) => {
      try {
        const card = {
          userID: req.user._id,
          name: req.body.name,
          cardholder_name: req.body.cardholder_name,
          number: req.body.number,
          brand: req.body.brand,
          expiration: req.body.expiration,
          cvv: req.body.cvv,
          folder: req.body.folder,
        };

        await db.collection("cards").insertOne(card);
        res.sendStatus(200);
      } catch (e) {
        res.json(e);
        console.error(e);
      }
    })
    .put(checkAuth, async (req, res) => {
      try {
        const card = {
          userID: req.user._id,
          name: req.body.name,
          cardholder_name: req.body.cardholder_name,
          number: req.body.number,
          brand: req.body.brand,
          expiration: req.body.expiration,
          cvv: req.body.cvv,
          folder: req.body.folder,
        };

        await db.collection("cards").updateOne(
          {
            _id: new ObjectId(req.body.id),
          },
          {
            $set: card,
          }
        );
        res.sendStatus(200);
      } catch (e) {
        res.json(e);
        console.error(e);
      }
    });

  apiRouter.route("/cards/:id").delete(checkAuth, async (req, res) => {
    try {
      await db.collection("cards").deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.sendStatus(200);
    } catch (e) {
      res.json(e);
      console.error(e);
    }
  });

  // --------------------------NOTES--------------------------

  apiRouter
    .route("/notes")
    .get(checkAuth, async (req, res) => {
      try {
        let notes = await db
          .collection("notes")
          .find({
            userID: req.user._id,
          })
          .toArray();
        notes = notes.map((note) => {
          return {
            id: note._id,
            name: note.name,
            text: note.text,
            folder: note.folder,
          };
        });
        res.json(notes);
      } catch (e) {
        res.json(e);
        console.error(e);
      }
    })
    .post(checkAuth, async (req, res) => {
      try {
        const note = {
          userID: req.user._id,
          name: req.body.name,
          text: req.body.text,
          folder: req.body.folder,
        };

        await db.collection("notes").insertOne(note);
        res.sendStatus(200);
      } catch (e) {
        res.json(e);
        console.error(e);
      }
    })
    .put(checkAuth, async (req, res) => {
      try {
        const note = {
          userID: req.user._id,
          name: req.body.name,
          text: req.body.text,
          folder: req.body.folder,
        };

        await db.collection("notes").updateOne(
          {
            _id: new ObjectId(req.body.id),
          },
          {
            $set: note,
          }
        );
        res.sendStatus(200);
      } catch (e) {
        res.json(e);
        console.error(e);
      }
    });

  apiRouter.route("/notes/:id").delete(checkAuth, async (req, res) => {
    try {
      await db.collection("notes").deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.sendStatus(200);
    } catch (e) {
      res.json(e);
      console.error(e);
    }
  });

  return apiRouter;
};
