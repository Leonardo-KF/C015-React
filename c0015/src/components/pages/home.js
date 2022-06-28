import { Card } from "../structure/card";
import { GetAllBills } from "../../mocks/bills";

export function Home() {
  return (
    <section className="home">
      {GetAllBills.map((bill) => {
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
  );
}
