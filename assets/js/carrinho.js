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

    renderCart(); // Atualiza automaticamente
    alert("Produto adicionado!");
}

// ===== REMOVER PRODUTO =====
function removeItem(index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    carrinho.splice(index, 1);

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    renderCart();
}

// ===== LIMPAR CARRINHO =====
function limparCarrinho() {
    localStorage.removeItem("carrinho");
    renderCart();
}

// ===== RENDERIZAR CARRINHO =====
function renderCart() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let cartItems = document.getElementById("cartItems");
    let total = 0;

    cartItems.innerHTML = "";

    if (carrinho.length === 0) {
        cartItems.innerHTML = "<p>Seu carrinho está vazio.</p>";
        document.getElementById("cartTotal").innerText = "Total: R$ 0,00";
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
}

// ===== FINALIZAR COMPRA =====
function finalizarCompra() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Olá, meu pedido é:%0A";

    carrinho.forEach(item => {
        mensagem += `- ${item.nome} R$ ${item.preco}%0A`;
    });

    mensagem += "%0ATotal: R$ " +
        carrinho.reduce((acc, item) => acc + item.preco, 0).toFixed(2);

    window.open(`https://wa.me/5582991156122?text=${mensagem}`);

    limparCarrinho(); // Limpa após finalizar
}