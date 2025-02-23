// Your code here.
function toggleMenu() {
    const nav = document.querySelector(".nav-links");
    const button = document.querySelector("#menu-toggle");

    //toggle the menu
    nav.classList.toggle("active");
    button.classList.toggle("active");
}

