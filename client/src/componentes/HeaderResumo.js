import React from 'react'

export default function HeaderResumo({ numLancamentos, receitas, despesas, saldo }) {
    return (
        <div className="row center">
            <div className="col s12" style={css.div}>
                <label style={css.letras("black")} className="col s3">Lancamentos: {numLancamentos}</label>
                <label style={css.letras("green")} className="col s3">Receitas: {receitas}</label>
                <label style={css.letras("red")} className="col s3">Despesas: {despesas}</label>
                <label style={css.letras(saldo >= 0 ? "green" : "red")} className="col s3">Saldo: {saldo}</label>
            </div>
        </div>
    )
}

const css = {
    div: {
        border: " 1px solid grey",
        borderRadius: "5px",
        padding: "10px",
    },

    letras: (cor) => {
        return {
            fontSize: "1.1rem",
            fontWeight: "bold",
            color: cor,
        }
    }

}
