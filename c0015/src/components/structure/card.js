export function Card({ titulo, descricao, preco, vencido }) {
  return (
    <>
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
        <span>{parseFloat(preco).toFixed(2)}</span>
      </section>
    </>
  );
}
