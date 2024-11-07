const calcCanva = document.querySelector("#calcCanva");
const calc = document.querySelectorAll("td");

calc.forEach((t) =>
  t.addEventListener("click", () => {
    if (t.textContent === "DEL") {
      calcCanva.textContent = parseInt("0");
      return;
    }

    if (t.textContent === "=") {
      const match = /^\D/.exec(calcCanva.textContent);
      const signal = match ? match[0] : null;

      const firstNum = parseFloat(/\d+/.exec(calcCanva.textContent)[0]);

      let opValue;
      let secondNumValue;
      if (/[+\-*/]/.exec(calcCanva.textContent)?.index === 0) {
        opValue = /[+\-*/]/.exec(calcCanva.textContent.slice(1))?.[0];
        secondNumValue = parseFloat(
          calcCanva.textContent.slice(1).split(opValue)[1]
        );
      } else {
        opValue = /[+\-*/]/.exec(calcCanva.textContent)?.[0];
        secondNumValue = parseFloat(calcCanva.textContent.split(opValue)[1]);
      }
      const op = opValue;
      const secondNum = secondNumValue;

      const result = signal
        ? eval(`${signal}${firstNum} ${op} ${secondNum}`)
        : eval(`${firstNum} ${op} ${secondNum}`);

      calcCanva.textContent = !Number.isFinite(result)
        ? "Algo de errado não está certo"
        : result;
      return;
    }

    if (t.textContent === "%") {
      const firstNum = parseFloat(/\d+/.exec(calcCanva.textContent)[0]);

      calcCanva.textContent = eval(`${firstNum / 100}`);
      return;
    }

    const dataToCanva =
      calcCanva.textContent === "0"
        ? t.textContent
        : calcCanva.textContent + t.textContent;

    if (/^-?\d+(?!.*\D\D).*/.exec(dataToCanva)?.[0]) {
      calcCanva.textContent = dataToCanva;
    }
  })
);
