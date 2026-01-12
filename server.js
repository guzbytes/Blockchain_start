const express = require("express");
const bodyParser = require("body-parser");
const Blockchain = require("./blockchain");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;
const PEERS = process.env.PEERS ? process.env.PEERS.split(",") : [];

const blockchain = new Blockchain();

app.use(bodyParser.json());

// Ver la blockchain
app.get("/chain", (req, res) => {
  res.json(blockchain.chain);
});

// Añadir bloque
app.post("/block", async (req, res) => {
  blockchain.addBlock(req.body.data);

  // Propagar a otros nodos
  for (const peer of PEERS) {
    try {
      await axios.post(`${peer}/sync`, {
        chain: blockchain.chain,
      });
    } catch (err) {
      console.log("Peer no disponible:", peer);
    }
  }

  res.json({ status: "Block added" });
});

// Sincronizar cadena
app.post("/sync", (req, res) => {
  blockchain.replaceChain(req.body.chain);
  res.json({ status: "Chain updated" });
});

app.listen(PORT, () => {
  console.log(`Nodo escuchando en puerto ${PORT}`);
});
