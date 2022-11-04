// navbar

const toggleButton = document.querySelector(".navbar-toggle");
const navbarLinks = document.querySelectorAll(".navbar-links");

toggleButton.addEventListener("click", () => {
  navbarLinks.forEach((links) => {
    links.classList.toggle("active");
  });
});

// slider

let i = 0;
let img = [];

img[0] = "/assets/1.png";
img[1] = "/assets/4.png";
img[2] = "/assets/2.png";
img[3] = "/assets/3.png";

const changeImg = () => {
  document.slider.src = img[i];

  i < img.length - 1 ? i++ : (i = 0);

  setTimeout("changeImg()", 3000);
};

window.onload = changeImg;

//validacion formulario de contacto

window.addEventListener("load", () => {
  let validarCamposForm = new FormValidator(
    "contact-form",
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
      {
        name: "asunto",
        display: "ASUNTO",
        rules: "required|min_length[5]",
      },
      {
        name: "mensaje",
        display: "MENSAJE",
        rules: "required|min_length[10]|max_length[200]",
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
        let boton = document.getElementById("enviar");
        document.querySelector(".validaciones").innerHTML = "";
        boton.addEventListener("click", () => {
          boton.firstChild.data = "¡MENSAJE ENVIADO!";
          boton.setAttribute("style", "background-color:#dbfbe6");
        });
      }
    }
  );
});