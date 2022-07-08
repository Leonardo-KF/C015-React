import { useState, useEffect } from "react";
import { Card } from "../structure/card";
import Modal from "react-modal";
import { billApi } from "../../utils/api/bill.api";
import { IoIosCloseCircleOutline } from "react-icons/io";

const customStyles = {
  content: {
    display: "flex",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    minWidth: "30%",
    minHeight: "30%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "10px 15px 10px 15px ",
  },
};

Modal.setAppElement("#root");

export function Home() {
  const [bills, setBills] = useState([]);
  const [envio, setEnvio] = useState();
  const [search, setSearch] = useState("");
  const [modaIsOpen, setModalIsOpen] = useState(false);
  const [controlUpdate, setControlUpdate] = useState(false);
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

  function cleanForm(event) {
    event.target.titulo.value = "";
    event.target.description.value = "";
    event.target.price.value = "";
    event.target.expirated.value = "";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // evento.alvo.nome.valor

    const newBill = {
      title: event.target.titulo.value,
      description: event.target.description.value,
      price: parseFloat(event.target.price.value),
      expirated: event.target.expirated.value,
    };

    setEnvio(true);
    if (controlUpdate) {
      await billApi.updateBill(uniqueBill.id, newBill);
      setControlUpdate(false);
      cleanForm(event);
    } else {
      const bill = await billApi.createBill(newBill);
      cleanForm(event);
    }
  }

  async function editBill() {
    setControlUpdate(true);
    closeModal();
  }

  async function deleteBill() {
    await billApi.deleteBill(uniqueBill.id);
    closeModal();
    setEnvio(true);
  }

  function cancelUpdate() {
    setControlUpdate(false);
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
              defaultValue={controlUpdate ? uniqueBill.title : ""}
            ></input>
          </section>
          <section className="section-inputs">
            <input
              name="price"
              type="number"
              placeholder="Digite o valor da conta"
              step="0.01"
              defaultValue={controlUpdate ? uniqueBill.price : ""}
            ></input>
          </section>
          <section className="section-inputs">
            <input
              name="description"
              type="text"
              placeholder="Digite a descrição"
              defaultValue={controlUpdate ? uniqueBill.description : ""}
            ></input>
          </section>
          <section className="section-inputs">
            <input
              name="expirated"
              type="select"
              placeholder="conta expirou?"
              defaultValue={controlUpdate ? uniqueBill.expirated : ""}
            ></input>
          </section>
          {controlUpdate ? (
            <div className="pageButtonsArea">
              <button type="submit">Edit Bill</button>
              <button onClick={cancelUpdate}>Cancel</button>
            </div>
          ) : (
            <button type="submit">Create Bill</button>
          )}
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
          <div className="divModalButton">
            <button className="buttonCloseModal" onClick={closeModal}>
              <IoIosCloseCircleOutline size={20} color="red" />
            </button>
          </div>
          <div className="modalInfo">
            <h2>{uniqueBill.title}</h2>
            <h3>{uniqueBill.description}</h3>
            <h3>{`Venceu: ${uniqueBill.expirated}`}</h3>
            <span>{uniqueBill.price}</span>
          </div>
          <div className="modalButtonsArea">
            <button onClick={editBill} className="editButton">
              Editar
            </button>
            <button onClick={deleteBill} className="deleteButton">
              Deletar
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
