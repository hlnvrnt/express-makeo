const express = require("express");
const database = require ("./database");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/api/contacts", async (req, res) => {
    try{
       const contact = await database.query("SELECT * FROM contact")
       res.status(200).send(contact[0])
    }catch(e){
        console.log(e)
        res.status(500).send("Internal server error")
    }
});

app.post("/api/contacts", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await database.query("INSERT INTO contact (name, email, message) VALUES (?, ?, ?)", [name, email, message]);
    res.status(201).send("Données enregistrées avec succès");
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal server error");
  }
});

module.exports = app;