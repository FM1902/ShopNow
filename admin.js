admin.js
Code:

let products=JSON.parse(localStorage.getItem("products"))||[];

function addProduct(){

let p={

name:document.getElementById("name").value,
price:parseFloat(document.getElementById("price").value),
img:document.getElementById("img").value,
cat:document.getElementById("cat").value

};

products.push(p);

localStorage.setItem("products",JSON.stringify(products));

alert("Produkt gespeichert");

}

let orders=JSON.parse(localStorage.getItem("orders"))||[];

document.getElementById("stats").innerText="Bestellungen: "+orders.length;
