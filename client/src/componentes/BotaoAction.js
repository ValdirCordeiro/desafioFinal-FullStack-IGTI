import React from 'react'

export default function BotaoAction({ acao, transacao, onActionClick }) {

    const handleClick = () => {
        console.log(transacao);
        onActionClick(transacao);
    }

    return (
        <span className="material-icons" style={css.botoes} onClick={handleClick}>{acao}</span>
    )
}

const css = {
    botoes: {
        fontSize: "1.2rem",
        cursor: "pointer",
        marginRight: "10px"
    }
}