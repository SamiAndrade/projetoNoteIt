const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/cadastro', { useNewUrlParser: true, useUnifiedTopology: true });

// Definir o modelo de Usuário
const User = mongoose.model('User', new mongoose.Schema({
    email: String,
    password: String,
}));

app.use(express.json());
app.use(cors());


app.post('/cadastro', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios!' });
    }

    
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
        return res.status(400).json({ message: 'Email já cadastrado!' });
    }

   
    const novoUsuario = new User({ email, password });
    await novoUsuario.save();

    return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
