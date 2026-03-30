let products=[

{name:"T-Shirt",price:20,img:"https://picsum.photos/200?1"},

{name:"Hoodie",price:40,img:"https://picsum.photos/200?2"},

{name:"Cap",price:15,img:"https://picsum.photos/200?3"}

];

let cart=[];

let productsDiv=document.getElementById("products");

products.forEach((p,index)=>{

let div=document.createElement("div");

div.className="product";

div.innerHTML=`

<img src="${p.img}">

<h3>${p.name}</h3>

<p>${p.price}€</p>

<button onclick="addToCart(${index})">In den Warenkorb</button>

`;

productsDiv.appendChild(div);

});

function addToCart(index){

cart.push(products[index]);

updateCart();

}

function updateCart(){

let cartList=document.getElementById("cart");

cartList.innerHTML="";

let total=0;

cart.forEach(item=>{

let li=document.createElement("li");

li.innerText=item.name+" - "+item.price+"€";

cartList.appendChild(li);

total+=item.price;

});

document.getElementById("total").innerText="Gesamt: "+total+"€";

}

paypal.Buttons({

createOrder:function(data,actions){

let total=cart.reduce((sum,item)=>sum+item.price,0);

return actions.order.create({

purchase_units:[{

amount:{value:total}

}]

});

},

onApprove:function(data,actions){

return actions.order.capture().then(function(details){

alert("Danke für deinen Einkauf "+details.payer.name.given_name);

cart=[];

updateCart();

});

}

}).render('#paypal-button-container');
