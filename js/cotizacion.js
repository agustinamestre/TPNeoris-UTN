//esta funcion recibe el numero de la pagina, va agregando y eliminando el display none
const navigateToFormStep = (stepNumber) => {
  document.querySelectorAll(".form-step").forEach((formStepElement) => {
    formStepElement.classList.add("d-none");

    document.querySelector("#step-" + stepNumber).classList.remove("d-none");
  });
};

//al hacer click en una de las opciones te manda a la pagina siguiente.
//mejorar repeticion de codigo.

const norte = document.getElementById("norte");
const local = document.getElementById("local");
const amba = document.getElementById("amba");
const pba = document.getElementById("pba");
const centro = document.getElementById("centro");
const patagonia = document.getElementById("patagonia");

const zonaItems = [norte, local, amba, pba, centro, patagonia];

zonaItems.forEach((item) => {
  item.addEventListener("click", () => {
    navigateToFormStep(2);
  });
});

const especialidad = document.getElementById("especialidad");
const origen = document.getElementById("origen");

const tipoCafe = [especialidad, origen];

tipoCafe.forEach((item) => {
  item.addEventListener("click", () => {
    navigateToFormStep(3);
  });
});

const dosCincuenta = document.getElementById("250");
const quinientos = document.getElementById("500");
const sieteCincuenta = document.getElementById("750");
const kilo = document.getElementById("1kg");

const cantidadCafe = [dosCincuenta, quinientos, sieteCincuenta, kilo];

cantidadCafe.forEach((item) => {
  item.addEventListener("click", () => {
    navigateToFormStep(4);
  });
});

const fino = document.getElementById("fino");
const medio = document.getElementById("medio");
const grueso = document.getElementById("grueso");
const granos = document.getElementById("granos");

const tipoMolido = [fino, medio, grueso, granos];

tipoMolido.forEach((item) => {
  item.addEventListener("click", () => {
    navigateToFormStep(5);
  });
});

const mensual = document.getElementById("mensual");
const bimestral = document.getElementById("bimestral");
const trimestral = document.getElementById("trimestral");

const frecuencia = [mensual, bimestral, trimestral];

frecuencia.forEach((item) => {
  item.addEventListener("click", () => {
    navigateToFormStep(6);
  });
});

const volver = () => {
  location.reload();
};

////////////////////////////////////////////////////////////////////////////
//Aca valido los inputs nombre y apllido e email
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

//aca se itera sobre los items y les agrega la clase selected y copia el textContent del item seleccionado al resumen

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
const generarPDF = () => {
  var doc = new jsPDF();

  doc.setTextColor(72, 56, 73);
  doc.setFont("courier");
  doc.setFontType("bold");
  doc.setFontSize(30);
  doc.text(20, 20, "Tina's Coffee - Cotización");

  doc.fromHTML(resumenContent.innerHTML);

  doc.save("TinasCoffeeCotizacion.pdf");

  resumenContent.innerHTML = "";
};

//MODAL
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var cancelar = document.getElementsByClassName("cancelar")[0];

// cuando se hace click en el icono, se abre el modal
btn.onclick = function () {
  modal.style.display = "block";
};

cancelar.onclick = function () {
  modal.style.display = "none";
};

//aca se cierra el modal cuando se hacle click en cualquier otro lugar
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
