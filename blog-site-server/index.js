const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectId } = require("mongodb");

require("dotenv").config(); 
const bcrypt = require("bcrypt");


app.use(cors())
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lwvml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const usersCollection = client.db("devsAroundBlogs").collection("users");
    const blogsCollection = client.db("devsAroundBlogs").collection("blogs");






    app.get("/users", async(req,res) =>{
        const result = await usersCollection.find().toArray();
        res.send(result);

    })
    app.get("/blogs", async(req,res) =>{
        const result = await blogsCollection.find().toArray();
        res.send(result);

    })

    app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({ error: "Name, email and password are required" });
    }

    
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "Email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = {
      _id: new ObjectId(),
      name,
      email,
      passwordHash,
      role: "author",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);
    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to create user" });
  }
});

// create Blogs
app.post('/blogs', async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      coverImageUrl,
      tags,
      authorEmail,
      publishedAt,
      createdAt,
      updatedAt
    } = req.body;

    const newBlog = {
      _id: new ObjectId(),
      title,
      slug,
      excerpt,
      content,
      coverImageUrl,
      tags,
      authorEmail,
      publishedAt: publishedAt || null,
      createdAt: createdAt || new Date(),
      updatedAt: updatedAt || new Date(),
    };

    const result = await blogsCollection.insertOne(newBlog);
    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to create blog" });
  }
});


  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res) =>{
    res.send("Blog are ready to show")
})

app.listen(port, () =>{
    console.log(`Blog are ready on port: ${port}`)
})