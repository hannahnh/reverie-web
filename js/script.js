document.addEventListener("DOMContentLoaded", function () {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeMenu = document.getElementById("close-menu");

    mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });

    closeMenu.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
    });

    // About dropdown toggle (Desktop)
    const aboutBtn = document.getElementById("about-btn");
    const aboutDropdown = document.getElementById("about-dropdown");

    aboutBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        aboutDropdown.classList.toggle("hidden");
    });

    document.addEventListener("click", (event) => {
        if (!aboutBtn.contains(event.target)) {
            aboutDropdown.classList.add("hidden");
        }
    });

    // Mobile About dropdown toggle
    const mobileAboutBtn = document.getElementById("mobile-about-btn");
    const mobileAboutMenu = document.getElementById("mobile-about-menu");

    mobileAboutBtn.addEventListener("click", () => {
        mobileAboutMenu.classList.toggle("hidden");
    });
});
