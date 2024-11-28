const express = require('express');
const app = express();
const cors = require('cors');

// Middleware para aceitar JSON
app.use(express.json());
app.use(cors());

// Endpoint de cadastro
app.post('/cadastro', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios!' });
    }

    // Lógica de cadastro aqui (exemplo simples)
    console.log('Cadastro de usuário:', { email, password });

    return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
});

// Porta em que o servidor vai rodar
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
