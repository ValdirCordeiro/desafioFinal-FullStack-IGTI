const express = require('express');
const transactionRouter = express.Router();
const ts = require("../services/transactionService");

module.exports = transactionRouter;

transactionRouter.get("/buscar/", ts.buscarTransacoes);
transactionRouter.get("/buscarPeriodos/", ts.buscarPeriodos);
transactionRouter.post("/criar/", ts.criarTransacao);
transactionRouter.put("/atualizar/", ts.atualizarTransacao);
transactionRouter.delete("/deletar/:id", ts.deletarTransacao);
