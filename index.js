const express = require('express');
const bodyParser = require('body-parser');
const db = require('./conexao');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.get('/veiculos', (req, res) => {
  const query = 'SELECT * FROM tb_veiculos';

  db.query(query, (erro, results) => {
    if (erro) {
      console.error(erro);
      return res.status(500).send('Erro ao buscar veículos.');
    }
    res.json(results);
  });
});

app.get('/veiculos/:placa', (req, res) => {
  const {placa} = req.params;

  const query = 'SELECT * FROM tb_veiculos WHERE placa = ?';

  db.query(query, [placa], (erro, results) => {
    if (erro) {
      console.error(erro);
      return res.status(500).send('Erro ao buscar veículo.');
    }
    if (results.length === 0) {
      return res.status(404).send('Veículo não encontrado.');
    }
    res.json(results[0]);
  });
});

app.post('/veiculos', (req, res) => {
  const { placa, marca, modelo, valor } = req.body;

  if (!placa || !marca || !modelo || !valor) {
    return res.status(400).send('Todos os campos são obrigatórios.');
  }

  const query = 'INSERT INTO tb_veiculos (placa, marca, modelo, valor) VALUES (?, ?, ?, ?)';

  db.query(query, [placa, marca, modelo, valor], (erro, results) => {
    if (erro) {
      console.error(erro);
      return res.status(500).send('Erro ao cadastrar veículo.');
    }
    res.status(201).send('Veículo cadastrado com sucesso.');
  });
});

app.delete('/veiculos/:placa', (req, res) => {
  const {placa} = req.params;

  const query = 'DELETE FROM tb_veiculos WHERE placa = ?';

  db.query(query, [placa], (erro, results) => {
    if (erro) {
      console.error(erro);
      return res.status(500).send('Erro ao apagar veículo.');
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Veículo não encontrado.');
    }
    res.send('Veículo apagado com sucesso.');
  });
});

app.put('/veiculos', (req, res) => {
  const { placa, marca, modelo, valor } = req.body;

  if (!placa || !marca || !modelo || !valor) {
    return res.status(400).send('Todos os campos são obrigatórios.');
  }

  const query = 'UPDATE tb_veiculos SET marca = ?, modelo = ?, valor = ? WHERE placa = ?';

  db.query(query, [marca, modelo, valor, placa], (erro, results) => {
    if (erro) {
      console.error(erro);
      return res.status(500).send('Erro ao atualizar veículo.');
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Veículo não encontrado.');
    }
    res.send('Veículo atualizado com sucesso.');
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
