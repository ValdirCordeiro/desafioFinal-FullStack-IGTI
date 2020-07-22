const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const buscarTransacoes = async (req, res) => {
    try {
        const { period } = req.query;

        if (!period) {
            return res.status(404).send({ error: "É necessário informar o parâmetro period, cujo valor deve estar no formato yyyy-mm" });
        }

        const transacoes = await TransactionModel.find({ yearMonth: period });

        if (transacoes.length === 0) {
            return res.status(404).send("Não foram encontradas transações para o periodo informado");
        }

        transacoes.sort( (a, b) => {
            return a.day - b.day;
        })

        res.status(200).send(transacoes);
    } catch (error) {
        enviarErroServidor(res, error);
    }
};

const buscarPeriodos = async (req, res) => {
    try {
        const periodos = await TransactionModel.distinct("yearMonth");

        if (periodos.length === 0) {
            return res.status(404).send("Não foram encontradas transações para o periodo informado");
        }

        res.status(200).send(periodos);
    } catch (error) {
        enviarErroServidor(res, error);
    }
};


const criarTransacao = async (req, res) => {
    try {
        
        if (!req.body) {
            return res.status(400).send({ message: 'Dados para atualizacao vazios', });
        }

        const novaTransacao = new TransactionModel(req.body);
        novaTransacao.yearMonth = novaTransacao.yearMonthDay.substring(0, 7);
        novaTransacao.month = novaTransacao.yearMonthDay.substring(5, 7);
        novaTransacao.day = novaTransacao.yearMonthDay.substring(8, 10);
        
        await novaTransacao.save();

        res.status(200).send(novaTransacao);
    } catch (error) {
        enviarErroServidor(res, error);
    }
}

const atualizarTransacao = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({ message: 'Dados para atualizacao vazio', });
        }

        const { _id, description, value, category, yearMonthDay } = req.body;

        console.log(req.body);

        let transacao = await TransactionModel.findOne({_id: _id});
       
        if(!transacao) {
            return res.status(404).send("Transacao não encontrada");
        }

        console.log(transacao);

        transacao.description = description;
        transacao.value = value;
        transacao.category = category;
        transacao.yearMonthDay = yearMonthDay
        transacao.yearMonth = yearMonthDay.substring(0, 7);
        transacao.month = yearMonthDay.substring(5, 7);
        transacao.day = yearMonthDay.substring(8, 10);

        console.log(transacao);

        await transacao.save();

        res.status(200).send(transacao);
    } catch (error) {
        enviarErroServidor(res, error);
    }
}

const deletarTransacao = async (req, res) => {
    try {
        const id = req.params.id;

        console.log(id);

        const transacao = await TransactionModel.findByIdAndRemove(id);

        console.log(transacao);

        if (!transacao) {
            return res.status(404).send("Transacao não encontrada");
        }

        res.send({ message: 'Transação excluida com sucesso' });
    } catch (error) {
        enviarErroServidor(res, error);
    }
};

const ts = {
    buscarTransacoes,
    buscarPeriodos,
    criarTransacao,
    atualizarTransacao,
    deletarTransacao
};

module.exports = ts;

function enviarErroServidor(res, error) {
    res.status(500).send(error);
    console.log("Erro ao buscar transaction: " + error);
}

