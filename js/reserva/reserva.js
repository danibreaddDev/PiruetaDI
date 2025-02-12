const miModal = new bootstrap.Modal(document.getElementById("miModal"), {
  backdrop: "static",
  keyboard: false,
});
miModal.show(); // Mostrar modal al cargar la página
const menu = document.getElementById("menu");
const restaurant_name = document.getElementById("restaurant");
const buttons = document.getElementById("miModal").querySelectorAll("button");
const days_calendar = document.querySelector("table").querySelectorAll("td");
const button_reserva = document.getElementById("reserva");
const userInfo = document.getElementById("userConfirm");
const button_confirm = document.getElementById("confirm");
const loading = document.getElementById("loading");
const reserva_confirmed = document.getElementById("ConfirmedReserva");
let info_user = {
  name: "",
  surnames: "",
  email: "",
  phone: "",
  day: "",
  hour: "",
  restaurant: "",
  persons: "",
  zone: "",
};

console.log(restaurant_name);
console.log(button_reserva);
function setTableInfo() {
  const selects = document.querySelectorAll("select");
  console.log(selects);
  let allSelected = true;
  selects.forEach((select) => {
    if (select.options.selectedIndex === 0) {
      allSelected = false;
    } else {
      const selected = select.options[select.options.selectedIndex].value;
      info_user[select.name] = selected;
      console.log(selected);
      console.log(info_user);
    }
  });
  return allSelected;
}
function getCalendarDay() {
  let daySelected = null;
  days_calendar.forEach((day) => {
    if (day.textContent !== "") {
      day.addEventListener("click", () => {
        if (daySelected !== null && daySelected !== day) {
          daySelected.style.background = "";
          daySelected.style.color = "";
        }
        daySelected = day;
        daySelected.style.background = "#ca4a3a";
        daySelected.style.color = "#fff";
        info_user.day = daySelected.textContent;
        console.log(info_user);
      });
    }
  });
  return () => daySelected;
}
function addEventConfirmUser() {
  button_confirm.addEventListener("click", () => {
    let allinfo = true;
    console.log(allinfo);

    const inputs = document.querySelector("fieldset").querySelectorAll("input");
    inputs.forEach((input) => {
      if (input.type == "checkbox") {
        if (!input.checked) {
          console.log("No estoy checked", input);
          allinfo = false;
        }
      } else {
        if (input.value == "") {
          console.log("hay algun campo vacio", input.value);
          allinfo = false;
        } else {
          info_user[input.name] = input.value;
        }
      }
    });
    if (!allinfo) {
      alert("falten datos o aceptar els termes");
      return;
    } else {
      userInfo.style.display = "none";
      loading.style.display = "flex";
      loading.classList.add(
        "flex-column",
        "flex-md-row",
        "justify-content-center",
        "align-items-center"
      );
      setTimeout(() => {
        loading.style.display = "none";
        showInfoReserva();
      }, 5000);
    }
  });
}
function showInfoReserva() {
  reserva_confirmed.innerHTML = `<div class="row row-cols-2">
  <div class="col d-flex flex-column align-items-center justify-content-center">
  <h2>${info_user.day} de Febrer 2025. - <span class="fs-2 fw-bolder">${info_user.restaurant}</span></h2>
  <h5>${info_user.hour}h - <strong class="fw-bolder">${info_user.persons} persones</strong>  - ${info_user.zone}</h5>
  <p>${info_user.name} ${info_user.surnames} ${info_user.phone}</p>
  <h5 class="fw-medium">${info_user.email}</h5>
  </div>
  <div class="col">
  <img src="/images/reserva/reserved.png" alt="reserved" loading="lazy" class="img-fluid">
  </div></div>`;
  reserva_confirmed.style.display = "block";
}
function addEventReserva() {
  let getDay = getCalendarDay();
  button_reserva.addEventListener("click", () => {
    let daySelected = getDay();
    let allSelected = setTableInfo();
    if (daySelected === null || !allSelected) {
      alert("Comproba tota la informacio");
      return;
    }
    //mostraremos el contenedor de los datos del usuario
    menu.style.display = "none";
    userInfo.style.display = "block";
    addEventConfirmUser();
  });
}
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    restaurant_name.textContent = button.textContent;
    info_user.restaurant = restaurant_name.textContent;
    miModal.hide();
    menu.style.display = "block";
    addEventReserva();
  });
});
