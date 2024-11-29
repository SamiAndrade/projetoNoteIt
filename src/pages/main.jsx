import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cabecalho from "../components/header";
import '../styles/main.css'

function Principal(props) {
  const navigate = useNavigate();
  const [atividades, setAtividades] = useState([
    {
      nome: 'Almoço',
      data: new Date('2024-07-08 10:00'),
      finalizada: true
    },
    {
      nome: 'Gamming session',
      data: new Date('2024-07-09 16:00'),
      finalizada: true
    },
  ]);
  const [atividadeEditando, setAtividadeEditando] = useState(null);
  const [cidade, setCidade] = useState('Florianópolis');

  const salvarAtividade = (event) => {
    event.preventDefault();
    const dadosDoFormulario = new FormData(event.target);
    const nome = dadosDoFormulario.get('atividade');
    const dia = dadosDoFormulario.get('dia');
    const hora = dadosDoFormulario.get('hora');
    const data = new Date(`${dia}T${hora}:00`);

    if (atividadeEditando) {
      // Atualizando atividade existente
      setAtividades(atividades.map((atividade) =>
        atividade.data.getTime() === atividadeEditando.data.getTime()
          ? { ...atividade, nome, data }
          : atividade
      ));
    } else {
      // Adicionando nova atividade
      const novaAtividade = { nome, data, finalizada: false };
      const atividadeExiste = atividades.find((atividade) =>
        atividade.data.getTime() === novaAtividade.data.getTime()
      );
      if (atividadeExiste) {
        return alert('Dia/Hora não disponível');
      }
      setAtividades([novaAtividade, ...atividades]);
    }

    setAtividadeEditando(null); // Limpar campo de edição após salvar
  };

  const concluirAtividade = (dataAtividade) => {
    // Marcar como finalizada
    setAtividades(atividades.map((atividade) =>
      atividade.data.getTime() === dataAtividade.getTime()
        ? { ...atividade, finalizada: !atividade.finalizada }
        : atividade
    ));
  };

  const editarAtividade = (dataAtividade) => {
    // Editar uma atividade existente
    const atividadeParaEditar = atividades.find((atividade) =>
      atividade.data.getTime() === dataAtividade.getTime()
    );
    if (atividadeParaEditar) {
      setAtividadeEditando(atividadeParaEditar); // Preenche o formulário com os dados
    }
  };

  const apagarAtividade = (dataAtividade) => {
    // Remover uma atividade
    const novaListaDeAtividades = atividades.filter(atividade =>
      atividade.data.getTime() !== dataAtividade.getTime()
    );
    setAtividades(novaListaDeAtividades); // Atualiza o estado
  };

  const formatador = (data) => {
    const formatadorData = new Intl.DateTimeFormat('pt-BR', {
      weekday: 'short',  // Dia da semana abreviado (ex: "qua.")
      day: 'numeric',    // Número do dia (ex: "28")
      month: 'long',     // Mês por extenso (ex: "novembro")
      hour: '2-digit',   // Hora no formato 2 dígitos (ex: "15")
      minute: '2-digit', // Minuto no formato 2 dígitos (ex: "30")
    });

    // Formatar a data para o padrão brasileiro
    const formatada = formatadorData.format(data);

    // Separando os componentes de data e hora
    const partes = formatada.split(", ");
    const diaSemana = partes[0];  // "qua."
    const dia = partes[1];        // "28"
    const mes = partes[2];        // "novembro"
    const hora = partes[3];       // "15:30"

    return {
      dia: {
        numerico: dia,
        semana: {
          curto: diaSemana,
        },
      },
      mes,
      hora,
    };
  };

  const criarItemDeAtividade = (atividade) => {
    const formatar = formatador(atividade.data);

    return (
      <div className="card-bg" key={atividade.data.getTime()}>
        <input
          type="checkbox"
          checked={atividade.finalizada}
          onChange={() => concluirAtividade(atividade.data)}
        />
        <div>
          <svg className={atividade.finalizada ? 'active' : 'inactive'} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>
          <span>{atividade.nome}</span>
        </div>
        <time className="short">
          {formatar.dia.semana.curto}. {formatar.dia.numerico} <br />
          {formatar.hora}
        </time>
        <time className="full">
          {formatar.dia.semana.curto}, dia {formatar.dia.numerico} de {formatar.mes} às {formatar.hora}h
        </time>
        <div className='botao'>
          <button onClick={() => editarAtividade(atividade.data)} className='botao_editar'>Editar</button>
          <button onClick={() => apagarAtividade(atividade.data)} className='botao_apagar'>Apagar</button>
        </div>
      </div>
    );
  };

  const atualizarListaDeAtividades = () => {
    if (atividades.length === 0) {
      return <p>Nenhuma atividade cadastrada.</p>;
    }
    return atividades.map((atividade) => criarItemDeAtividade(atividade));
  };

  return (
    <div>
      <Cabecalho />
      <div id="app">
        <form onSubmit={salvarAtividade}>
        

          <div className="fields">
            <div className="field-wrapper_texto">
              <textarea
                placeholder="Qual a atividade?"
                name="atividade"
                required
                defaultValue={atividadeEditando ? atividadeEditando.nome : ''}
              />
            </div>

            <div className="field-wrapper">
              <input
                type="date"
                name="dia"
                defaultValue={atividadeEditando ? atividadeEditando.data.toISOString().split('T')[0] : ''}
                required
              />
            </div>

            <div className="field-wrapper">
              <input
                type="time"
                name="hora"
                defaultValue={atividadeEditando ? atividadeEditando.data.toTimeString().slice(0, 5) : ''}
                required
              />
            </div>

            <div className="field-wrapper">
              <button type="submit">{atividadeEditando ? 'Atualizar' : 'Cadastrar'}</button>
            </div>
          </div>
        </form>

        <div className="conteudo">
          {atualizarListaDeAtividades()}
        </div>
      </div>
    </div>
  );
}

export default Principal;
