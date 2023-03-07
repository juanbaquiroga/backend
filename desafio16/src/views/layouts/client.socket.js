const socket = io();

const productTitleInput = document.getElementById('productTitleInput')
const productPriceInput = document.getElementById('productPriceInput')
const productImageInput = document.getElementById('productImageInput')
const productsForm = document.getElementById('productsForm')
const productsPool = document.getElementById('productsPool')
const productDeleteImput = document.getElementById('deleteItem')

const messageForm = document.getElementById("messageForm");
const emailInput = document.getElementById("emailInput");
const messageInput = document.getElementById("messageInput");
const messagesPool = document.getElementById("messagesPool");

const sendProduct = (product) => {
    socket.emit("client:product", product);
}

const renderProducts = (productsData)=>{
    const html = productsData.map((productInfo) => {
        return `
            <tr>
                <td>${productInfo.title}</td>
                <td>$${productInfo.price}</td>
                <td><img src="${productInfo.img}" alt="${productInfo.title}" width="200px"></td>
            </tr>`
    });
    productsPool.innerHTML = html.join(" ")
}

const productsHandler = (event) => {
    event.preventDefault();
  
    const productInfo = {
      title: productTitleInput.value,
      price: productPriceInput.value,
      img: productImageInput.value
    };
  
    sendProduct(productInfo);
  
    productTitleInput.value = "";
    productPriceInput.value = "";
    productImageInput.value = "";
};
productsForm.addEventListener("submit", productsHandler);

socket.on("server:products", renderProducts);



const sendMessage = (messageInfo) => {
    socket.emit("client:message", messageInfo);
};
const renderMessage = (messagesData)=>{
    const html = messagesData.map((messageInfo) => {
        return `<div> <b style="font-size:15px">[${messageInfo.date}]----  </b><strong style="font-size:15px">${messageInfo.email}: </strong> <em>${messageInfo.message}<em/> </div>`;
    })

    messagesPool.innerHTML = html.join(" ");
}

const submitHandler = (event) => {
    event.preventDefault();
    const messageInfo = {
      email: emailInput.value,
      message: messageInput.value
    };
    
    sendMessage(messageInfo);
  
    messageInput.value = "";
    emailInput.readOnly = true;
};

messageForm.addEventListener('submit', submitHandler)

socket.on("server:message", renderMessage);