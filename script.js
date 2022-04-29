"use strict";
const input = document.querySelector(".input");
const submit = document.querySelector(".submit");
const items = document.querySelector(".items");
const message = document.querySelector(".message");
const clear = document.querySelector(".clear");
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
  if (input.value) {
    item().length === 0 ? clear.classList.remove("hidden") : "";
    const element = ` 
    <li class="item">
    ${input.value}
    <div class="options">
    <span class="edit" title="edit">📝</span>
    <span class="delete" title="delete">❌</span>
    </div>
    </li>`;
    items.insertAdjacentHTML("beforeend", element);
    input.value = "";
    displayMsg("item added", "green");
  } else {
    displayMsg("please enter value", "red");
  }
});
const item = (x) => document.querySelectorAll(".item");
// clear items list functionality
clear.classList.add("hidden");
clear.addEventListener("click", function (e) {
  e.preventDefault();
  if (item.length) {
    items.innerHTML = "";
    displayMsg("empty list", "red");
  }
  clear.classList.add("hidden");
});
// delete item by item
items.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove();
    displayMsg("item removed", "red");
  }
  if (!item().length) {
    clear.classList.add("hidden");
  }
});
// edit functionnality
// items.addEventListener("click", function (e) {
//   if (e.target.classList.contains("edit")) {
//     submit.textContent = "Edit";
//     input.value =
//       e.target.parentElement.parentElement.textContent.match(/^[a-z]*/gi);
//   }
// });
