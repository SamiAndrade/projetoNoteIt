import React, { useState } from 'react';
import Cabecalho from '../components/header';
import Rodape from '../components/footer';
import { useNavigate } from 'react-router-dom';
import '../styles/form.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function Cadastro(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmpassword) {
            setErrorMessage('As senhas não coincidem!');
            return;
        }
    
        if (!validateEmail(email)) {
            setErrorMessage('Por favor, insira um email válido.');
            return;
        }
    
        setLoading(true);
        try {
            setErrorMessage('');
            const response = await axios.post('http://localhost:3000/cadastro', { email, password });
    
            
            console.log('Cadastro bem-sucedido:', response.data);
    
            
            navigate('/login');  
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message || 'Ocorreu um erro ao cadastrar.');
            } else {
                setErrorMessage('Erro ao se comunicar com o servidor.');
            }
            console.error('Erro:', error);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div>
            <Cabecalho />
            <div className='form_corpo'>
                <main>
                    <div className='form'>
                        <article className="form_titulo">
                            <h1>Cadastro</h1>
                        </article>
                        <form onSubmit={handleSubmit} className="conteudo_form">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email"  
                                className="form_input" 
                                value={email} 
                                id="email" 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder='Email'
                            />
                            <label htmlFor="password">Senha</label>
                            <input 
                                type="password"  
                                className="form_input" 
                                value={password} 
                                id="password" 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder='Senha'
                            />
                            <label htmlFor="confirmpassword">Confirmar senha</label>
                            <input 
                                type="password"  
                                className="form_input" 
                                value={confirmpassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                id="confirmpassword"
                            />
                            <button type="submit" className="conteudo_botao" disabled={loading}>
                                {loading ? 'Cadastrando...' : 'Cadastrar'}
                            </button>
                            {errorMessage && <p className="mensagem_erro">{errorMessage}</p>}
                            <p>Já possui conta? <NavLink to="/login" className={"form_link"}>Login</NavLink></p>
                        </form>
                    </div>
                </main>
            </div>
            <Rodape />
        </div>
    );
}

export default Cadastro;
