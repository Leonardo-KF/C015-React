import { useState, useEffect } from "react";
import { Card } from "../structure/card";
import { GetAllBills } from "../../mocks/bills";
import Modal from "react-modal";

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

Modal.setAppElement("#root");

export function Home() {
  const [bills, setBills] = useState([]);
  const [envio, setEnvio] = useState();
  const [modaIsOpen, setModalIsOpen] = useState(false);
  const [uniqueBill, setUniqueBill] = useState({
    id: 0,
    title: "",
    price: 0,
    description: "",
    expirated: false,
  });

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  console.log(bills);
  console.log("mock: ", GetAllBills);

  async function getBills() {
    const req = await fetch("http://localhost:5000/bills");
    const bills = await req.json();
    setBills(bills);
    setEnvio(false);
  }

  useEffect(() => {
    getBills();
  }, [envio]);

  async function handleSubmit(event) {
    event.preventDefault();
    // evento.alvo.nome.valor

    const newBill = {
      title: event.target.titulo.value,
      description: event.target.description.value,
      price: parseFloat(event.target.price.value),
      expirated: event.target.expirated.value,
    };

    let existId = false;
    let existTitle = false;

    bills.map((bill) => {
      if (bill.id === newBill.id) {
        existId = true;
        alert("Bill id already exists");
      }
      if (bill.title === newBill.title) {
        existTitle = true;
        alert("Bill title already exists");
      }
    });

    // UI Otimista
    if (!existId && !existTitle) {
      setEnvio(true);
      const req = await fetch("http://localhost:5000/bills", {
        method: "POST",
        body: JSON.stringify(newBill),
        headers: new Headers({ "Content-Type": "application/json" }),
      });
      console.log(await req.json());
    }
  }

  return (
    <section className="page">
      <div className="test">
        <form onSubmit={handleSubmit} className="form">
          <section className="section-inputs">
            <label>Id:</label>
            <input name="id" type="text"></input>
          </section>
          <section className="section-inputs">
            <label>Title:</label>
            <input name="titulo" type="text"></input>
          </section>
          <section className="section-inputs">
            <label>Price:</label>
            <input name="price" type="number"></input>
          </section>
          <section className="section-inputs">
            <label>Description:</label>
            <input name="description" type="text"></input>
          </section>
          <section className="section-inputs">
            <label>Expirated:</label>
            <input name="expirated" type="select"></input>
          </section>
          <button type="submit">Create Bill</button>
        </form>
      </div>

      <section className="home">
        {bills.map((bill) => {
          return (
            <button
              className="button-card"
              key={bill.id}
              onClick={() => {
                setUniqueBill(bill);
                openModal();
              }}
            >
              <Card
                titulo={bill.title}
                descricao={bill.description}
                preco={bill.price}
                vencido={bill.expirated}
              />
            </button>
          );
        })}
      </section>
      <Modal
        isOpen={modaIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div>
          <button onClick={closeModal}>x</button>
          <h2>{uniqueBill.title}</h2>
          <h3>{uniqueBill.description}</h3>
          <h3>{`Venceu: ${uniqueBill.expirated}`}</h3>
          <span>{uniqueBill.price}</span>
        </div>
      </Modal>
    </section>
  );
}
