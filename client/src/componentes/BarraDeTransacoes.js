import React from 'react'
import BotaoAction from './BotaoAction';

export default function BarraDeTransacoes({ transacoes, onDelete, onEditar }) {

    const handleDeletar = (transacaoADeletar) => {
        onDelete(transacaoADeletar);
    }

    const handleEditar = (transacaoEditar) => {
        onEditar(transacaoEditar);
    }

    return (
        <div>
            {transacoes.map((transacao) => {
                return (
                    <div key={transacao._id} style={css.barra(transacao.type)}>
                        <span style={css.dia}>{transacao.day}</span>
                        <div style={css.geral}>
                            <div style={css.conteudo}>
                                <span>{transacao.description}</span>
                                <span>{transacao.category}</span>
                            </div>

                            <div>
                                <span style={css.valor}>{"R$ " + transacao.value}</span>
                                <BotaoAction acao={"edit"}  onActionClick={handleEditar} transacao={transacao}/>
                                <BotaoAction acao={"delete"} onActionClick={handleDeletar}  transacao={transacao}/>
                            </div>
                        </div>
                    </div>
                )
            })
            }

        </div>
    )
}

const css = {
    barra: (type) => {
        return {
            display: "flex",
            flexFlow: "row wrap",
            alignItems: "center",
            justifyContent: "flex-start",
            border: " 1px solid grey",
            borderRadius: "5px",
            padding: "10px",
            margin: "10px 5px 5px",
            backgroundColor: (type === "-" ? "#FFC0CB" : "#00FA9A")
        }
    },
    dia: {
        marginRight: "20px",
        fontFamily: "Consolas, monospace",
        fontWeight: "bold",
        fontSize: "1.5rem"
    },
    geral: {
        display: "flex",
        flex: "7 1 0%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    conteudo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
    },

    valor: {
        justifyContent: "right",
        alignItems: "right",
        fontFamily: "Consolas, monospace",
        fontSize: "1.8rem",
        marginRight: "30px"
    },
}