import { useState, useEffect } from "react";
import { Card } from "../structure/card";
import { GetAllBills } from "../../mocks/bills";

export function Home() {
  const [bills, setBills] = useState([]);
  const [envio, setEnvio] = useState();

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
            <Card
              key={bill.id}
              titulo={bill.title}
              descricao={bill.description}
              preco={bill.price}
              vencido={bill.expirated}
            />
          );
        })}
      </section>
    </section>
  );
}
