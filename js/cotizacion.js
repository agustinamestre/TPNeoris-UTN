//Define a function to navigate betweens form steps. It accepts one parameter. That is - step number.
const navigateToFormStep = (stepNumber) => {
  //Hide all form steps.
  document.querySelectorAll(".form-step").forEach((formStepElement) => {
    formStepElement.classList.add("d-none");

    //Show the current form step (as passed to the function).
    document.querySelector("#step-" + stepNumber).classList.remove("d-none");
  });
};

//Select all form navigation buttons, and loop through them.
document
  .querySelectorAll(".btn-navigate-form-step")
  .forEach((formNavigationBtn) => {
    formNavigationBtn.addEventListener("click", () => {
      //  Get the value of the step.
      const stepNumber = parseInt(
        formNavigationBtn.getAttribute("step_number")
      );
      //  Call the function to navigate to the target form step.
      navigateToFormStep(stepNumber);
    });
  });

////////////////////////////////////////////////////////////////////////////
//VALIDAR LOS INPUTS
const apelnom = document.getElementById("apelnom");

window.addEventListener("load", () => {
  let validarCamposForm = new FormValidator(
    "regForm",
    [
      {
        name: "apelnom",
        display: "NOMBRE Y APELLIDO",
        rules: "required|min_length[10]",
      },
      {
        name: "email",
        display: "EMAIL",
        rules: "required|valid_email",
      },
    ],
    (err) => {
      if (err.length) {
        let mensajesError = "";
        err.forEach((inputForm) => {
          mensajesError += `• ${inputForm.message} <br/>`;
        });

        document.querySelector(".validaciones").innerHTML = mensajesError;
      } else {
        document.querySelector(".validaciones").innerHTML = "";
        let boton = document.getElementById("enviar");
        boton.addEventListener("click", () => {
          boton.firstChild.data = "¡ENVIADO!";
          boton.setAttribute("style", "background-color:#dbfbe6");

          //cuando no hay mas errores llamo a la funcion generarPDF
          generarPDF();
        });
      }
    }
  );
});

////////////////////////////////////////////////////////////////////////////

const resumen = document.querySelector(".resumen");
const resumenContent = document.querySelector(".resumenContent");
const itemszona = document.getElementsByClassName("itemZona");
const itemTipoCafe = document.getElementsByClassName("itemTipoCafe");
const itemCantidad = document.getElementsByClassName("itemCantidad");
const itemTipoMolido = document.getElementsByClassName("itemTipoMolido");
const itemFrecuencia = document.getElementsByClassName("itemFrecuencia");

const itemsGeneral = [
  itemszona,
  itemTipoCafe,
  itemCantidad,
  itemTipoMolido,
  itemFrecuencia,
];

for (const items of itemsGeneral) {
  for (const item of items) {
    item.addEventListener("click", (e) => {
      let selectedEl = document.querySelector(".selected");
      e.target.classList.add("selected");
      resumenContent.innerHTML += "-" + item.textContent + " <br /> ";
      if (selectedEl) {
        selectedEl.classList.remove("selected");
      }
    });
  }
}

//FUNCION GENERAR PDF
function generarPDF() {
  var doc = new jsPDF( "p", "pt", "letter");

  doc.setTextColor(72, 56, 73);
  doc.setFont("courier");
  doc.setFontType("bold");
  doc.setFontSize(30);
  doc.text(20, 20, "Tina's Coffee - Cotización");

  doc.fromHTML(resumenContent.innerHTML);

  doc.save("TinasCoffeeCotizacion.pdf");
}

//MODAL
// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var cancelar = document.getElementsByClassName("cancelar")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

cancelar.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
