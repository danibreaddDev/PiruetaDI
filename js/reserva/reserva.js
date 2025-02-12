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
let info_user = {
  name: "",
  email: "",
  phone: "",
  day: "",
  hour: "",
  restaurant: "",
  persons: "",
  zone: "",
};

console.log(restaurant_name);
console.log(buttons);
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
    
  });
}
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    restaurant_name.textContent = button.textContent;
    miModal.hide();
    menu.style.display = "block";
    addEventReserva();
  });
});
