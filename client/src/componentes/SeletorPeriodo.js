import React from 'react'

export default function SeletorPeriodo({ periodos, periodoAtual, onAlterarPeriodo }) {

    const handleChange = (event) => {
        periodoAtual = event.target.value;
        onAlterarPeriodo(event.target.value);
    }

    const handleProximoPeriodo = () => {
        let indexAtual = periodos.indexOf(periodoAtual);
        periodoAtual = periodos[++indexAtual];
        onAlterarPeriodo(periodoAtual);
    };

    const handlePeriodoAnterior = () => {
        let indexAtual = periodos.indexOf(periodoAtual);
        periodoAtual = periodos[--indexAtual];
        onAlterarPeriodo(periodoAtual);
    };

    return (
        <div className="center">
            <label>Controle Financeiro Pessoal</label>
            <div className="row">
                <div className="col s12" style={styleCss.div}>
                    <a className="waves-effect waves-light btn" onClick={handlePeriodoAnterior}>{"<"}</a>
                    <select className="browser-default" value={periodoAtual} onChange={handleChange} style={styleCss.select}>
                        {periodos.map(item => {
                            return <option key={item} value={item}>{item}</option>;
                        })}
                    </select>
                    <a className="waves-effect waves-light btn" onClick={handleProximoPeriodo}>{">"}</a>
                </div>
            </div>
        </div>
    )
}

const styleCss = {
    div: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin: "10px"
    },

    select: {
        width: "150px",
        margin: "10px"
    },
}
