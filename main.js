const Blockchain = require("./blockchain");
const Block = require("./block");

const miBlockchain = new Blockchain();

miBlockchain.addBlock(
  new Block(1, Date.now(), { usuario: "Alice", accion: "crear" })
);

miBlockchain.addBlock(
  new Block(2, Date.now(), { usuario: "Bob", accion: "editar" })
);

console.log(JSON.stringify(miBlockchain, null, 2));
console.log("¿Blockchain válida?", miBlockchain.isChainValid());
