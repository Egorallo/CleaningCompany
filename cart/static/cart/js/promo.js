document.getElementById("applyPromo").addEventListener("click", function () {
    const promoCode = document.getElementById("promoCode").value;
    console.log(`Promo code: ${promoCode}`);
    fetch(`http://127.0.0.1:8000/cart/apply_promo_code/?promo_code=${promoCode}`)
        .then(response => response.json())
        .then(data => {
            if (data.discount !== undefined) {

                const discount = data.discount;
                updateCartTotal(discount);

                document.getElementById("promoCode").disabled = true
                document.getElementById("applyPromo").disabled = true
            } else {
            }
        });
});

function updateCartTotal(discount) {
    const currentTotal = parseFloat(document.getElementById("totalPrice").textContent);
    const newTotal = currentTotal - currentTotal * (discount / 100);
    if (!isNaN(newTotal)) {
        document.getElementById("totalPrice").textContent = String(newTotal.toFixed(2));

    } else {
        document.getElementById("totalPrice").textContent = String(currentTotal);

    }
}