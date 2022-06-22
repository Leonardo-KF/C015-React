export function Card(props) {
  console.log(props.titulo);
  return (
    <section
      style={{
        display: "flex",
        backgroundColor: "lightblue",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2>{props.titulo}</h2>
      <h3>{props.descricao}</h3>
    </section>
  );
}
