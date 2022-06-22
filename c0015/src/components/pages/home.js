import { Card } from "../card";
export function Home() {
  const infoCards = [
    { title: "card1", description: "Uma descrição para o card1" },
    { title: "card2", description: "Uma descrição para o card2" },
    { title: "card3", description: "Uma descrição para o card3" },
    { title: "card4", description: "Uma descrição para o card4" },
  ];

  return (
    <section className="home">
      {infoCards.map((card) => {
        return <Card titulo={card.title} descricao={card.description} />;
      })}
    </section>
  );
}
