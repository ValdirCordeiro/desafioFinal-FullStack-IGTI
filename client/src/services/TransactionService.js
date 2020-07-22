import http from '../util/http-common';

const buscarPeriodos = async () => {
    const periodos = await http.get("/api/transaction/buscarPeriodos");

    return periodos.data;
}

const buscarTransacoes = async (periodo) => {
    const transacoes = await http.get(`/api/transaction/buscar/?period=${periodo}`);

    return transacoes.data;
};

const updateTransacao = async (data) => {
    const transacoes = await http.put(`/api/transaction/atualizar/`, data);

    return transacoes.data;
};

const deletarTransacao = async (id) => {
    const transacoes = await http.delete(`/api/transaction/deletar/${id}`);

    return transacoes.data;
};

const criarTransacao = async (data) => {
    const transacao = await http.post(`/api/transaction/criar/`, data);

    return transacao.data;
};

export default { buscarPeriodos, buscarTransacoes, updateTransacao, deletarTransacao, criarTransacao };