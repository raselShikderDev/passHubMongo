import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";


const app = express();
const port = 3000;

//MiddleWare
app.use(express.json())
app.use(cors());
// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "passHub";
await client.connect();

// Get all the Passwords
app.get("/", async(req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const result = await collection.find({}).toArray()
  res.json(result);
});

// Save  the Passwords
app.post("/", async(req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
   const newDocument = req.body; // Get data from the request body
  const result = await collection.insertOne(newDocument);
  res.json(result); // Respond with the inserted document or a success message
});

// Delete a Passwords
app.delete("/passwords/:id", async (req, res) => {
  const { id } = req.params
  if (id) {
    console.log(id);
  }
  const db = client.db(dbName);
  const collection = db.collection("passwords");
 try {
    const result = await collection.deleteOne({ _id: new ObjectId(id) }); // Add 'await'

    if (result.deletedCount === 1) {
      res.json({ message: 'Password deleted successfully' });
    } else {
      res.status(404).json({ message: 'Password not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
