const config = require("./config");

const dbName = "Projekt_Štefan";

const { MongoClient } = require("mongodb");

async function initializeDatabase() {
  const client = new MongoClient(config.databaseURL);

  try {
    await client.connect();

    const db = client.db(dbName);

    await createCollectionsAndInsertData(db);

    console.log("Database initialized successfully");
  } catch (err) {
    console.error("Error initializing database:", err);
  } finally {
    await client.close();
  }
}

async function createCollectionsAndInsertData(db) {
  const usersCollection = db.collection("users");
  const accountsCollection = db.collection("accounts");
  const cardsCollection = db.collection("cards");
  const notesCollection = db.collection("notes");

  const userResult = await usersCollection.insertOne({
    username: "Dodo",
    email: "dodo@test.com",
    password: "$2y$10$d5uT/h1hWcQ5szkUr2cS0OEcvlorEn.tA8XANJ8Wqn6nE/.6qmTga",
  });

  const userId = userResult.insertedId;

  await accountsCollection.insertMany([
    {
      userID: userId,
      name: "Moj.tvz",
      username: "dstefan@tvz.hr",
      password: "test_password",
    },
    {
      userID: userId,
      name: "LMS",
      username: "dstefan@tvz.hr",
      password: "test_password",
    },
  ]);

  await cardsCollection.insertMany([
    {
      userID: userId,
      name: "Moj.tvz",
      cardholder_name: "Stefan",
      number: "1234567890123456",
      brand: "Visa",
      expiration: "12/24",
      cvv: "123",
    },
    {
      userID: userId,
      name: "LMS",
      cardholder_name: "Stefan",
      number: "1234567890123456",
      brand: "Visa",
      expiration: "12/24",
      cvv: "123",
    },
  ]);

  await notesCollection.insertMany([
    {
      userID: userId,
      name: "Moj.tvz",
      text: "Test note",
    },
    {
      userID: userId,
      name: "LMS",
      text: "Test note",
    },
  ]);

  console.log("Collections and initial data created successfully");
}

initializeDatabase();
