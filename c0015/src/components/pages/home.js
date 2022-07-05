import { useState, useEffect } from "react";
import { Card } from "../structure/card";
import Modal from "react-modal";
import { billApi } from "../../utils/api/bill.api";

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
  const [search, setSearch] = useState("");
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

  async function findBillById(id) {
    openModal();
    const billById = await billApi.getBillById(id);
    console.log(billById);
    setUniqueBill(billById);
  }

  async function getBills() {
    const allBills = await billApi.getAllBills();
    setBills(allBills);
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

    let existTitle = false;

    bills.map((bill) => {
      if (bill.title === newBill.title) {
        existTitle = true;
        alert("Bill title already exists");
      }
    });

    // UI Otimista
    if (!existTitle) {
      setEnvio(true);
      const bill = await billApi.createBill(newBill);
    }
  }

  return (
    <section className="page">
      <div className="test">
        <form onSubmit={handleSubmit} className="form">
          <section className="section-inputs">
            <input
              name="titulo"
              type="text"
              placeholder="Digite o titulo da conta"
            ></input>
          </section>
          <section className="section-inputs">
            <input
              name="price"
              type="number"
              placeholder="Digite o valor da conta"
            ></input>
          </section>
          <section className="section-inputs">
            <input
              name="description"
              type="text"
              placeholder="Digite a descrição"
            ></input>
          </section>
          <section className="section-inputs">
            <input
              name="expirated"
              type="select"
              placeholder="conta expirou?"
            ></input>
          </section>
          <button type="submit">Create Bill</button>
        </form>
      </div>
      <section className="section-inputs">
        <label className="label">Pesquisa</label>
        <input
          type="text"
          placeholder="Digite o titulo da conta"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        ></input>
      </section>
      <section className="home">
        {bills
          .filter((bill) =>
            bill.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((bill) => {
            return (
              <button
                className="button-card"
                key={bill.id}
                onClick={() => {
                  findBillById(bill.id);
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
