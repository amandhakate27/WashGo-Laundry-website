// button select

const serviceBtns = document.querySelectorAll(".add-remove-btn button")

// empty cart select
const emptyCart = document.querySelector(".empty-cart");

// filled cart select

const filledCart = document.querySelector(".cart-table");

// data filled hone par isme ayga
const cartBody = document.querySelector(".cart-table-body");

let totalAmount = 0; // amount by default zero
let totalAmountDiv = document.querySelector(".total-amount span");


// helper : rows ko re-index karna
function reIndexRow (){
  let rows = cartBody.querySelectorAll("tr");
  rows.forEach((row, indx) => {
    row.cells[0].textContent = indx + 1;
  });
}


// toggle function 
const toggleAddRemove = (btn , price) =>{
  if (btn.textContent.includes("Add Item")) {
      btn.innerHTML =  `Remove Item <span class="material-symbols-outlined">cancel</span>`;
btn.style.color = "red";
totalAmount += price;
  } else {
    btn.innerHTML = `Add Item <span class="material-symbols-outlined"> add_circle</span>`;
    btn.style.color = "black";
    totalAmount = totalAmount-price;
  }
   totalAmountDiv.textContent = `₹ ${totalAmount.toFixed(2)}`;
}

// main Logic
serviceBtns.forEach((buttons)=>{
  buttons.addEventListener("click", (event)=>{
    let serviceRow = event.target.closest(".service-row");

// service details
const serviceName = serviceRow.querySelector("div span:nth-child(2)").textContent;

let text = serviceName.replace("-"," ").trim();
const serviceCost = serviceRow.querySelector("div span:nth-child(3)").textContent;
// ye rejex hai jo number ke alawa sab hata dega 
let sCost = serviceCost.replace(/[^\d.]/g, "").trim();
// string ko number me convert karega
let price = parseFloat((sCost));

// toggle button + update total
toggleAddRemove(event.currentTarget, price);

if(event.currentTarget.textContent.includes("Remove Item")){
  // to row add kar do


  // cart section hide and show karne ke liye
  emptyCart.style.display = "none";
  cartBody.style.display = "table-row-group"; //block

  let rowIndex = cartBody.rows.length; // rows ka sr no
// adding new row to cart section

let newRow = document.createElement("tr");
newRow.classList.add("cart-table-row");
newRow.dataset.service = text; // store service name for removal;

let srNoCell = document.createElement("td");
let serviceNameCell=  document.createElement("td");
let priceCell = document.createElement("td");


srNoCell.textContent = rowIndex;
serviceNameCell.textContent = text; //row ki service
priceCell.textContent = `₹ ${price.toFixed(2)}` // row ki service-price

newRow.appendChild(srNoCell);
newRow.appendChild(serviceNameCell);
newRow.appendChild(priceCell);

cartBody.appendChild(newRow);

}
else{
  // remove rows

  let rows = cartBody.querySelectorAll("tr");
  rows.forEach((row)=>{
    if(row.dataset.service === text){
      row.remove();
    }
});

//reindex rows
reIndexRow();

// if cart is empty
if(cartBody.rows.length === 0){
  emptyCart.style.display = "block";
  cartBody.style.display = "none";
}
}
updateBookingInfo();
  });
});


const bookingForm = document.querySelector("#bookingForm");
const formInputs = bookingForm.querySelectorAll("input");
const infoMsg = bookingForm.querySelector(".info-msg span");
const infoIcon = bookingForm.querySelector(".info-icon span");
const bookBtn =  bookingForm.querySelector("button[type='submit']");
const toggleInfoMsg = bookingForm.querySelector(".show-hide-msg");




function updateBookingInfo(){
      if(cartBody.rows.length === 1){ // empty cart
        infoMsg.textContent = "Add the items to the cart to book";
        infoMsg.style.color = "red";
        infoIcon.style.color = "red";
        bookBtn.style.backgroundColor = "";
        toggleInfoMsg.classList.add("show-msg");
        toggleInfoMsg.classList.remove("hide-msg");
        return false;
      }
      else{
        infoMsg.textContent = "";
        toggleInfoMsg.classList.add("hide-msg");
        toggleInfoMsg.classList.remove("show-msg");
        bookBtn.style.backgroundColor ="orangered";
        return true;
      }
}
formInputs.forEach((input)=>{
  input.addEventListener("focus", updateBookingInfo)
});


bookingForm.addEventListener("submit",(event)=>{
   event.preventDefault();
  if(!updateBookingInfo()){
    return;
  }

// form values

const name = bookingForm.querySelector("#name").value;
const email = bookingForm.querySelector("#email").value;
const phone = bookingForm.querySelector("#phone").value;
const total = document.querySelector(".total-amount span").textContent;

// cart item collect karne ke liye

let rows = cartBody.querySelectorAll("tr");
let itemsList = "<ul>";
rows.forEach(row =>{
  if(row.cells.length >=3){
  let serviceName = row.cells[1].textContent;
  let price = row.cells[2].textContent;
  itemsList += `<li>${serviceName} - ${price}</li>`;
  }
});

itemsList += "</ul>";

// email send
emailjs.send("service_d0pm4aq", "template_u138zop",{
  name : name,
  email: email,
  phone : phone,
  total : total, 
  items: itemsList
})
.then((res)=>{
  console.log("success!", res.status, res.text);
  infoMsg.textContent = "Email has been send successfully";
   infoMsg.style.color = "green";
   infoIcon.style.color = "green";
  toggleInfoMsg.classList.remove("hide-msg");
  toggleInfoMsg.classList.add("show-msg");
   bookingForm.reset();
   cartBody.innerHTML = "";
   totalAmountDiv.textContent = "₹ 0";
   emptyCart.style.display = "block";
   cartBody.style.display = "none";
   serviceBtns.forEach((btn)=>{
    btn.innerHTML = `Add Item <span class="material-symbols-outlined"> add_circle</span>`;
    btn.style.color = "black";
   });
})
.catch((err)=>{
  console.log(err);
  infoMsg.textContent = "Booking Failed";
   infoMsg.style.color = "red";
   infoIcon.style.color = "red";
});
});