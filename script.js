const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

const yes = document.getElementById("yes");
const no = document.getElementById("no");

const dataItem = document.getElementById("dataItem");
const amountItem = document.getElementById("amountItem");
const incExp = document.getElementById("incExp");

const list = document.getElementById("list");

const del = document.getElementById("del");
const clear = document.getElementById("clear");
const allitem = document.getElementById("allitem");

const allItemCss = document.getElementById("allItemCss");
const Frameforallitem = document.getElementById("Frameforallitem");
const Closed = document.getElementById("closed");
const bg = document.getElementById("bg");
const TrST = document.getElementById("TrST");
const YN = document.getElementById("YN");

const display = document.getElementById("display");

const submit = document.getElementById("submit");
const sub = document.getElementById("sub");

const addbtn = document.createElement("button");

const size = document.createElement("size");

let forID = [];
let Id;

function check() {
  if (dataItem.value.trim() != "" && amountItem.value != "") {
    submit.innerHTML = `<button>Submit</button>`;
  }
}

function transaction(element) {
  element.preventDefault();
  if (dataItem.value.trim() == "" || amountItem.value == "") {
    alert("Please provide complete information.");
  } else {
    let data = {
      id: Math.random(),
      dataItem: dataItem.value,
      amountItem: amountItem.value,
      incExp: incExp.value,
    };
    const sign = data.incExp == "income" ? "+" : "-";
    const cl = data.incExp == "income" ? "plus" : "neg";

    const transaction = document.createElement("li");
    transaction.classList.add(cl);
    transaction.innerHTML = `<button id="data.id" onclick='deLete(${data.id})' class='hidden'><div>${data.dataItem}</div><div style='color: black';>${sign} ${data.amountItem}</div></button>`;

    list.appendChild(transaction);
    forID.push(data);
    allAmount();

    dataItem.value = "";
    amountItem.value = "";
    submit.innerHTML = `<button disabled>Submit</button>`;
  }
}

function sum(data, sign) {
  let total = data.reduce((result, value) => result + +value, 0);
  return total;
}

let Value = [];

function arrayAmount() {
  Value = [];
  forID.forEach((element) => {
    let symbo = element.incExp == "income" ? "+" : "-";
    let amount = symbo + element.amountItem;
    Value.push(+amount);
  });
}

function allAmount() {
  arrayAmount();
  let array = Value;
  let inCome = sum(array.filter((value) => value > 0));
  let exPense = sum(array.filter((value) => value < 0));
  let total = inCome + exPense;

  balance.innerText = total;
  income.innerText = inCome;
  expense.innerHTML = Math.abs(exPense);
}

function deLete(id) {
  list.innerText = "";
  forID.forEach((element) => {
    const lit = document.createElement("li");
    const sign = element.incExp == "income" ? "+" : "-";
    const cl = element.incExp == "income" ? "plus" : "neg";
    if (element.id == id) {
      lit.innerHTML = `<button onclick='deLete(${element.id})' class='hidden'><div>${element.dataItem}</div><div style='color: black';>${sign} ${element.amountItem}</div></button>`;
      lit.classList.add(`del`);
    } else {
      lit.innerHTML = `<button onclick='deLete(${element.id})' class='hidden'><div>${element.dataItem}</div><div style='color: black';>${sign} ${element.amountItem}</div></button>`;
    }
    Id = id;
    lit.classList.add(cl);
    list.appendChild(lit);
    box.classList.remove(`none`);
  });
}

function deleteItem() {
  list.innerText = "";
  let keep = forID.filter((element) => element.id != Id);
  forID = keep;
  if (keep != []) {
    keep.forEach((element) => {
      const sign = element.incExp == "income" ? "+" : "-";
      const cl = element.incExp == "income" ? "plus" : "neg";
      const lit = document.createElement("li");
      lit.innerHTML = `<button onclick='deLete(${element.id})' class='hidden'><div>${element.dataItem}</div><div style='color: black';>${sign} ${element.amountItem}</div></button>`;
      lit.classList.add(cl);
      list.appendChild(lit);
    });
  }
  displayNone();
  allAmount();
}

function displayNone() {
  box.classList.add("none");
  list.innerText = "";
  forID.forEach((element) => {
    const sign = element.incExp == "income" ? "+" : "-";
    const cl = element.incExp == "income" ? "plus" : "neg";
    const lit = document.createElement("li");
    lit.innerHTML = `<button onclick='deLete(${element.id})' class='hidden'><div>${element.dataItem}</div><div style='color: black';>${sign} ${element.amountItem}</div></button>`;
    lit.classList.add(cl);
    list.appendChild(lit);
  });
}

function AllClear() {
  forID = [];
  list.innerText = "";
  allAmount();
}

function back() {
  displayNone();
  sub.classList.remove("none");
  allItemCss.classList.remove("all-item");
  Frameforallitem.classList.remove("alliframe");
  bg.classList.remove("bg-white");
  TrST.classList.remove("padding");
  Closed.removeChild(addbtn);
}

function AllItem() {
  displayNone();
  sub.classList.add("none");
  allItemCss.classList.add("all-item");
  Frameforallitem.classList.add("alliframe");
  bg.classList.add("bg-white");
  TrST.classList.add("padding");
  addbtn.innerHTML = `<button id="forX" onclick="back()" title=
  "Go back to the previous page."><h3 id='smallletter'>Go back =></h3></button>`;
  Closed.appendChild(addbtn);
}

function sizefont(value) {
  content.classList.remove("S");
  content.classList.remove("M");
  content.classList.remove("L");
  if (value == "fontS") {
    content.classList.add("S");
  } else if (value == "fontM") {
    content.classList.add("M");
  } else {
    content.classList.add("L");
  }
}

function displayTransaction() {
  display.classList.add("none");
  bg.classList.remove("none");
}

dataItem.addEventListener("input", check);
amountItem.addEventListener("input", check);
sub.addEventListener("submit", transaction);
yes.addEventListener("click", deleteItem);
no.addEventListener("click", displayNone);
clear.addEventListener("click", AllClear);
allitem.addEventListener("click", AllItem);
display.addEventListener("click", displayTransaction);
