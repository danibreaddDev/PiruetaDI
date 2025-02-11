//importaciones
import { menu } from "./menu.js";
//variables
const section_menu = document.getElementById("menu");
const section_message = document.getElementById("message");
const buttons = document.querySelectorAll("button");
//funciones
function showSection(container, section_clicked) {
  container.innerHTML = "";
  let menu_container = document.createElement("div");
  let row_title = document.createElement("div");
  let row_menu = document.createElement("div");
  row_menu.classList.add(
    "mt-5",
    "mt-sm-0",
    "row",
    "row-cols-1",
    "row-cols-xxl-2",
    "g-sm-5"
  );
  menu_container.classList.add("px-3", "px-sm-5", "container");
  row_title.classList.add("row");
  menu[section_clicked].forEach((food, index) => {
    let element_menu = document.createElement("div");
    if (index % 2 == 0) {
      element_menu.classList.add(
        "element__menu",
        "col",
        "d-flex",
        "flex-column",
        "flex-md-row-reverse",
        "justify-content-center",
        "justify-content-xl-start",
        "align-items-center",
        "gap-5"
      );
    } else {
      element_menu.classList.add(
        "element__menu",
        "col",
        "d-flex",
        "flex-column",
        "flex-md-row",
        "justify-content-center",
        "justify-content-xl-start",
        "align-items-center",
        "gap-5"
      );
    }
    //imagen
    let img = document.createElement("img");
    img.src = `/images/carta/${section_clicked}/${food.nombre}.png`;
    img.alt = food.nombre;
    img.classList.add("img-fluid");
    img.loading = "lazy";
    //contenedor informacion
    let food_info_div = document.createElement("div");
    food_info_div.classList.add("d-flex", "flex-column");
    let name = document.createElement("h3");
    name.classList.add("fw-bolder", "fs-1");
    name.innerText = food.nombre;
    let description = document.createElement("p");
    description.classList.add("fw-ligther", "text-secondary");
    description.innerText = food.descripcion;
    let price = document.createElement("h5");
    price.classList.add("fw-bold", "display-1");
    price.innerText = food.precio + "€";
    //contenedor alergenos
    let alergenos_div = document.createElement("div");
    alergenos_div.classList.add("d-flex", "flex-row", "gap-2");
    console.log("alergenos", food.alergenos);

    food.alergenos.forEach((alergeno) => {
      let alergeno_p = document.createElement("p");
      alergeno_p.classList.add("px-2", "py-1", "border", "rounded-3");
      alergeno_p.innerText = alergeno;
      alergenos_div.appendChild(alergeno_p);
    });
    food_info_div.append(name);
    food_info_div.appendChild(description);
    food_info_div.appendChild(alergenos_div);
    food_info_div.appendChild(price);
    element_menu.appendChild(img);
    element_menu.appendChild(food_info_div);
    row_menu.appendChild(element_menu);
  });

  row_title.innerHTML = `<h2 class="">${section_clicked}</h2>`;
  menu_container.appendChild(row_title);
  menu_container.appendChild(row_menu);
  container.appendChild(menu_container);
  console.log(container);
  console.log(section_clicked);
}
//eventos
buttons.forEach((boton) => {
  boton.addEventListener("click", () => {
    section_message.style.display = "none";
    const section_value = boton.innerText;
    showSection(section_menu, section_value);
  });
});
