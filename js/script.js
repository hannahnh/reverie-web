document.addEventListener("DOMContentLoaded", function () {
    const aboutButton = document.getElementById("about-button");
    const aboutDropdown = document.getElementById("about-dropdown");

    if (aboutButton && aboutDropdown) {
        aboutButton.addEventListener("click", function () {
            aboutDropdown.classList.toggle("hidden");
        });

        // Close dropdown if clicking outside
        document.addEventListener("click", function (event) {
            if (!aboutButton.contains(event.target) && !aboutDropdown.contains(event.target)) {
                aboutDropdown.classList.add("hidden");
            }
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeMenuBtn = document.getElementById("close-menu");

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", function () {
            mobileMenu.classList.toggle("hidden");
        });

        closeMenuBtn.addEventListener("click", function () {
            mobileMenu.classList.add("hidden");
        });
    }

    // Mobile About Dropdown
    const mobileAboutBtn = document.getElementById("mobile-about-btn");
    const mobileAboutMenu = document.getElementById("mobile-about-menu");

    if (mobileAboutBtn && mobileAboutMenu) {
        mobileAboutBtn.addEventListener("click", function () {
            mobileAboutMenu.classList.toggle("hidden");
        });
    }
});
