import { useState } from "react";
import { Card } from "../structure/card";
import { GetAllBills } from "../../mocks/bills";

export function Home() {
  const [bills, setBills] = useState(GetAllBills);

  console.log(bills);
  console.log("mock: ", GetAllBills);
  function handleSubmit(event) {
    event.preventDefault();

    const newBill = {
      id: parseInt(event.target.id.value),
      title: event.target.title.value,
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

    if (!existId && !existTitle) {
      setBills([...bills, newBill]);
    }
  }

  return (
    <section className="page">
      <h1>Passando nas Salas</h1>
      <div className="test">
        <form onSubmit={handleSubmit} className="form">
          <section className="section-inputs">
            <label>Id:</label>
            <input name="id" type="text"></input>
          </section>
          <section className="section-inputs">
            <label>Title:</label>
            <input name="title" type="text"></input>
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
          <button type="submit">reset bills</button>
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
