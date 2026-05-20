const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const uri = "mongodb://maksmasov10_db_user:T4W50EckO8Lus0ls@ac-ybj1kua-shard-00-00.emwl75k.mongodb.net:27017,ac-ybj1kua-shard-00-01.emwl75k.mongodb.net:27017,ac-ybj1kua-shard-00-02.emwl75k.mongodb.net:27017/?ssl=true&replicaSet=atlas-z4z7i0-shard-0&authSource=admin&appName=Cluster0";
const client = new MongoClient(uri);

app.post('/api/register', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('MODERNMUSICDB');
    const users = database.collection('users1');

    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      createdAt: new Date(),
    };

    const result = await users.insertOne(newUser);
    res.status(200).json({ message: 'Success', id: result.insertedId });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});


app.post('/api/login', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('MODERNMUSICDB');
        const users = database.collection('users1');

        const { email, password } = req.body;

        const user = await users.findOne({ email: email, password: password });

        if (user) {
            res.status(200).json({ 
                message: "Успішний вхід!", 
                username: user.username 
            });
        } else {
            res.status(401).json({ message: "Невірний email або пароль" });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});