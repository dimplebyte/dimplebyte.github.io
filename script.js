/* =========================================
   DIMPLE MARBLE WEBSITE
   JavaScript
========================================= */


/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {

    const nav = document.getElementById("navMenu");

    nav.classList.toggle("show");

}


/* Close mobile menu after clicking a link */

document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        document.getElementById("navMenu").classList.remove("show");

    });

});


/* =========================
   PRODUCT FILTER
========================= */

let currentCategory = "all";


function setCategory(category, button) {

    currentCategory = category;

    document.querySelectorAll(".filter").forEach(btn => {

        btn.classList.remove("active");

    });

    button.classList.add("active");

    filterProducts();

}


function filterProducts() {

    const searchValue =
        document.getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();


    const products =
        document.querySelectorAll(".product-card");


    products.forEach(product => {

        const category =
            product.dataset.category;

        const name =
            product.dataset.name.toLowerCase();


        const categoryMatch =
            currentCategory === "all" ||
            category === currentCategory;


        const searchMatch =
            name.includes(searchValue);


        if (categoryMatch && searchMatch) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}


/* =========================
   CART
========================= */

let cart = [];


function addToCart(productName) {

    if (!cart.includes(productName)) {

        cart.push(productName);

        updateCart();

        openCart();

    } else {

        alert(productName + " is already in your enquiry.");

    }

}


function updateCart() {

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");

    const cartItems =
        document.getElementById("cartItems");


    cartCount.textContent = cart.length;

    cartTotal.textContent = cart.length;


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <i class="fa-regular fa-gem"></i>

                <h4>Your selection is empty</h4>

                <p>
                    Add marble products you'd like to enquire about.
                </p>

            </div>

        `;

        return;

    }


    cartItems.innerHTML = "";


    cart.forEach((product, index) => {

        const item = document.createElement("div");

        item.className = "cart-item";


        item.innerHTML = `

            <div>

                <span>MARBLE SELECTION</span>

                <h4>${product}</h4>

            </div>

            <button
                class="remove-item"
                onclick="removeFromCart(${index})"
                aria-label="Remove product"
            >

                <i class="fa-solid fa-trash"></i>

            </button>

        `;


        cartItems.appendChild(item);

    });

}


function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


function openCart() {

    document.getElementById("cart")
        .classList.add("open");

    document.getElementById("cartOverlay")
        .classList.add("open");

    document.body.style.overflow = "hidden";

}


function closeCart() {

    document.getElementById("cart")
        .classList.remove("open");

    document.getElementById("cartOverlay")
        .classList.remove("open");

    document.body.style.overflow = "";

}


/* =========================
   WHATSAPP ENQUIRY
========================= */

/*
   IMPORTANT:
   Replace the number below with
   the actual WhatsApp number.

   Use country code without +
   Example:
   919876543210
*/

const whatsappNumber = "91XXXXXXXXXX";


function sendWhatsAppEnquiry() {

    if (cart.length === 0) {

        alert("Please select at least one marble product first.");

        return;

    }


    let message =
        "Hello Dimple, I am interested in the following marble products:%0A%0A";


    cart.forEach((product, index) => {

        message +=
            `${index + 1}. ${product}%0A`;

    });


    message +=
        "%0AI would like to know the availability and pricing.";


    const url =
        `https://wa.me/${whatsappNumber}?text=${message}`;


    window.open(url, "_blank");

}


/* =========================
   QUICK VIEW
========================= */

const productData = {

    "Carrara White Marble": {

        type: "WHITE MARBLE",

        title: "Carrara White",

        description:
            "Elegant white marble featuring subtle natural veining. A timeless choice for floors, walls, countertops and luxury interiors.",

        image:
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85"

    },


    "Calacatta Gold Marble": {

        type: "LUXURY MARBLE",

        title: "Calacatta Gold",

        description:
            "A luxurious marble characterized by a beautiful white background and dramatic golden veining.",

        image:
            "https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&w=1000&q=85"

    },


    "Black Marquina Marble": {

        type: "DARK MARBLE",

        title: "Black Marquina",

        description:
            "Deep black marble with contrasting natural white veins, ideal for dramatic and sophisticated spaces.",

        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85"

    },


    "Makarana White Marble": {

        type: "INDIAN MARBLE",

        title: "Makarana White",

        description:
            "Classic Indian marble known for its clean appearance and timeless character.",

        image:
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85"

    },


    "Onyx Premium Stone": {

        type: "ONYX",

        title: "Premium Onyx",

        description:
            "A distinctive natural stone with translucent qualities that can create spectacular statement interiors.",

        image:
            "https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1000&q=85"

    },


    "Natural Travertine": {

        type: "NATURAL STONE",

        title: "Travertine",

        description:
            "Warm and naturally textured stone suitable for contemporary and traditional architectural applications.",

        image:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85"

    }

};


function quickView(productName) {

    const product = productData[productName];

    if (!product) return;


    const modal =
        document.getElementById("quickModal");

    const content =
        document.getElementById("modalContent");


    content.innerHTML = `

        <div class="modal-product">

            <img
                src="${product.image}"
                alt="${product.title}"
            >

            <div>

                <span class="product-type">
                    ${product.type}
                </span>

                <h2>
                    ${product.title}
                </h2>

                <p>
                    ${product.description}
                </p>

                <button
                    class="btn primary-btn"
                    onclick="addToCart('${productName}'); closeModal();"
                >

                    Add to Enquiry

                    <i class="fa-solid fa-plus"></i>

                </button>

            </div>

        </div>

    `;


    modal.classList.add("open");

    document.body.style.overflow = "hidden";

}


function closeModal() {

    document
        .getElementById("quickModal")
        .classList.remove("open");

    document.body.style.overflow = "";

}


/* Close modal when clicking outside */

document.getElementById("quickModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeModal();

        }

    });


/* =========================
   CONTACT FORM
========================= */

function sendEnquiry(event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const marbleType =
        document.getElementById("marbleType").value;

    const message =
        document.getElementById("message").value.trim();


    if (!name || !phone) {

        alert("Please enter your name and phone number.");

        return;

    }


    let whatsappMessage =
        `Hello Dimple,%0A%0A` +
        `My name is ${name}.%0A` +
        `Phone: ${phone}%0A` +
        `Marble requirement: ${marbleType || "Not specified"}%0A` +
        `Message: ${message || "I would like to know more about your marble collection."}`;


    const url =
        `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;


    window.open(url, "_blank");

}


/* =========================
   ESC KEY
========================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeModal();

        closeCart();

    }

});


/* =========================
   INITIALIZE
========================= */

updateCart();
