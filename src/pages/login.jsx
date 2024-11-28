import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Cabecalho from '../components/header';
import Rodape from '../components/footer';
import '../styles/form.css'
import { NavLink } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/principal');
    };
    return (
        <div>
            <Cabecalho />
        <div className='form_corpo'>
        <main>
            <div className='form'>
                <h1 className='form_titulo'>Login</h1>
            <form onSubmit={handleSubmit} class="conteudo_form">
                <label for="">Email</label>
                <input type="email"  className="form_input" value={email} id="email"  onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
                <label for="">Senha</label>
                <input type="password"  className="form_input" value={password}
                id="password" onChange={(e) => setPassword(e.target.value)} placeholder='Senha'/>
                <button type="submit" className="conteudo_botao">Entrar</button>
                <p>Não possui conta?<NavLink to={"/cadastro"} className={"form_link"}> Cadastre-se aqui</NavLink></p>
                {errorMessage && <p className="mensagem_erro">{errorMessage}</p>}
              </form>
            </div>
        </main>
        </div>
          <Rodape />
    </div>
    );
} export default Login;

