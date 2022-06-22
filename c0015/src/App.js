function Batata() {
  let num1 = 5;
  console.log(num1);

  const Soma = () => {
    return num1 * 5;
  };

  if (Soma() === 40) {
    return <h1>A soma é 40</h1>;
  } else if (Soma() === 50) {
    return <h1>A soma é 50</h1>;
  } else {
    return <h1>A soma não é igual a 40 e nem a 50</h1>;
  }
}

export default Batata;
