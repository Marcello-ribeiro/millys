// ===== MOSTRAR NOTIFICAÇÃO BONITA =====
function showToast(mensagem){
    const toast = document.getElementById("toast");
    if(!toast) return;

    toast.textContent = mensagem;
    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    }, 2200);
}


// ===== ATUALIZA NUMERO DO ICONE =====
function updateCartCount(){
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let contador = document.getElementById("cart-count");

    if(contador){
        contador.textContent = carrinho.length; // mostra quantidade
    }
}


// ===== ABRIR CARRINHO =====
function openCart() {
    document.getElementById("cartSidebar").classList.add("active");
    renderCart();
}


// ===== FECHAR CARRINHO =====
function closeCart() {
    document.getElementById("cartSidebar").classList.remove("active");
}


// ===== ADICIONAR PRODUTO =====
function addToCart(nome, preco) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    carrinho.push({ nome, preco });
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    renderCart();
    updateCartCount();

    showToast("Adicionado à sacola 🛍️"); // notificação bonita
}


// ===== REMOVER PRODUTO =====
function removeItem(index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    renderCart();
    updateCartCount();

    showToast("Produto removido ❌");
}


// ===== LIMPAR CARRINHO =====
function limparCarrinho() {
    localStorage.removeItem("carrinho");

    renderCart();
    updateCartCount();

    showToast("Carrinho limpo 🧹");
}


// ===== RENDERIZAR CARRINHO =====
function renderCart() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let cartItems = document.getElementById("cartItems");
    let total = 0;

    if(!cartItems) return; // evita erro em paginas sem carrinho

    cartItems.innerHTML = "";

    if (carrinho.length === 0) {
        cartItems.innerHTML = "<p>Seu carrinho está vazio.</p>";
        document.getElementById("cartTotal").innerText = "Total: R$ 0,00";
        updateCartCount();
        return;
    }

    carrinho.forEach((item, index) => {
        total += item.preco;

        cartItems.innerHTML += `
            <div style="margin-bottom:10px; border-bottom:1px solid #ddd; padding-bottom:5px;">
                <p><strong>${item.nome}</strong></p>
                <p>R$ ${item.preco.toFixed(2)}</p>
                <button onclick="removeItem(${index})"
                        style="background:red; color:white; border:none; padding:4px 8px; border-radius:10px; cursor:pointer;">
                    Remover
                </button>
            </div>
        `;
    });

    document.getElementById("cartTotal").innerText =
        "Total: R$ " + total.toFixed(2);

    updateCartCount();
}


// ===== FINALIZAR COMPRA =====
function finalizarCompra() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (carrinho.length === 0) {
        showToast("Sua sacola está vazia");
        return;
    }

    let mensagem = "Olá, meu pedido é:%0A";

    carrinho.forEach(item => {
        mensagem += `- ${item.nome} R$ ${item.preco}%0A`;
    });

    mensagem += "%0ATotal: R$ " +
        carrinho.reduce((acc, item) => acc + item.preco, 0).toFixed(2);

    window.open(`https://wa.me/5582991156122?text=${mensagem}`);

    limparCarrinho();

    showToast("Pedido enviado ao WhatsApp 📲");
}


// ===== CARREGAR CONTADOR AO ENTRAR NO SITE =====
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
});