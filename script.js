// =========================
// LANGUAGE TRANSLATIONS
// =========================

const translations = {

    en: {
        heroTitle: "SAVE TIME.<br>STAY AVAILABLE.<br>GROW FASTER.",
        heroText: "AVA helps businesses save time, stay available 24/7, manage bookings, and discover new opportunities for growth."
    },

    sl: {
        heroTitle: "PRIHRANITE ČAS.<br>BODITE VEDNO DOSEGLJIVI.<br>RASTITE HITREJE.",
        heroText: "AVA pomaga podjetjem prihraniti čas, ostati dosegljiva 24/7, upravljati rezervacije in odkrivati nove priložnosti za rast."
    },

    hr: {
        heroTitle: "UŠTEDITE VRIJEME.<br>BUDITE UVIJEK DOSTUPNI.<br>RASTITE BRŽE.",
        heroText: "AVA pomaže poduzećima uštedjeti vrijeme, biti dostupna 24/7, upravljati rezervacijama i otkrivati nove prilike za rast."
    },

    de: {
        heroTitle: "SPAREN SIE ZEIT.<br>BLEIBEN SIE ERREICHBAR.<br>WACHSEN SIE SCHNELLER.",
        heroText: "AVA hilft Unternehmen, Zeit zu sparen, rund um die Uhr verfügbar zu bleiben, Buchungen zu verwalten und neue Wachstumschancen zu entdecken."
    }

};


// =========================
// CHANGE LANGUAGE
// =========================

function changeLanguage(lang){

    const heroTitle = document.getElementById("hero-title");
    const heroText = document.getElementById("hero-text");

    if(heroTitle){
        heroTitle.innerHTML = translations[lang].heroTitle;
    }

    if(heroText){
        heroText.innerText = translations[lang].heroText;
    }

    localStorage.setItem("language", lang);

    updateLanguageFlag(lang);
}


// =========================
// FAQ ACCORDION
// =========================

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const answer = question.nextElementSibling;

        document.querySelectorAll(".faq-answer").forEach(item => {

            if (item !== answer) {
                item.style.display = "none";
            }

        });

        if (answer.style.display === "block") {
            answer.style.display = "none";
        } else {
            answer.style.display = "block";
        }

    });

});


// =========================
// LANGUAGE DROPDOWN
// =========================

const languageBtn = document.getElementById("languageBtn");
const languageMenu = document.getElementById("languageMenu");

if(languageBtn && languageMenu){

    languageBtn.addEventListener("click", function(e){
        e.stopPropagation();
        languageMenu.classList.toggle("show");
    });

    document.addEventListener("click", function(){
        languageMenu.classList.remove("show");
    });

}


// =========================
// LANGUAGE FLAG UPDATE
// =========================

function updateLanguageFlag(lang){

    if(!languageBtn) return;

    if(lang === "en"){
        languageBtn.innerHTML = '<img src="https://flagcdn.com/w40/gb.png" alt="English">';
    }

    if(lang === "sl"){
        languageBtn.innerHTML = '<img src="https://flagcdn.com/w40/si.png" alt="Slovenian">';
    }

    if(lang === "hr"){
        languageBtn.innerHTML = '<img src="https://flagcdn.com/w40/hr.png" alt="Croatian">';
    }

    if(lang === "de"){
        languageBtn.innerHTML = '<img src="https://flagcdn.com/w40/de.png" alt="German">';
    }

    if(languageMenu){
        languageMenu.classList.remove("show");
    }
}


// =========================
// LOAD SAVED LANGUAGE
// =========================

window.addEventListener("load", function(){

    const savedLanguage = localStorage.getItem("language") || "en";

    changeLanguage(savedLanguage);

});


// =========================
// SMOOTH NAVIGATION
// =========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// =========================
// CONSOLE MESSAGE
// =========================

console.log("AVA Website Loaded Successfully");


// =========================
// DEV MODE PASSWORD
// =========================

const DEV_PASSWORD = "AVA2026";

document.addEventListener("keydown", function(e){

    if(e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "b"){

        const password = prompt("Enter developer password:");

        if(password === DEV_PASSWORD){
            const devScreen = document.getElementById("dev-screen");

            if(devScreen){
                devScreen.style.display = "none";
            }

            localStorage.setItem("avaDevMode", "true");
        } else {
            alert("Wrong password");
        }
    }

});


// =========================
// KEEP WEBSITE UNLOCKED
// =========================

window.addEventListener("load", function(){

    if(localStorage.getItem("avaDevMode") === "true"){
        const devScreen = document.getElementById("dev-screen");

        if(devScreen){
            devScreen.style.display = "none";
        }
    }

});


// =========================
// SCROLL ANIMATIONS
// =========================

const animatedElements = document.querySelectorAll(
    ".step-card, .benefit-card, .pricing-card, .faq-item"
);

animatedElements.forEach(function(element){
    element.classList.add("scroll-animate");
});

const observer = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }

    });

}, {
    threshold:0.15
});

animatedElements.forEach(function(element){
    observer.observe(element);
});
// =========================
// CONTACT FORM - FORMSPREE
// =========================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    const contactAction = document.querySelector(".contact-action");
    const formContent = document.getElementById("contactFormContent");
    const successMessage = document.getElementById("contactSuccessMessage");
    const linesContainer = document.getElementById("contactLinesContainer");
    const submitButton = document.getElementById("contactSubmitButton");
    const sendAnotherButton = document.getElementById("sendAnotherMessage");

    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const originalButtonText = submitButton.textContent;
        const formData = new FormData(contactForm);

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Form submission failed.");
            }

            startContactSuccessAnimation();

        } catch (error) {
            console.error("Contact form error:", error);

            alert(
                "Something went wrong. Please check your internet connection and try again."
            );

            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });

    if (sendAnotherButton) {
        sendAnotherButton.addEventListener("click", function () {
            resetContactForm();
        });
    }

    function startContactSuccessAnimation() {
        contactAction.classList.add("message-prepared");

        formContent.classList.add("is-fading-out");

        createAnimatedLines();

        // Change from form to success message while lines cover the card
        setTimeout(function () {
            formContent.classList.add("is-hidden");

            successMessage.classList.add("is-visible");

            contactForm.reset();
        }, 750);

        // Remove lines after the animation finishes
        setTimeout(function () {
            linesContainer.innerHTML = "";
        }, 2600);
    }

    function createAnimatedLines() {
        linesContainer.innerHTML = "";

        const numberOfLines = 15;

        for (let i = 0; i < numberOfLines; i++) {
            const line = document.createElement("div");

            line.classList.add("contact-blue-line");

            const topPosition = Math.random() * 90 + 5;
            const lineHeight = Math.random() * 5 + 2;
            const delay = Math.random() * 0.55;
            const speed = 1 + Math.random() * 0.45;

            line.style.top = `${topPosition}%`;
            line.style.height = `${lineHeight}px`;
            line.style.setProperty("--line-delay", `${delay}s`);
            line.style.setProperty("--line-speed", `${speed}s`);

            linesContainer.appendChild(line);
        }
    }

    function resetContactForm() {
        linesContainer.innerHTML = "";

        contactAction.classList.remove("message-prepared");

        successMessage.classList.remove("is-visible");

        formContent.classList.remove("is-hidden");
        formContent.classList.remove("is-fading-out");

        submitButton.disabled = false;
        submitButton.textContent = "Send Message";

        document.getElementById("contactName").focus();
    }
}
// =========================
// HOW IT WORKS MODAL
// =========================

const howStepCards = document.querySelectorAll(".step-card");
const howModalOverlay = document.getElementById("howModalOverlay");
const howModal = document.getElementById("howModal");
const howModalClose = document.getElementById("howModalClose");

const howStepLabel = document.getElementById("howStepLabel");
const howModalTitle = document.getElementById("howModalTitle");
const howModalIntro = document.getElementById("howModalIntro");
const howModalIcon = document.getElementById("howModalIcon");
const howModalList = document.getElementById("howModalList");

const howHighlightTitle = document.getElementById(
    "howHighlightTitle"
);

const howHighlightText = document.getElementById(
    "howHighlightText"
);

const visualWindowTitle = document.getElementById(
    "visualWindowTitle"
);

const howVisualPlaceholder = document.getElementById(
    "howVisualPlaceholder"
);

const howProgress = document.getElementById("howProgress");
const howPrevious = document.getElementById("howPrevious");
const howNext = document.getElementById("howNext");

const howModalContent = document.querySelector(
    ".how-modal-content"
);

let currentHowStep = 0;
let lastOpenedCard = null;


// =========================
// MODAL CONTENT
// =========================

const howSteps = [

    {
        label: "STEP 1",
        title: "Connect Your Business",
        icon: "fas fa-link",

        intro:
            "Tell AVA about your business in a few simple steps. " +
            "The more details you provide, the better AVA can help " +
            "your customers.",

        items: [
            {
                title: "Add your business information",
                text:
                    "Add your business name, location, description " +
                    "and important customer information."
            },
            {
                title: "Set your services and availability",
                text:
                    "Define your services, opening hours, " +
                    "availability and holiday schedule."
            },
            {
                title: "Connect phone, email and calendar",
                text:
                    "Connect your communication channels for " +
                    "real-time customer support and booking updates."
            },
            {
                title: "Customize how AVA communicates",
                text:
                    "Choose the languages, tone and preferences " +
                    "that best represent your business."
            }
        ],

        highlightTitle: "Ready in under 10 minutes",

        highlightText:
            "Once connected, AVA can begin answering questions, " +
            "replying to messages and managing bookings.",

        visualTitle: "Connection overview",

        visualMainTitle: "Connect your business channels",

        visualMainText:
            "Bring your phone, email, calendar and business " +
            "information together in one place.",

        visualCards: [
            {
                icon: "fas fa-phone",
                text: "Phone connected"
            },
            {
                icon: "fas fa-envelope",
                text: "Email connected"
            },
            {
                icon: "fas fa-calendar-check",
                text: "Calendar connected"
            },
            {
                icon: "fas fa-building",
                text: "Business information"
            }
        ]
    },

    {
        label: "STEP 2",
        title: "Teach AVA",
        icon: "fas fa-brain",

        intro:
            "AVA learns how your business works, what you offer " +
            "and how you want customers to be supported.",

        items: [
            {
                title: "Add services, prices and policies",
                text:
                    "Teach AVA what your business provides and " +
                    "which rules customers should know."
            },
            {
                title: "Provide common questions and answers",
                text:
                    "Add frequently asked questions so AVA can " +
                    "respond consistently and accurately."
            },
            {
                title: "Define your booking rules",
                text:
                    "Set booking duration, availability, limits " +
                    "and cancellation requirements."
            },
            {
                title: "Choose AVA's communication style",
                text:
                    "Decide whether AVA should sound formal, " +
                    "friendly, concise or more conversational."
            }
        ],

        highlightTitle: "AVA adapts to your business",

        highlightText:
            "Your settings help AVA provide answers that match " +
            "your services and customer expectations.",

        visualTitle: "AVA knowledge setup",

        visualMainTitle: "Teach AVA what matters",

        visualMainText:
            "Organize your services, prices, policies and answers " +
            "into a clear business knowledge base.",

        visualCards: [
            {
                icon: "fas fa-list-check",
                text: "Services learned"
            },
            {
                icon: "fas fa-tags",
                text: "Prices added"
            },
            {
                icon: "fas fa-circle-question",
                text: "FAQs prepared"
            },
            {
                icon: "fas fa-language",
                text: "Languages selected"
            }
        ]
    },

    {
        label: "STEP 3",
        title: "Assist Customers",
        icon: "fas fa-comments",

        intro:
            "AVA communicates with customers across your connected " +
            "channels and handles repetitive administrative work.",

        items: [
            {
                title: "Answer calls and customer questions",
                text:
                    "Provide fast answers about services, prices, " +
                    "availability and business information."
            },
            {
                title: "Reply to emails and messages",
                text:
                    "Respond to common inquiries without making " +
                    "customers wait for a staff member."
            },
            {
                title: "Manage bookings",
                text:
                    "Create, update and organize bookings using " +
                    "your availability and business rules."
            },
            {
                title: "Transfer important conversations",
                text:
                    "Send complex or sensitive requests to a " +
                    "member of your team when human help is needed."
            }
        ],

        highlightTitle: "Customer support around the clock",

        highlightText:
            "AVA helps your business remain available even when " +
            "your staff are busy or your business is closed.",

        visualTitle: "Live customer assistance",

        visualMainTitle: "AVA is supporting customers",

        visualMainText:
            "Calls, messages and booking requests can be managed " +
            "from one connected system.",

        visualCards: [
            {
                icon: "fas fa-phone-volume",
                text: "Answering calls"
            },
            {
                icon: "fas fa-reply",
                text: "Replying to emails"
            },
            {
                icon: "fas fa-calendar-plus",
                text: "Creating bookings"
            },
            {
                icon: "fas fa-headset",
                text: "Transferring requests"
            }
        ]
    },

    {
        label: "STEP 4",
        title: "Grow With Insights",
        icon: "fas fa-chart-line",

        intro:
            "AVA turns customer conversations and booking activity " +
            "into useful information for your business.",

        items: [
            {
                title: "Discover common customer requests",
                text:
                    "See which questions, services and products " +
                    "customers ask about most often."
            },
            {
                title: "Find missed opportunities",
                text:
                    "Identify services customers want that your " +
                    "business may not currently provide."
            },
            {
                title: "Review business trends",
                text:
                    "Understand changes in booking demand, " +
                    "communication volume and customer interest."
            },
            {
                title: "Recognize loyal customers",
                text:
                    "See which customers visit most often and " +
                    "create opportunities to reward their loyalty."
            }
        ],

        highlightTitle: "Make better decisions with real data",

        highlightText:
            "Clear insights help you improve customer service, " +
            "plan resources and discover growth opportunities.",

        visualTitle: "Business insights",

        visualMainTitle: "Understand your customers",

        visualMainText:
            "View useful patterns from customer inquiries, " +
            "bookings and business activity.",

        visualCards: [
            {
                icon: "fas fa-arrow-trend-up",
                text: "Booking trends"
            },
            {
                icon: "fas fa-users",
                text: "Loyal customers"
            },
            {
                icon: "fas fa-lightbulb",
                text: "New opportunities"
            },
            {
                icon: "fas fa-chart-pie",
                text: "Monthly reports"
            }
        ]
    }

];


// =========================
// BUILD PROGRESS DOTS
// =========================

function createHowProgressDots() {

    if (!howProgress) return;

    howProgress.innerHTML = "";

    howSteps.forEach(function (step, index) {

        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = "progress-dot";
        dot.setAttribute(
            "aria-label",
            `Open ${step.title}`
        );

        dot.addEventListener("click", function () {
            changeHowStep(index);
        });

        howProgress.appendChild(dot);
    });
}


// =========================
// CREATE VISUAL PLACEHOLDER
// =========================

function createHowVisual(step) {

    if (!howVisualPlaceholder) return;

    howVisualPlaceholder.innerHTML = "";

    const mainCard = document.createElement("div");
    mainCard.className = "visual-main-card";

    const mainTitle = document.createElement("h4");
    mainTitle.textContent = step.visualMainTitle;

    const mainText = document.createElement("p");
    mainText.textContent = step.visualMainText;

    mainCard.appendChild(mainTitle);
    mainCard.appendChild(mainText);

    const miniGrid = document.createElement("div");
    miniGrid.className = "visual-mini-grid";

    step.visualCards.forEach(function (visualCard) {

        const miniCard = document.createElement("div");
        miniCard.className = "visual-mini-card";

        const icon = document.createElement("i");
        icon.className = visualCard.icon;

        const text = document.createElement("span");
        text.textContent = visualCard.text;

        miniCard.appendChild(icon);
        miniCard.appendChild(text);

        miniGrid.appendChild(miniCard);
    });

    howVisualPlaceholder.appendChild(mainCard);
    howVisualPlaceholder.appendChild(miniGrid);
}


// =========================
// DISPLAY STEP
// =========================

function displayHowStep(index) {

    const step = howSteps[index];

    currentHowStep = index;

    howStepLabel.textContent = step.label;
    howModalTitle.textContent = step.title;
    howModalIntro.textContent = step.intro;

    howModalIcon.innerHTML =
        `<i class="${step.icon}"></i>`;

    howHighlightTitle.textContent =
        step.highlightTitle;

    howHighlightText.textContent =
        step.highlightText;

    visualWindowTitle.textContent =
        step.visualTitle;

    howModalList.innerHTML = "";

    step.items.forEach(function (item) {

        const listItem = document.createElement("div");
        listItem.className = "how-list-item";

        listItem.innerHTML = `
            <div class="how-list-check">
                <i class="fas fa-check"></i>
            </div>

            <div>
                <strong>${item.title}</strong>
                <p>${item.text}</p>
            </div>
        `;

        howModalList.appendChild(listItem);
    });

    createHowVisual(step);
    updateHowProgress();
    updateHowNavigation();
}


// =========================
// CHANGE STEP WITH ANIMATION
// =========================

function changeHowStep(index) {

    if (
        index < 0 ||
        index >= howSteps.length ||
        index === currentHowStep
    ) {
        return;
    }

    howModalContent.classList.add("is-changing");

    window.setTimeout(function () {

        displayHowStep(index);

        howModalContent.classList.remove("is-changing");

    }, 180);
}


// =========================
// UPDATE PROGRESS
// =========================

function updateHowProgress() {

    const dots = howProgress.querySelectorAll(
        ".progress-dot"
    );

    dots.forEach(function (dot, index) {

        dot.classList.toggle(
            "is-active",
            index === currentHowStep
        );
    });
}


// =========================
// UPDATE BUTTONS
// =========================

function updateHowNavigation() {

    howPrevious.disabled = currentHowStep === 0;

    if (currentHowStep === howSteps.length - 1) {

        howNext.innerHTML = `
            Close
            <i class="fas fa-check"></i>
        `;

    } else {

        const nextTitle =
            howSteps[currentHowStep + 1].title
                .replace(" Your Business", "")
                .replace(" Customers", "")
                .replace(" With Insights", "");

        howNext.innerHTML = `
            Next: ${nextTitle}
            <i class="fas fa-arrow-right"></i>
        `;
    }
}


// =========================
// OPEN MODAL
// =========================

function openHowModal(index, selectedCard) {

    currentHowStep = index;
    lastOpenedCard = selectedCard;

    selectedCard.classList.add("is-opening");

    displayHowStep(index);

    window.setTimeout(function () {

        howModalOverlay.classList.add("is-visible");

        howModalOverlay.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add("modal-open");

        howModalClose.focus();

    }, 180);
}


// =========================
// CLOSE MODAL
// =========================

function closeHowModal() {

    howModalOverlay.classList.remove("is-visible");

    howModalOverlay.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove("modal-open");

    window.setTimeout(function () {

        if (lastOpenedCard) {
            lastOpenedCard.classList.remove(
                "is-opening"
            );

            lastOpenedCard.focus();
        }

    }, 250);
}


// =========================
// CARD EVENTS
// =========================

howStepCards.forEach(function (card) {

    card.addEventListener("click", function () {

        const stepIndex = Number(
            card.dataset.step
        );

        openHowModal(stepIndex, card);
    });
});


// =========================
// MODAL EVENTS
// =========================

if (
    howModalOverlay &&
    howModalClose &&
    howPrevious &&
    howNext
) {

    createHowProgressDots();

    howModalClose.addEventListener(
        "click",
        closeHowModal
    );

    howPrevious.addEventListener(
        "click",
        function () {

            changeHowStep(currentHowStep - 1);
        }
    );

    howNext.addEventListener(
        "click",
        function () {

            if (
                currentHowStep ===
                howSteps.length - 1
            ) {
                closeHowModal();
                return;
            }

            changeHowStep(currentHowStep + 1);
        }
    );

    howModalOverlay.addEventListener(
        "click",
        function (event) {

            if (event.target === howModalOverlay) {
                closeHowModal();
            }
        }
    );

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                howModalOverlay.classList.contains(
                    "is-visible"
                )
            ) {
                closeHowModal();
            }

            if (
                event.key === "ArrowRight" &&
                howModalOverlay.classList.contains(
                    "is-visible"
                ) &&
                currentHowStep < howSteps.length - 1
            ) {
                changeHowStep(currentHowStep + 1);
            }

            if (
                event.key === "ArrowLeft" &&
                howModalOverlay.classList.contains(
                    "is-visible"
                ) &&
                currentHowStep > 0
            ) {
                changeHowStep(currentHowStep - 1);
            }
        }
    );
}
