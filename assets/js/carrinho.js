// ===== MODAL BONITO =====
function showModal(titulo, mensagem){
    document.getElementById("modalTitulo").innerText = titulo;
    document.getElementById("modalMensagem").innerText = mensagem;
    document.getElementById("modalAviso").classList.add("active");
}

// ===== TOAST =====
function showToast(msg){
    const toast = document.getElementById("toast");
    if(!toast) return;

    toast.textContent = msg;
    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    },2200);
}

function fecharModal(){
    document.getElementById("modalAviso").classList.remove("active");
}

// ===== CONTADOR =====
function updateCartCount(){
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let total = carrinho.reduce((s,i)=> s + i.qtd,0);
    let el = document.getElementById("cart-count");
    if(el) el.textContent = total;
}

// ===== ABRIR/FECHAR =====
function openCart(){
    document.getElementById("cartSidebar").classList.add("active");
    atualizarCarrinho();
}
function closeCart(){
    document.getElementById("cartSidebar").classList.remove("active");
}

// ===== ADICIONAR =====
function addToCart(nome, preco, img){
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    let existente = carrinho.find(i => i.nome === nome);

    if(existente){
        existente.qtd++;
    }else{
        carrinho.push({nome, preco, qtd:1, img});
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarCarrinho();
    updateCartCount();
    showToast(nome + " adicionado ao 🛒");
}

// ===== + =====
function aumentarQtd(index){
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho[index].qtd++;
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarCarrinho();
    updateCartCount();
}

// ===== - =====
function diminuirQtd(index){
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho[index].qtd--;

    if(carrinho[index].qtd <= 0){
        carrinho.splice(index,1);
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarCarrinho();
    updateCartCount();
}

// ===== DESENHAR CARRINHO =====
function atualizarCarrinho(){
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const box = document.getElementById("cartItems");
    const totalEl = document.getElementById("cartTotal");
    if(!box) return;

    box.innerHTML = "";

    if(carrinho.length === 0){
        box.innerHTML = "<p>Seu carrinho está vazio 😢 </p>";
        totalEl.innerText = "Total: R$ 0,00";
        return;
    }

    let total = 0;

    carrinho.forEach((item,index)=>{
        let subtotal = item.preco * item.qtd;
        total += subtotal;

        box.innerHTML += `
        <div class="cart-item">

            <img src="${item.img}" class="cart-thumb">

            <div class="cart-info">
                <div class="cart-name">${item.nome}</div>
                <div class="cart-price">R$ ${item.preco.toFixed(2)}</div>

                <div class="cart-qtd">
                    <button onclick="diminuirQtd(${index})">−</button>
                    <span>${item.qtd}</span>
                    <button onclick="aumentarQtd(${index})">+</button>
                </div>
            </div>

            <div class="cart-subtotal">
                R$ ${subtotal.toFixed(2)}
            </div>

        </div>`;
    });

    totalEl.innerText = "Total: R$ " + total.toFixed(2);
}

// ===== WHATSAPP =====
function finalizarCompra(){
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
   if(carrinho.length === 0){
    showModal("Carrinho vazio", "Você ainda não escolheu nenhum mimo 😢");
    return;
}

let pagamento = document.getElementById("formaPagamento").value;
if(!pagamento){
    showModal("Ops!", "Escolha a forma de pagamento antes de finalizar ✨");
    return;
}

    let msg = "NOVO PEDIDO — Milly's Arts*\n\n";
    let total = 0;

   carrinho.forEach(item=>{
        let sub = item.preco * item.qtd;
        total += sub;
        msg += "→ " + item.nome + "\n";
        msg += "Quantidade: " + item.qtd + "\n";
        msg += "Subtotal: R$ " + sub.toFixed(2) + "\n\n";
    });

    msg += "━━━━━━━━━━━━━━\n";
    msg += ` TOTAL: R$ ${total.toFixed(2)}\n`;
    msg += ` Pagamento: ${pagamento}`;

    let numero = "5582991156122";
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`,"_blank");
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", updateCartCount);