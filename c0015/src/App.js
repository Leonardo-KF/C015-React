function Batata() {
  let num1 = 5;
  let num2 = 8;

  const Soma = () => {
    return num1 * num2;
  };

  console.log(Soma());

  if (Soma() === 40) {
    return (
      <h1>
        A multiplicação de {num1} X {num2} é {Soma()}
      </h1>
    );
  } else if (Soma() === 50) {
    return <h1>A soma é 50</h1>;
  } else {
    return <h1>A soma não é igual a 40 e nem a 50</h1>;
  }
}

export default Batata;
