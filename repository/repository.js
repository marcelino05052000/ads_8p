// repository/repository.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ads",
  password: "postgres",
  port: 5433,
});

class DocumentoRepository {
  async adicionarDocumento(nome, tipo, conteudo) {
    const result = await pool.query(
      "INSERT INTO documentos (nome, tipo, conteudo) VALUES ($1, $2, $3) RETURNING *",
      [nome, tipo, conteudo]
    );
    return result.rows[0];
  }

  async listarDocumentos() {
    const result = await pool.query("SELECT * FROM documentos");
    return result.rows;
  }

  async obterDocumentoPorId(id) {
    const result = await pool.query("SELECT * FROM documentos WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  }

  async editarDocumento(id, nome, tipo, conteudo) {
    const result = await pool.query(
      "UPDATE documentos SET nome=$1, tipo=$2, conteudo=$3 WHERE id=$4 RETURNING *",
      [nome, tipo, conteudo, id]
    );
    return result.rows[0];
  }

  async removerDocumento(id) {
    const result = await pool.query(
      "DELETE FROM documentos WHERE id=$1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }
}

module.exports = DocumentoRepository;
