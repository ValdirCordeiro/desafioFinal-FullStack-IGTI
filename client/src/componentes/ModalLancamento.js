import React, { useEffect, useState } from 'react';
import Modal from "react-modal";

Modal.setAppElement('#root');

export default function ModalLancamento({ onClose, onSave, transacao }) {
    
    const [type, setType] = useState("-");
    const [categoria, setCategoria] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState(0);
    const [data, setData] = useState("2020-07-22");

    const handleModalClose = () => {
        onClose();
    };

    //Adicionar o evento de sair do modal com a tecla ESC
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    useEffect(() => {
        if(transacao._id != undefined) {
            setCategoria(transacao.category);
            setDescricao(transacao.description);
            setValor(transacao.value);
            setData(transacao.yearMonthDay);
            setType(transacao.type);
        }
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            onClose(null);
        }
    };

    const preencherTransacao = () => {
        transacao.type = type;
        transacao.description = descricao;
        transacao.category = categoria;
        transacao.value = valor;
        transacao.yearMonthDay = data;
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        await preencherTransacao();

        if (transacao.type === undefined) {
            return alert("Escolha o Tipo da transação");
        }

        if (transacao.category === undefined) {
            return alert("Escolha a categoria da transação");
        }

        if (transacao.value === undefined) {
            return alert("Escolha a valor da transação");
        }

        if (transacao.yearMonthDay === undefined) {
            return alert("Escolha a data da transação");
        }

        onSave(transacao);
    };

    const handleChangeReceita = (event) => {
        setType(event.target.value);
    };

    const handleChangeDespesa = (event) => {
        setType(event.target.value);
    };

    const handleChangeDescicao = (event) => {
        setDescricao(event.target.value);
    };

    const handleChangeCategory = (event) => {
        setCategoria(event.target.value);
    };

    const handleChangeValor = (event) => {
        setValor(event.target.value);
    };

    const handleChangeData = (event) => {
        setData(event.target.value);
    };

    return (
        <div  >
            <Modal isOpen={true} style={css.modal} >
                <div style={css.flexRow}>
                    <span style={css.title}>Inclusão de Lancamento</span>
                    <button className="waves-effect waves-lights btn red dark-4" onClick={handleModalClose}>X</button>
                </div>

                <form onSubmit={handleFormSubmit} style={css.form} >
                    <div style={css.divCheckBox}>
                        <label style={css.checkBox}>
                            <input name="tipo" type="radio" checked={type === "-"} value="-" onChange={handleChangeDespesa} />
                            <span style={css.receitaDespesa("-")}>Despesa</span>
                        </label>

                        <label style={css.checkBox}>
                            <input name="tipo" type="radio" checked={type === "+"} value="+" onChange={handleChangeReceita} />
                            <span style={css.receitaDespesa("+")}>Receita</span>
                        </label>
                    </div>

                    <div className="input-field ">
                        <input id="inputDescription" type="text" onChange={handleChangeDescicao} value={descricao} />
                        <label htmlFor="inputDescription" className="active">Descrição:</label>
                    </div>

                    <div className="input-field ">
                        <input id="inputCategoria" type="text" onChange={handleChangeCategory} value={categoria} />
                        <label htmlFor="inputCategoria" className="active">Categoria:</label>
                    </div>

                    <div style={css.flexRow}>
                        <div className="input-field" style={{ marginRight: "10px" }}>
                            <input id="inputValue" type="number" min="0" step="0.01" onChange={handleChangeValor} value={valor} />
                            <label htmlFor="inputValue" className="active">Valor:</label>
                        </div>
                        <input type="date" className="browser-default" onChange={handleChangeData} value={data} />
                    </div>

                    <input type="submit" className="waves-effect waves-light btn" value="Salvar" onClick={handleFormSubmit}></input>
                </form>
            </Modal>
        </div>
    )
}

const css = {

    form: {
        border: "1px solid grey",
        borderRadius: "5px",
        padding: "10px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },

    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '40px',
    },

    title: {
        fontSize: '1.3rem',
        fontWeight: 'bold',
    },

    errorMessage: {
        color: 'red',
        fontWeight: 'bold',
    },

    divCheckBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '30px',
    },

    checkBox: {
        marginRight: "10px",
        marginLeft: "10px",
        padding: "20px",
    },

    receitaDespesa: (type) => {
        return {
            color: type === "-" ? "rgb(192, 57, 43)" : "rgb(39, 174, 96)",
            fontSize: "1.2rem",
            fontWeight: "bold"
        };
    },

    modal: {
        overlay: { zIndex: 1000 },
    }
};

