const brisi = document.getElementById("trashcan");
const datum = document.getElementById("datum");
const lista = document.getElementById("lista");
const input = document.getElementById("input");
const oznaceno = "fa-check-circle";
const odznaceno = "fa-circle-notch";
const prekrizeno = "prekrizeno";
let LIST, id;

function loadList(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

//Local storage
let podaci = localStorage.getItem("TODO");
if (podaci) {
  LIST = JSON.parse(podaci);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}

brisi.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

const opcije = { weekday: "long", month: "short", day: "numeric" };
const danas = new Date();

datum.innerHTML = danas.toLocaleDateString("hr-HR", opcije);

function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }
  const obavljeno = done ? oznaceno : odznaceno;
  const linija = done ? prekrizeno : "";

  const item = `<li class="item">
  <i class="fa ${obavljeno} co" obavljeno="complete" id="${id}"></i>
  <p class="text ${linija}">${toDo}</p>
  <i class="fa fa-trash-o de" obavljeno="delete" id="${id}"></i>
</li>
`;
  const pozicija = "beforeend";
  lista.insertAdjacentHTML(pozicija, item);
}
document.addEventListener("keypress", function (evt) {
  if (evt.keyCode == 13) {
    const toDo = input.value;

    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    input.value = "";
  }
});

function completeToDo(element) {
  element.classList.toggle(oznaceno);
  element.classList.toggle(odznaceno);
  element.parentNode.querySelector(".text").classList.toggle(prekrizeno);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

lista.addEventListener("click", function (evt) {
  const element = evt.target;
  const elementJob = element.attributes.obavljeno.value;

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }

  localStorage.setItem("TODO", JSON.stringify(LIST));
});
