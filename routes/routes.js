// routes/routes.js
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const DocumentoRepository = require("../repository/repository");

const documentoRepository = new DocumentoRepository();

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = "./uploads/";

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 500000000 },
}).single("conteudo");

// Middleware para analisar o corpo das solicitações
router.use(bodyParser.json());

// Rotas CRUD

// Adicionar documento
router.post("/documentos", async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const { nome } = req.body;
      const conteudo = req.file ? req.file.path : null;

      const result = await documentoRepository.adicionarDocumento(
        nome,
        conteudo
      );
      res.status(201).json(result);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar documentos
router.get("/documentos", async (req, res) => {
  try {
    const result = await documentoRepository.listarDocumentos();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar documentos por ID
router.get("/documentos/:id", async (req, res) => {
  try {
    const result = await documentoRepository.obterDocumentoPorId(req.params.id);

    if (result.rows.length === 0) {
      // Se nenhum documento for encontrado com o ID fornecido
      res.status(404).json({ message: "Documento não encontrado" });
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Editar documento
router.put("/documentos/:id", async (req, res) => {
  try {
    const { nome, conteudo } = req.body;
    const result = await documentoRepository.editarDocumento(
      req.params.id,
      nome,
      conteudo
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remover documento
router.delete("/documentos/:id", async (req, res) => {
  try {
    const result = await documentoRepository.removerDocumento(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
