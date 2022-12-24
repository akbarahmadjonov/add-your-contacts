const elForm = document.querySelector(".js-form");
const elInput = document.querySelector(".js-input");
const elSelect = document.querySelector(".js-select");
const elList = document.querySelector(".js-list");
const elInputNumber = document.querySelector(".js-input-number");
const elPhoneError = document.querySelector(".js-phone-error");
const elModeBtn = document.querySelector(".js-mode");

let todos = [];

// Dark mode
let theme = false;

elModeBtn.addEventListener("click", function () {
  theme = !theme;
  const bg = theme ? "dark" : "light";
  window.localStorage.setItem("theme", bg);
  changeTheme();
});

function changeTheme() {
  if (window.localStorage.getItem("theme") == "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}
changeTheme();
// Dark mode

function renderContact(array, node) {
  elList.innerHTML = "";
  array.forEach((element) => {
    let newLi = document.createElement("li");
    // newLi.dataset.contact = element.id;
    newLi.setAttribute("class", "list-group-item bg-light");

    let newOpt = document.createElement("option");
    newLi.innerHTML = `
      <i class='fa-regular fa-address-book fs-3'></i>
    <strong class='d-block mb-1 fs-4'>Name</strong>
    <p class='p-2 border border-2 d-inline-block rounded'>${element.text}</p>
     <i class="fa-solid fa-people-group fs-3 d-block mt-4"></i>
    <strong class='d-block mb-1 mt-2 fs-4'>Relationship</strong>
    <p class='p-2 border border-2 d-inline-block rounded'>${element.optionVal}</p>
    <i class="fa-sharp fa-solid fa-phone-volume fs-3 d-block mt-4"></i>
    <strong class='d-block mb-1 mt-2 fs-4'>Phone number</strong>
    <a class='p-2 d-inline-block rounded text-decoration-none' href='tel:${element.num}'> <img  width='35' height='35' src='./images/call.gif'> Call now: ${element.num}</a>
    `;

    let newEditButton = document.createElement("button");
    let newDeleteButton = document.createElement("button");
    newEditButton.setAttribute(
      "class",
      "btn btn-success me-2 p-3 fs-4 fa-solid fa-pen-to-square js-edit"
    );
    newLi.dataset.contact = element.id;
    newEditButton.dataset.contactEdit = element.id;
    newDeleteButton.dataset.contactDelete = element.id;
    newEditButton.setAttribute("type", "button");
    newDeleteButton.setAttribute(
      "class",
      "btn btn-danger p-3 fs-4 fa-solid fa-trash js-delete"
    );
    newDeleteButton.setAttribute("type", "button");

    // newLi.appendChild(newP);
    newLi.appendChild(newOpt);
    newLi.appendChild(newEditButton);
    newLi.appendChild(newDeleteButton);
    elList.appendChild(newLi);
  });
}

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  let newTodo = {
    id: todos.length + 1,
    text: elInput.value,
    optionVal: elSelect.value,
    num: elInputNumber.value,
  };

  if (elInputNumber.value.length > 13) {
    elPhoneError.classList.remove("d-none");
    return false;
  }
  if (
    elInput.value !== "" &&
    elSelect.value !== "" &&
    elInputNumber.value !== ""
  ) {
    todos.push(newTodo);
  }
  elInput.value = "";
  renderContact(todos, elList);
});

elList.addEventListener("click", function (evt) {
  // console.log(evt.target);
  if (evt.target.matches(".js-delete")) {
    const dataId = evt.target.dataset.contactDelete;
    const foundIndex = todos.findIndex((el) => el.id == dataId);
    todos.splice(foundIndex, 1);
    renderContact(todos, elList);
  }
  if (evt.target.matches(".js-edit")) {
    const dataId = evt.target.dataset.contactEdit;
    const foundIndex = todos.findIndex((el) => el.id == dataId);

    //* Input
    let promptInput = prompt(
      `You're about to change this: ${todos[foundIndex].text}`,
      todos[foundIndex].text
    );
    todos[foundIndex].text = promptInput;

    //* Select input
    let promptSelect = prompt(
      `You're about to change this: ${todos[foundIndex].optionVal}`
    );
    todos[foundIndex].optionVal = promptSelect;

    let promptPhone = prompt(
      `You're about to change this: ${todos[foundIndex].num}`
    );
    todos[foundIndex].num = promptPhone;

    renderContact(todos, elList);
  }
});
