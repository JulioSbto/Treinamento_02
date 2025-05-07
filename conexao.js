const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'base_locadora'
});

connection.connect((erro) => {
  if (erro) {
    console.error('Erro de conexão ao MySQL: ' + erro.stack);
    return;
  }
  console.log('Conectado ao MySQL com ID ' + connection.threadId);
});

module.exports = connection;
