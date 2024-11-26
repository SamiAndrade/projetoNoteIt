import React from 'react';
import './styles/home.css'
import Cabecalho from './components/header';
import Rodape from './components/footer';
import { NavLink } from 'react-router-dom';
function Home() {
    return (
    <div>
        <Cabecalho />
    <main>
        <div className="conteudo">
            <section className="conteudo_info">
                <h1 className="conteudo_titulo">
                    Bem-vindo à sua área de anotações!
                </h1>
                <p className="conteudo_texto">
                    Aqui você pode organizar suas ideias, listar tarefas, registrar inspirações e tudo o que precisar para manter sua rotina produtiva e suas ideias sempre à mão.
                    
                    Use este espaço para descomplicar seu dia a dia e aproveitar ao máximo sua criatividade. Não importa o que você precise anotar, estamos aqui para ajudar você a se manter focado e organizado!
                </p>
                <p className="conteudo_texto">Ainda não possui conta no site? <NavLink to={'/cadastro'}>Cadastre-se aqui</NavLink></p>
            </section>
            <div className="conteudo_cards">
                <article className="conteudo_card">
                    <h3>Anotação de atividade?</h3>
                    <p>Com nosso design prático, registrar qualquer tarefa ou compromisso é rápido e simples. A interface foi desenvolvida para que você adicione suas anotações de forma intuitiva, sem complicação. Mantenha suas ideias organizadas e acesse o que precisar com poucos cliques, tudo em um ambiente claro e sem distrações.</p>
                </article>
                <article className="conteudo_card">
                    <h3>Anotação de compromissos?</h3>
                    <p>A plataforma é eficiente e permite que você organize seus compromissos e tarefas com agilidade. A integração de funcionalidades e a otimização do sistema garantem que você tenha tudo sob controle e ao seu alcance, ajudando a não perder nenhum detalhe e tornando seu dia a dia mais organizado.</p>
                </article>
                <article className="conteudo_card">
                    <h3>Metas pessoais?</h3>
                    <p>Com nossa plataforma dinâmica, você pode personalizar suas anotações e checklists de acordo com seus objetivos. A flexibilidade dos recursos permite que você ajuste suas listas e acompanhe o progresso das suas metas pessoais, criando uma experiência que se adapta à sua rotina e ajuda a manter o foco nas suas conquistas.</p>
                </article>
            </div>
        </div>
    </main>
    <Rodape />
    </div>
    );
} 
export default Home;