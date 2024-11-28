import React from 'react';
import Cabecalho from '../components/header';
import Rodape from '../components/footer';

function Sobre() {
    return (
        <div>
            <Cabecalho />
        <main>
        <div class="conteudo">
            <section class="conteudo_info">
            <h2 class="conteudo_titulo">Sobre o site</h2>
            <p class="conteudo_texto">Nosso site foi desenvolvido com um design prático e minimalista, pensado para oferecer uma experiência intuitiva e sem distrações. Cada elemento da interface foi cuidadosamente projetado para facilitar a criação de anotações e a organização de checklists, permitindo que o usuário se concentre no que realmente importa: suas ideias e tarefas. A simplicidade e clareza da plataforma garantem que você possa registrar rapidamente suas anotações e acompanhar suas metas de forma eficiente, tornando o processo de organização ainda mais fluido e agradável.
            </p>
            </section>
            <Rodape />
        </div>
    </main>
        </div>
    );
} export default Sobre;
