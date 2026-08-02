/* =========================
   AVA DASHBOARD JAVASCRIPT
========================= */

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    const sidebarLinks = document.querySelectorAll(".sidebar-link");
    const dashboardPages = document.querySelectorAll(".dashboard-page");

    const mobileMenuButton = document.getElementById("mobileMenuButton");

    const notificationButton = document.getElementById(
        "notificationButton"
    );

    const notificationsPanel = document.getElementById(
        "notificationsPanel"
    );

    const closeNotificationsButton = document.getElementById(
        "closeNotificationsButton"
    );

    const addBookingButton = document.getElementById(
        "addBookingButton"
    );

    const bookingModal = document.getElementById(
        "bookingModal"
    );

    const closeBookingModal = document.getElementById(
        "closeBookingModal"
    );

    const modalOverlay = document.querySelector(
        ".modal-overlay"
    );

    const bookingForm = document.getElementById(
        "bookingForm"
    );

    const todayBookingList = document.getElementById(
        "todayBookingList"
    );

    const dashboardSearch = document.getElementById(
        "dashboardSearch"
    );

    const panelActionButtons = document.querySelectorAll(
        ".panel-action-button"
    );


    /* =========================
       SIDEBAR NAVIGATION
    ========================= */

    sidebarLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const selectedPage = link.dataset.page;

            sidebarLinks.forEach((sidebarLink) => {
                sidebarLink.classList.remove("active");
            });

            dashboardPages.forEach((page) => {
                page.classList.remove("active");
            });

            link.classList.add("active");

            const targetPage = document.querySelector(
                `[data-page-content="${selectedPage}"]`
            );

            if (targetPage) {
                targetPage.classList.add("active");
            }

            body.classList.remove("sidebar-open");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    });


    /* =========================
       MOBILE SIDEBAR
    ========================= */

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener("click", () => {
            body.classList.toggle("sidebar-open");
        });
    }

    document.addEventListener("click", (event) => {
        const sidebar = document.querySelector(".sidebar");

        if (
            window.innerWidth <= 760 &&
            body.classList.contains("sidebar-open") &&
            sidebar &&
            !sidebar.contains(event.target) &&
            !mobileMenuButton.contains(event.target)
        ) {
            body.classList.remove("sidebar-open");
        }
    });


    /* =========================
       NOTIFICATIONS
    ========================= */

    if (notificationButton && notificationsPanel) {
        notificationButton.addEventListener("click", (event) => {
            event.stopPropagation();

            notificationsPanel.classList.toggle("hidden");
        });
    }

    if (closeNotificationsButton && notificationsPanel) {
        closeNotificationsButton.addEventListener("click", () => {
            notificationsPanel.classList.add("hidden");
        });
    }

    document.addEventListener("click", (event) => {
        if (
            notificationsPanel &&
            notificationButton &&
            !notificationsPanel.classList.contains("hidden") &&
            !notificationsPanel.contains(event.target) &&
            !notificationButton.contains(event.target)
        ) {
            notificationsPanel.classList.add("hidden");
        }
    });


    /* =========================
       BOOKING MODAL
    ========================= */

    function openBookingModal() {
        if (!bookingModal) {
            return;
        }

        bookingModal.classList.remove("hidden");

        const firstInput = document.getElementById(
            "bookingCustomer"
        );

        if (firstInput) {
            setTimeout(() => {
                firstInput.focus();
            }, 100);
        }
    }

    function closeBookingModalWindow() {
        if (!bookingModal) {
            return;
        }

        bookingModal.classList.add("hidden");
    }

    if (addBookingButton) {
        addBookingButton.addEventListener(
            "click",
            openBookingModal
        );
    }

    if (closeBookingModal) {
        closeBookingModal.addEventListener(
            "click",
            closeBookingModalWindow
        );
    }

    if (modalOverlay) {
        modalOverlay.addEventListener(
            "click",
            closeBookingModalWindow
        );
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeBookingModalWindow();

            if (notificationsPanel) {
                notificationsPanel.classList.add("hidden");
            }

            body.classList.remove("sidebar-open");
        }
    });


    /* =========================
       ADD BOOKING
    ========================= */

    if (bookingForm) {
        bookingForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const customerInput = document.getElementById(
                "bookingCustomer"
            );

            const serviceInput = document.getElementById(
                "bookingService"
            );

            const dateInput = document.getElementById(
                "bookingDate"
            );

            const timeInput = document.getElementById(
                "bookingTime"
            );

            const customerName = customerInput.value.trim();
            const serviceName = serviceInput.value.trim();
            const bookingDate = dateInput.value;
            const bookingTime = timeInput.value;

            if (
                !customerName ||
                !serviceName ||
                !bookingDate ||
                !bookingTime
            ) {
                return;
            }

            const bookingItem = document.createElement("div");

            bookingItem.className = "booking-item";

            bookingItem.dataset.search = `
                ${customerName}
                ${serviceName}
                ${bookingDate}
                ${bookingTime}
            `.toLowerCase();

            bookingItem.innerHTML = `
                <time>${escapeHTML(bookingTime)}</time>

                <span class="booking-icon">
                    <i class="fa-regular fa-calendar-days"></i>
                </span>

                <div class="booking-details">
                    <strong>${escapeHTML(customerName)}</strong>
                    <span>${escapeHTML(serviceName)}</span>
                </div>

                <span class="booking-size">
                    Confirmed
                </span>
            `;

            if (todayBookingList) {
                todayBookingList.appendChild(bookingItem);
            }

            bookingForm.reset();
            closeBookingModalWindow();

            showTemporaryMessage(
                "Booking added successfully."
            );
        });
    }


    /* =========================
       DASHBOARD SEARCH
    ========================= */

    if (dashboardSearch) {
        dashboardSearch.addEventListener("input", () => {
            const searchValue =
                dashboardSearch.value
                    .trim()
                    .toLowerCase();

            const searchableItems =
                document.querySelectorAll(
                    ".activity-item, .booking-item, .insight-item"
                );

            searchableItems.forEach((item) => {
                const searchableText =
                    item.dataset.search ||
                    item.textContent.toLowerCase();

                const matchesSearch =
                    !searchValue ||
                    searchableText.includes(searchValue);

                item.style.display =
                    matchesSearch ? "" : "none";
            });
        });
    }


    /* =========================
       PANEL BUTTONS
    ========================= */

    panelActionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const action = button.dataset.action;

            if (action === "view-bookings") {
                openDashboardPage("bookings");
                return;
            }

            if (action === "view-insights") {
                openDashboardPage("analytics");
                return;
            }

            if (action === "view-activity") {
                openDashboardPage("conversations");
            }
        });
    });


    /* =========================
       OPEN DASHBOARD PAGE
    ========================= */

    function openDashboardPage(pageName) {
        sidebarLinks.forEach((link) => {
            link.classList.toggle(
                "active",
                link.dataset.page === pageName
            );
        });

        dashboardPages.forEach((page) => {
            page.classList.toggle(
                "active",
                page.dataset.pageContent === pageName
            );
        });

        body.classList.remove("sidebar-open");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* =========================
       PROFILE BUTTON
    ========================= */

    const businessProfileButton = document.getElementById(
        "businessProfileButton"
    );

    if (businessProfileButton) {
        businessProfileButton.addEventListener("click", () => {
            openDashboardPage("settings");
        });
    }


    /* =========================
       SAFE TEXT FUNCTION
    ========================= */

    function escapeHTML(value) {
        const element = document.createElement("div");

        element.textContent = value;

        return element.innerHTML;
    }


    /* =========================
       TEMPORARY MESSAGE
    ========================= */

    function showTemporaryMessage(message) {
        const existingMessage = document.querySelector(
            ".dashboard-toast"
        );

        if (existingMessage) {
            existingMessage.remove();
        }

        const toast = document.createElement("div");

        toast.className = "dashboard-toast";
        toast.textContent = message;

        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add("show");
        });

        setTimeout(() => {
            toast.classList.remove("show");

            setTimeout(() => {
                toast.remove();
            }, 250);
        }, 2600);
    }
});
