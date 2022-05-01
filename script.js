"use strict";
const input = document.querySelector(".input");
const submit = document.querySelector(".submit");
const items = document.querySelector(".items");
const message = document.querySelector(".message");
const clear = document.querySelector(".clear");
const edited = () => document.querySelector(".edited");
// local storage
const localStorageUpdate = () => (window.localStorage.items = items.innerHTML);
items.innerHTML = window.localStorage.items;
//display message
function displayMsg(content, color) {
  message.textContent = content;
  message.classList.add(`message-${color}`);
  setTimeout(function () {
    message.classList.remove(`message-${color}`);
  }, 1000);
}
// add items functionality
submit.addEventListener("click", function (e) {
  e.preventDefault();

  const element = ` 
  <li class="item">
  ${input.value}
  <div class="options">
  <span class="edit" title="edit">📝</span>
  <span class="delete" title="delete">❌</span>
  </div>
  </li>`;
  if (submit.textContent === "Submit") {
    if (input.value) {
      // setInterval(() => console.log(item().length), 1000);
      console.log(item().length);
      items.insertAdjacentHTML("beforeend", element);
      input.value = "";
      displayMsg("item added", "green");
      localStorageUpdate();
      item().length > 0 ? clear.classList.remove("hidden") : "";
    } else {
      displayMsg("please enter value", "red");
    }
  }
  if (submit.textContent === "Edit") {
    edited().innerHTML = `${input.value}
    <div class="options">
    <span class="edit" title="edit">📝</span>
    <span class="delete" title="delete">❌</span>
    </div>`;
    input.value = "";
    submit.textContent = "Submit";
    edited().classList.remove("edited");
    displayMsg("value changed", "green");
    localStorageUpdate();
  }
});
const item = (x) => document.querySelectorAll(".item");
// clear items list functionality
clear.classList.add("hidden");
item().length > 0 ? clear.classList.remove("hidden") : "";
clear.addEventListener("click", function (e) {
  e.preventDefault();
  if (item().length) {
    items.innerHTML = "";
    displayMsg("empty list", "red");
    localStorageUpdate();
  }
  clear.classList.add("hidden");
});
// delete item by item
items.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove();
    displayMsg("item removed", "red");
    localStorageUpdate();
  }
  if (!item().length) {
    clear.classList.add("hidden");
  }
});
// edit functionnality
items.addEventListener("click", function (e) {
  if (e.target.classList.contains("edit")) {
    submit.textContent = "Edit";
    input.value = e.target.parentElement.parentElement.textContent
      .trim()
      .split("")
      .filter((x) => /\w/gi.test(x))
      .join("");
    e.target.parentElement.parentElement.classList.add("edited");
  }
});
