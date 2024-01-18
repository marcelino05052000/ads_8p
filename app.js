const express = require("express");

const app = express();
const PORT = 3000;

const routes = require("./routes/routes");

// Use as rotas definidas no arquivo routes.js
app.use("/", routes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor está escutando na porta ${PORT}`);
});
