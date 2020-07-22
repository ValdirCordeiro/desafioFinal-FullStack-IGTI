import React, { useState, useEffect } from 'react';
import SeletorPeriodo from './componentes/SeletorPeriodo';
import trService from './services/TransactionService';
import HeaderResumo from './componentes/HeaderResumo';
import BarraDeTransacoes from './componentes/BarraDeTransacoes';
import ModalLancamento from './componentes/ModalLancamento';
import M from 'materialize-css';

export default function App() {

  const [periodos, setPeriodos] = useState(["2020-07", "2020-08"]);
  const [periodoAtual, setPeriodoAtual] = useState("2020-07");
  const [TodasAsTransacoes, setTransacoes] = useState([]);
  let [transacoesFiltradas, setTransacoesFiltradas] = useState([]);
  const [numLancamentos, setNumLancamentos] = useState(0);
  const [receitas, setReceitas] = useState(0);
  const [despesas, setDespesas] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [filtro, setFiltro] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transacaoAtual, setTransacaoAtual] = useState({});

  //Busca todos os periodos cadastrados
  useEffect(() => {
    trService.buscarPeriodos().then((response) => {
      setPeriodos(response);
    }).catch((err) => {
      console.log("Erro ao buscar periodos: " + err);
    });

  }, []);

  useEffect(() => {
    M.AutoInit();
  });

  //Busca todas as transacoes de acordo com o periodo atual
  useEffect(() => {
    trService.buscarTransacoes(periodoAtual).then((dados) => {
      setTransacoes(dados);
      setTransacoesFiltradas(dados);
      calcularTotais(dados);
    }).catch((erro) => {
      console.log("Erro ao buscar Transacoes" + erro);
    });
  }, [periodoAtual]);

  const handleAlterarPeriodo = async (periodoSelecionado) => {
    setPeriodoAtual(periodoSelecionado);
  };

  const calcularTotais = async (dados) => {
    setNumLancamentos(dados.length);

    const receitaAtual = await buscarTransacoesPorType(dados, "+");

    setReceitas(receitaAtual);

    const despesaAtual = await buscarTransacoesPorType(dados, "-");

    setDespesas(despesaAtual);

    const saldo = receitaAtual - despesaAtual;

    setSaldo(saldo);
  };

  async function buscarTransacoesPorType(dados, type) {
    return await dados.reduce((acc, transacao) => {
      return acc += (transacao.type === type ? transacao.value : 0);
    }, 0);
  }

  const handleFiltro = async (event) => {
    setFiltro(event.target.value);

    await setTransacoesFiltradas(TodasAsTransacoes.filter((transacao) => {
      return transacao.description.toLowerCase().includes(filtro);
    }))

    await calcularTotais(transacoesFiltradas);
  }

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleNovoLancamento = (event) => {
    setTransacaoAtual({ yearMonthDay: "2020-07-22", type: "-" });
    setIsModalOpen(true);
  };

  const handleSalvarLancamento = async (lancamento) => {

    console.log(lancamento);

    console.log(lancamento._id === undefined);
    if (lancamento._id === undefined) {
      console.log("Tentando Inserir");
      await trService.criarTransacao(lancamento);
    } else {
      console.log("Tentando Atualizar");
      await trService.updateTransacao(lancamento);
    }

    await buscarTodasTransacoes();

    setIsModalOpen(false);
  };

  async function buscarTodasTransacoes() {
    try {
      const dados = await trService.buscarTransacoes(periodoAtual);
      await setTransacoes(dados);
      await setTransacoesFiltradas(dados);
      await calcularTotais(dados);
      setTransacaoAtual({});
    } catch (error) {
      console.log("Erro ao buscar transacoes");
    }
  }

  const handleDeletarTransacao = async (lancamento) => {
    console.log(lancamento)
    await trService.deletarTransacao(lancamento._id);
    await buscarTodasTransacoes();
    setTransacaoAtual({});
  };

  const handleEditar = (lancamento) => {
    setTransacaoAtual(lancamento);
    setIsModalOpen(true);
  }

  return (
    <div className="container">
      <h5 className="center">Desafio Final do Bootcamp Full Stack</h5>
      <SeletorPeriodo periodos={periodos} periodoAtual={periodoAtual} onAlterarPeriodo={handleAlterarPeriodo} />
      <HeaderResumo receitas={receitas} despesas={despesas} numLancamentos={numLancamentos} saldo={saldo} />
      <div style={css.divBotao}>
        <a style={css.botao} className="waves-effect waves-light btn" onClick={handleNovoLancamento}>+ Novo Lançamento</a>
        <input placeholder="Filtro" type="text" className="validate" value={filtro} onChange={handleFiltro}></input>
      </div>
      <BarraDeTransacoes transacoes={transacoesFiltradas} onDelete={handleDeletarTransacao} onEditar={handleEditar} />

      {isModalOpen && (<ModalLancamento onSave={handleSalvarLancamento} onClose={handleClose} transacao={transacaoAtual} />)}

    </div>);
}

const css = {
  divBotao: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  botao: {
    marginRight: "10px",
    justifyContent: "left",
    alignItems: "left",
    width: "250px"
  }
}
