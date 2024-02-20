const express = require("express");

const app = express();
const PORT = 3000;

const routes = require("./routes/routes");

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

// Use as rotas definidas no arquivo routes.js
app.use("/", routes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor está escutando na porta ${PORT}`);
});
