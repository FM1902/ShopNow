let products=JSON.parse(localStorage.getItem("products"))||[

{name:"T-Shirt",price:20,cat:"kleidung",img:"https://picsum.photos/200?1"},
{name:"Hoodie",price:40,cat:"kleidung",img:"https://picsum.photos/200?2"},
{name:"Cap",price:15,cat:"accessoires",img:"https://picsum.photos/200?3"}

];

let cart=[];

function renderProducts(){

let container=document.getElementById("products");
container.innerHTML="";

let search=document.getElementById("search").value.toLowerCase();
let cat=document.getElementById("categoryFilter").value;

products.forEach((p,i)=>{

if((cat==="all"||p.cat===cat) && p.name.toLowerCase().includes(search)){

let div=document.createElement("div");

div.className="product";

div.innerHTML=`

<img src="${p.img}">

<h3>${p.name}</h3>

<p>${p.price}€</p>

<button onclick="addToCart(${i})">Kaufen</button>

`;

container.appendChild(div);

}

});

}

function addToCart(i){

cart.push(products[i]);

updateCart();

}

function removeItem(index){

cart.splice(index,1);

updateCart();

}

function updateCart(){

let list=document.getElementById("cart");

list.innerHTML="";

let total=0;

cart.forEach((item,i)=>{

let li=document.createElement("li");

li.innerHTML=`
${item.name} - ${item.price}€
<button onclick="removeItem(${i})">X</button>
`;

list.appendChild(li);

total+=item.price;

});

let shipping=parseInt(document.getElementById("shipping").value);

document.getElementById("total").innerText="Gesamt: "+(total+shipping)+"€";

}

document.getElementById("search").oninput=renderProducts;

document.getElementById("categoryFilter").onchange=renderProducts;

document.getElementById("shipping").onchange=updateCart;

renderProducts();

paypal.Buttons({

createOrder:function(data,actions){

let total=cart.reduce((sum,i)=>sum+i.price,0);

let shipping=parseInt(document.getElementById("shipping").value);

return actions.order.create({

purchase_units:[{amount:{value:(total+shipping)}}]

});

},

onApprove:function(data,actions){

return actions.order.capture().then(function(details){

alert("Danke "+details.payer.name.given_name);

let orders=JSON.parse(localStorage.getItem("orders"))||[];

orders.push(cart);

localStorage.setItem("orders",JSON.stringify(orders));

cart=[];

updateCart();

});

}

}).render('#paypal-button-container');
