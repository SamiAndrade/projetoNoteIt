import React, { useState } from 'react';
import Cabecalho from '../components/header';
import Rodape from '../components/footer';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import '../styles/main.css';


const formatador = (data) => {
  return {
    dia: {
      numerico: dayjs(data).format('DD'),
      semana: {
        curto: dayjs(data).format('dd'),
        longo: dayjs(data).format('dddd'),
      }
    },
    mes: dayjs(data).format('MMMM'),
    hora: dayjs(data).format('HH:mm')
  };
};

function Principal(props) {
  const navigate = useNavigate();
  const [atividades, setAtividades] = useState([
    {
      nome: 'Almoço',
      data: new Date('2024-07-08 10:00'),
      finalizada: true
    },
    {
      nome: 'Academia em grupo',
      data: new Date('2024-07-09 12:00'),
      finalizada: false
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
    const data = dayjs(`${dia} ${hora}`).toDate(); 

    if (atividadeEditando) {
      
      setAtividades(atividades.map((atividade) => 
        dayjs(atividade.data).isSame(dayjs(atividadeEditando.data), 'minute') 
        ? { ...atividade, nome, data } 
        : atividade
      ));
    } else {
      
      const novaAtividade = { nome, data, finalizada: false };
      const atividadeExiste = atividades.find((atividade) => 
        dayjs(atividade.data).isSame(dayjs(novaAtividade.data), 'minute') 
      );
      if (atividadeExiste) {
        return alert('Dia/Hora não disponível');
      }
      setAtividades([novaAtividade, ...atividades]);
    }

    setAtividadeEditando(null);  
  };

  
  const concluirAtividade = (dataAtividade) => {
    console.log('Concluindo atividade:', dataAtividade); 
    setAtividades(atividades.map((atividade) =>
      dayjs(atividade.data).isSame(dayjs(dataAtividade), 'minute') 
        ? { ...atividade, finalizada: !atividade.finalizada }
        : atividade
    ));
  };

  
  const editarAtividade = (dataAtividade) => {
    console.log('Editando atividade:', dataAtividade); 
    const atividadeParaEditar = atividades.find((atividade) => 
      dayjs(atividade.data).getTime() === dayjs(dataAtividade).getTime()
    );
    if (atividadeParaEditar) {
      setAtividadeEditando(atividadeParaEditar);
    }
  };

 
  const apagarAtividade = (dataAtividade) => {
    console.log('Apagando atividade:', dataAtividade); 
    setAtividades(atividades.filter(atividade => 
      dayjs(atividade.data).getTime() !== dayjs(dataAtividade).getTime() 
    ));
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
          <svg className={atividade.finalizada ? 'active' : 'inactive'} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          </svg>
          <span>{atividade.nome}</span>
        </div>
        <time className="short">
          {formatar.dia.semana.curto}. {formatar.dia.numerico} <br />
          {formatar.hora}
        </time>
        <time className="full">
          {formatar.dia.semana.longo}, dia {formatar.dia.numerico} de {formatar.mes} às {formatar.hora}h
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
         
          <div id="place" className="card-bg">
            <select 
              name="cidade" 
              value={cidade} 
              onChange={(e) => setCidade(e.target.value)}
            >
              <option value="Florianópolis">Florianópolis</option>
              <option value="São Paulo">São Paulo</option>
              <option value="Rio de Janeiro">Rio de Janeiro</option>
              <option value="Curitiba">Curitiba</option>
              <option value="Porto Alegre">Porto Alegre</option>
              <option value="Belo Horizonte">Belo Horizonte</option>
           
            </select>
          </div>

          <div className="fields">
            <div className="field-wrapper">
              <input
                type="text"
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
                defaultValue={atividadeEditando ? dayjs(atividadeEditando.data).format('YYYY-MM-DD') : ''}
                required
              />
            </div>

           
            <div className="field-wrapper">
              <input
                type="time"
                name="hora"
                defaultValue={atividadeEditando ? dayjs(atividadeEditando.data).format('HH:mm') : ''}
                required
              />
            </div>
          </div>

          <button>Salvar atividade</button>
        </form>

        <main>
          <h1>Atividades</h1>
          <section>
            {atualizarListaDeAtividades()}
          </section>
        </main>
      </div>
      <Rodape />
    </div>
  );
}

export default Principal;
