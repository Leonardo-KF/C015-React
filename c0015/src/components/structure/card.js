import Modal from "react-modal";
import { useState } from "react";

const customStyles = {
  content: {
    display: "flex",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "30%",
    height: "40%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export function Card({ titulo, descricao, preco, vencido }) {
  const [modaIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }
  return (
    <>
      <button className="button-card" onClick={openModal}>
        <section
          style={{
            display: "flex",
            backgroundColor: "lightblue",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            margin: "10px",
            padding: "15px",
            border: "2px solid pink",
          }}
        >
          <h2>{titulo}</h2>
          <span>{preco}</span>
        </section>
      </button>
      <Modal
        isOpen={modaIsOpen}
        onRequestClose={closeModal}
        style={
          titulo === "Conta de luz"
            ? {
                content: {
                  display: "flex",
                  top: "50%",
                  left: "50%",
                  right: "auto",
                  bottom: "auto",
                  width: "30%",
                  height: "40%",
                  marginRight: "-50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "red",
                },
              }
            : {
                customStyles,
              }
        }
      >
        <div>
          <h2>{titulo}</h2>
          <h3>{descricao}</h3>
          <h3>{`Venceu: ${vencido}`}</h3>
          <span>{preco}</span>
        </div>
      </Modal>
    </>
  );
}
