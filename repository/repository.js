// repository/repository.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ads",
  password: "postgres",
  port: 5432,
});

class DocumentoRepository {
  async adicionarDocumento(nome, conteudo) {
    const result = await pool.query(
      "INSERT INTO documentos (nome, conteudo) VALUES ($1, $2) RETURNING *",
      [nome, conteudo]
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

  async editarDocumento(id, nome, conteudo) {
    const result = await pool.query(
      "UPDATE documentos SET nome=$1, conteudo=$2 WHERE id=$3 RETURNING *",
      [nome, conteudo, id]
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
