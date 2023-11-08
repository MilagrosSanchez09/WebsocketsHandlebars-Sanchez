const socket = io();
socket.on("productos", (data) => {
  const productosLista = document.querySelector(".container");
  productosLista.innerHTML = " ";
  data.forEach((element) => {
    const boxItem = `
                <div class="product">
                <h3>${element.title}</h3>
                <h4>${element.author}</h4>
                <h5>${element.category}</h5>
                <p>Description: ${element.description}</p>
                <p>ID: ${element.id}</p>
                <p>$ ${element.price}</p>
                <p>Stock: ${element.stock}</p>
                </div>`;
    productosLista.innerHTML += boxItem;
  });
  


  

});