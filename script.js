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

const faqItems = document.querySelectorAll(".faq-item");

function closeFaqItem(item) {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    item.classList.remove("active");
    question.setAttribute("aria-expanded", "false");
    answer.style.maxHeight = null;
}

function openFaqItem(item) {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    item.classList.add("active");
    question.setAttribute("aria-expanded", "true");
    answer.style.maxHeight = answer.scrollHeight + "px";
}

faqItems.forEach(function (item) {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", function () {
        const wasOpen = item.classList.contains("active");

        faqItems.forEach(function (otherItem) {
            closeFaqItem(otherItem);
        });

        if (!wasOpen) {
            openFaqItem(item);
        }
    });
});

/* Open the first question automatically */

if (faqItems.length > 0) {
    openFaqItem(faqItems[0]);
}


/* Recalculate the open answer after screen resizing */

window.addEventListener("resize", function () {
    const activeItem = document.querySelector(".faq-item.active");

    if (!activeItem) return;

    const activeAnswer =
        activeItem.querySelector(".faq-answer");

    activeAnswer.style.maxHeight =
        activeAnswer.scrollHeight + "px";
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
// DEVELOPMENT SCREEN
// =========================

const DEV_PASSWORD = "AVA2026";

document.addEventListener("DOMContentLoaded", function () {

    const devScreen =
        document.getElementById("dev-screen");

    if (!devScreen) return;

    /*
       Remove the old saved unlock value from
       the previous development-screen version.
    */

    localStorage.removeItem("avaDevMode");

    /*
       Keep the website unlocked while the current
       browser tab remains open.
    */

    if (
        sessionStorage.getItem("avaDevPreview") === "true"
    ) {
        devScreen.classList.add("is-unlocked");
    }


    document.addEventListener("keydown", function (event) {

        /*
           Ctrl + Shift + B opens the password prompt.
        */

        if (
            event.ctrlKey &&
            event.shiftKey &&
            event.key.toLowerCase() === "b"
        ) {
            event.preventDefault();

            const password = prompt(
                "Enter AVA developer password:"
            );

            if (password === DEV_PASSWORD) {

                sessionStorage.setItem(
                    "avaDevPreview",
                    "true"
                );

                devScreen.classList.add(
                    "is-unlocked"
                );

            } else if (password !== null) {

                alert("Wrong password");
            }
        }
    });

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
// =========================
// WHY AVA MODAL
// =========================

document.addEventListener("DOMContentLoaded", function () {

    const benefitCards =
        document.querySelectorAll(".why-benefit-card");

    const modalOverlay =
        document.getElementById("whyModalOverlay");

    const modal =
        document.getElementById("whyModal");

    const modalClose =
        document.getElementById("whyModalClose");

    const benefitLabel =
        document.getElementById("whyBenefitLabel");

    const modalTitle =
        document.getElementById("whyModalTitle");

    const modalIcon =
        document.getElementById("whyModalIcon");

    const modalIntro =
        document.getElementById("whyModalIntro");

    const modalList =
        document.getElementById("whyModalList");

    const highlightTitle =
        document.getElementById("whyHighlightTitle");

    const highlightText =
        document.getElementById("whyHighlightText");

    const visualTitle =
        document.getElementById("whyVisualTitle");

    const visualContent =
        document.getElementById("whyVisualContent");

    const progressContainer =
        document.getElementById("whyProgress");

    const previousButton =
        document.getElementById("whyPrevious");

    const nextButton =
        document.getElementById("whyNext");

    const modalContent =
        document.querySelector(".why-modal-content");

    const supportedLanguagesButton =
        document.getElementById(
            "supportedLanguagesButton"
        );

    const languageDrawer =
        document.getElementById("languageDrawer");

    const languageDrawerClose =
        document.getElementById(
            "languageDrawerClose"
        );

    const languageDrawerScrim =
        document.getElementById(
            "languageDrawerScrim"
        );


    let currentBenefit = 0;
    let lastOpenedCard = null;


    const benefits = [

        {
            label: "BENEFIT 1",
            title: "Saves Time",
            icon: "fas fa-clock",

            intro:
                "AVA handles repetitive administrative work so your team " +
                "can spend more time serving customers and growing the business.",

            items: [
                {
                    title: "Automate repeated customer questions",
                    text:
                        "AVA answers common questions about services, " +
                        "prices, availability and opening hours."
                },
                {
                    title: "Reduce interruptions",
                    text:
                        "Your employees can focus on customers instead " +
                        "of constantly stopping to answer calls and emails."
                },
                {
                    title: "Handle bookings automatically",
                    text:
                        "AVA can collect booking details and organize " +
                        "appointments using your availability."
                },
                {
                    title: "Keep everything organized",
                    text:
                        "Customer requests, messages and bookings remain " +
                        "available in one connected system."
                }
            ],

            highlightTitle:
                "More time for important work",

            highlightText:
                "AVA takes care of repetitive tasks while your team " +
                "focuses on customers and business growth.",

            visualTitle:
                "Time-saving automation",

            visualMainTitle:
                "Your daily work, simplified",

            visualMainText:
                "Calls, emails, questions and bookings can be managed " +
                "without repeatedly interrupting your staff.",

            visualCards: [
                {
                    icon: "fas fa-phone",
                    text: "Calls handled"
                },
                {
                    icon: "fas fa-envelope",
                    text: "Emails answered"
                },
                {
                    icon: "fas fa-calendar-check",
                    text: "Bookings managed"
                },
                {
                    icon: "fas fa-hourglass-half",
                    text: "Time saved"
                }
            ]
        },


        {
            label: "BENEFIT 2",
            title: "Multi-Language Support",
            icon: "fas fa-globe",

            intro:
                "AVA helps businesses communicate with customers in " +
                "the language they understand and feel most comfortable using.",

            items: [
                {
                    title: "Reach more customers",
                    text:
                        "Allow customers to communicate without language " +
                        "barriers or unnecessary misunderstandings."
                },
                {
                    title: "Improve customer satisfaction",
                    text:
                        "Customers receive clearer and more natural " +
                        "answers in their preferred language."
                },
                {
                    title: "Support international customers",
                    text:
                        "AVA can help businesses serve visitors and " +
                        "customers from different countries."
                },
                {
                    title: "Use different languages by channel",
                    text:
                        "Text communication can offer broader language " +
                        "coverage than voice calls."
                }
            ],

            highlightTitle:
                "Communicate more naturally",

            highlightText:
                "Give more customers the confidence to contact your " +
                "business in a language they understand.",

            visualTitle:
                "Language support",

            visualMainTitle:
                "Connect with more customers",

            visualMainText:
                "Use multilingual email, chat and voice support to " +
                "create a more accessible customer experience.",

            visualCards: [
                {
                    icon: "fas fa-comments",
                    text: "Multilingual chat"
                },
                {
                    icon: "fas fa-envelope",
                    text: "Multilingual email"
                },
                {
                    icon: "fas fa-phone",
                    text: "Voice languages"
                },
                {
                    icon: "fas fa-language",
                    text: "Natural responses"
                }
            ],

            showLanguages: true
        },


        {
            label: "BENEFIT 3",
            title: "Available 24/7",
            icon: "fas fa-headset",

            intro:
                "AVA remains available outside normal working hours, " +
                "during busy periods and whenever your staff cannot respond.",

            items: [
                {
                    title: "Support customers after closing",
                    text:
                        "Customers can still receive information and " +
                        "request bookings outside your opening hours."
                },
                {
                    title: "Handle busy periods",
                    text:
                        "AVA can respond when your employees are already " +
                        "helping other customers."
                },
                {
                    title: "Reduce missed opportunities",
                    text:
                        "Fewer customer calls and messages are left " +
                        "unanswered."
                },
                {
                    title: "Provide consistent availability",
                    text:
                        "Customers know they can contact your business " +
                        "when they need help."
                }
            ],

            highlightTitle:
                "Your business remains available",

            highlightText:
                "AVA helps customers even when your staff are busy, " +
                "unavailable or outside normal working hours.",

            visualTitle:
                "Always available",

            visualMainTitle:
                "Customer support around the clock",

            visualMainText:
                "AVA can continue responding to inquiries and collecting " +
                "booking requests throughout the day.",

            visualCards: [
                {
                    icon: "fas fa-moon",
                    text: "After-hours support"
                },
                {
                    icon: "fas fa-bolt",
                    text: "Fast responses"
                },
                {
                    icon: "fas fa-phone-volume",
                    text: "Fewer missed calls"
                },
                {
                    icon: "fas fa-calendar-day",
                    text: "Daily availability"
                }
            ]
        },


        {
            label: "BENEFIT 4",
            title: "Insights & Reports",
            icon: "fas fa-chart-column",

            intro:
                "AVA turns customer conversations and booking activity " +
                "into useful information that can support better decisions.",

            items: [
                {
                    title: "Understand customer demand",
                    text:
                        "See which products, services and appointment " +
                        "times customers request most often."
                },
                {
                    title: "Discover new opportunities",
                    text:
                        "Identify requests for services your business " +
                        "does not currently offer."
                },
                {
                    title: "Review communication trends",
                    text:
                        "Understand how frequently customers contact your " +
                        "business and what they need."
                },
                {
                    title: "Recognize loyal customers",
                    text:
                        "See which customers return most often and create " +
                        "opportunities to reward their loyalty."
                }
            ],

            highlightTitle:
                "Turn conversations into useful information",

            highlightText:
                "Use real customer activity to improve your services " +
                "and identify new growth opportunities.",

            visualTitle:
                "Business analytics",

            visualMainTitle:
                "Understand what customers want",

            visualMainText:
                "Track customer interests, booking activity and " +
                "communication trends from one dashboard.",

            visualCards: [
                {
                    icon: "fas fa-chart-line",
                    text: "Booking trends"
                },
                {
                    icon: "fas fa-users",
                    text: "Loyal customers"
                },
                {
                    icon: "fas fa-lightbulb",
                    text: "Opportunities"
                },
                {
                    icon: "fas fa-file-lines",
                    text: "Monthly reports"
                }
            ]
        },


        {
            label: "BENEFIT 5",
            title: "Smart Bookings",
            icon: "fas fa-calendar-check",

            intro:
                "AVA helps organize appointments using your services, " +
                "availability, booking rules and customer information.",

            items: [
                {
                    title: "Reduce double bookings",
                    text:
                        "AVA checks availability before confirming a new " +
                        "appointment."
                },
                {
                    title: "Apply your booking rules",
                    text:
                        "Use service duration, working hours and required " +
                        "breaks when organizing appointments."
                },
                {
                    title: "Allow manual staff bookings",
                    text:
                        "Employees can still add or update appointments " +
                        "when necessary."
                },
                {
                    title: "Keep customers informed",
                    text:
                        "Booking details and changes can be communicated " +
                        "clearly to customers."
                }
            ],

            highlightTitle:
                "A more organized booking process",

            highlightText:
                "Keep appointments accurate, visible and easier for " +
                "both customers and employees to manage.",

            visualTitle:
                "Booking management",

            visualMainTitle:
                "Appointments in one place",

            visualMainText:
                "AVA uses your calendar and booking rules to organize " +
                "customer appointments more accurately.",

            visualCards: [
                {
                    icon: "fas fa-calendar-plus",
                    text: "New bookings"
                },
                {
                    icon: "fas fa-clock",
                    text: "Availability checks"
                },
                {
                    icon: "fas fa-ban",
                    text: "Conflict prevention"
                },
                {
                    icon: "fas fa-pen",
                    text: "Manual updates"
                }
            ]
        },


        {
            label: "BENEFIT 6",
            title: "Secure & Reliable",
            icon: "fas fa-shield-halved",

            intro:
                "AVA is designed to keep customer and business information " +
                "organized while giving businesses control over how it is used.",

            items: [
                {
                    title: "Controlled access",
                    text:
                        "Only authorized employees should be able to view " +
                        "important customer and business information."
                },
                {
                    title: "Clear data permissions",
                    text:
                        "Businesses can define which information AVA may " +
                        "access and use."
                },
                {
                    title: "Human review when necessary",
                    text:
                        "Sensitive or unusual situations can be transferred " +
                        "to a member of staff."
                },
                {
                    title: "Reliable customer communication",
                    text:
                        "AVA follows your approved services, policies and " +
                        "communication preferences."
                }
            ],

            highlightTitle:
                "Your business remains in control",

            highlightText:
                "AVA supports your team while important decisions and " +
                "business rules remain under human control.",

            visualTitle:
                "Security and control",

            visualMainTitle:
                "Designed around your business rules",

            visualMainText:
                "Control access, communication settings and when a human " +
                "employee should take over.",

            visualCards: [
                {
                    icon: "fas fa-lock",
                    text: "Protected access"
                },
                {
                    icon: "fas fa-user-shield",
                    text: "Staff permissions"
                },
                {
                    icon: "fas fa-sliders",
                    text: "Business controls"
                },
                {
                    icon: "fas fa-hand",
                    text: "Human handover"
                }
            ]
        }

    ];


    function createProgressDots() {

        progressContainer.innerHTML = "";

        benefits.forEach(function (benefit, index) {

            const dot = document.createElement("button");

            dot.type = "button";
            dot.className = "why-progress-dot";

            dot.setAttribute(
                "aria-label",
                `Open ${benefit.title}`
            );

            dot.addEventListener("click", function () {
                changeBenefit(index);
            });

            progressContainer.appendChild(dot);
        });
    }


    function createVisual(benefit) {

        visualContent.innerHTML = "";

        const mainCard =
            document.createElement("div");

        mainCard.className =
            "why-visual-main-card";

        mainCard.innerHTML = `
            <h4>${benefit.visualMainTitle}</h4>
            <p>${benefit.visualMainText}</p>
        `;


        const miniGrid =
            document.createElement("div");

        miniGrid.className =
            "why-visual-mini-grid";


        benefit.visualCards.forEach(function (card) {

            const miniCard =
                document.createElement("div");

            miniCard.className =
                "why-visual-mini-card";

            miniCard.innerHTML = `
                <i class="${card.icon}"></i>
                <span>${card.text}</span>
            `;

            miniGrid.appendChild(miniCard);
        });


        visualContent.appendChild(mainCard);
        visualContent.appendChild(miniGrid);
    }


    function displayBenefit(index) {

        const benefit = benefits[index];

        currentBenefit = index;

        benefitLabel.textContent =
            benefit.label;

        modalTitle.textContent =
            benefit.title;

        modalIcon.innerHTML =
            `<i class="${benefit.icon}"></i>`;

        modalIntro.textContent =
            benefit.intro;

        highlightTitle.textContent =
            benefit.highlightTitle;

        highlightText.textContent =
            benefit.highlightText;

        visualTitle.textContent =
            benefit.visualTitle;


        modalList.innerHTML = "";

        benefit.items.forEach(function (item) {

            const listItem =
                document.createElement("div");

            listItem.className =
                "why-list-item";

            listItem.innerHTML = `
                <div class="why-list-check">
                    <i class="fas fa-check"></i>
                </div>

                <div>
                    <strong>${item.title}</strong>
                    <p>${item.text}</p>
                </div>
            `;

            modalList.appendChild(listItem);
        });


        supportedLanguagesButton.hidden =
            !benefit.showLanguages;


        createVisual(benefit);
        updateProgress();
        updateNavigation();
    }


    function changeBenefit(index) {

        if (
            index < 0 ||
            index >= benefits.length ||
            index === currentBenefit
        ) {
            return;
        }

        closeLanguageDrawer();

        modalContent.classList.add(
            "is-changing"
        );

        window.setTimeout(function () {

            displayBenefit(index);

            modalContent.classList.remove(
                "is-changing"
            );

        }, 180);
    }


    function updateProgress() {

        const dots =
            progressContainer.querySelectorAll(
                ".why-progress-dot"
            );

        dots.forEach(function (dot, index) {

            dot.classList.toggle(
                "is-active",
                index === currentBenefit
            );
        });
    }


    function updateNavigation() {

        previousButton.disabled =
            currentBenefit === 0;

        if (
            currentBenefit ===
            benefits.length - 1
        ) {

            nextButton.innerHTML = `
                Close
                <i class="fas fa-check"></i>
            `;

        } else {

            const nextTitle =
                benefits[currentBenefit + 1].title;

            nextButton.innerHTML = `
                Next: ${nextTitle}
                <i class="fas fa-arrow-right"></i>
            `;
        }
    }


    function openModal(index, selectedCard) {

        currentBenefit = index;
        lastOpenedCard = selectedCard;

        selectedCard.classList.add(
            "is-opening"
        );

        displayBenefit(index);

        window.setTimeout(function () {

            modalOverlay.classList.add(
                "is-visible"
            );

            modalOverlay.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.classList.add(
                "why-modal-open"
            );

            modalClose.focus();

        }, 180);
    }


    function closeModal() {

        closeLanguageDrawer();

        modalOverlay.classList.remove(
            "is-visible"
        );

        modalOverlay.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "why-modal-open"
        );

        window.setTimeout(function () {

            if (lastOpenedCard) {

                lastOpenedCard.classList.remove(
                    "is-opening"
                );

                lastOpenedCard.focus();
            }

        }, 280);
    }


    function openLanguageDrawer() {

        languageDrawer.classList.add(
            "is-open"
        );

        languageDrawerScrim.classList.add(
            "is-visible"
        );

        languageDrawer.setAttribute(
            "aria-hidden",
            "false"
        );

        window.setTimeout(function () {
            languageDrawerClose.focus();
        }, 200);
    }


    function closeLanguageDrawer() {

        languageDrawer.classList.remove(
            "is-open"
        );

        languageDrawerScrim.classList.remove(
            "is-visible"
        );

        languageDrawer.setAttribute(
            "aria-hidden",
            "true"
        );
    }


    benefitCards.forEach(function (card) {

        card.addEventListener("click", function () {

            const benefitIndex =
                Number(card.dataset.benefit);

            openModal(benefitIndex, card);
        });
    });


    createProgressDots();


    modalClose.addEventListener(
        "click",
        closeModal
    );


    previousButton.addEventListener(
        "click",
        function () {

            changeBenefit(
                currentBenefit - 1
            );
        }
    );


    nextButton.addEventListener(
        "click",
        function () {

            if (
                currentBenefit ===
                benefits.length - 1
            ) {
                closeModal();
                return;
            }

            changeBenefit(
                currentBenefit + 1
            );
        }
    );


    supportedLanguagesButton.addEventListener(
        "click",
        openLanguageDrawer
    );


    languageDrawerClose.addEventListener(
        "click",
        closeLanguageDrawer
    );


    languageDrawerScrim.addEventListener(
        "click",
        closeLanguageDrawer
    );


    modalOverlay.addEventListener(
        "click",
        function (event) {

            if (
                event.target === modalOverlay &&
                !languageDrawer.classList.contains(
                    "is-open"
                )
            ) {
                closeModal();
            }
        }
    );


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                languageDrawer.classList.contains(
                    "is-open"
                )
            ) {
                closeLanguageDrawer();
                return;
            }

            if (
                event.key === "Escape" &&
                modalOverlay.classList.contains(
                    "is-visible"
                )
            ) {
                closeModal();
            }

            if (
                event.key === "ArrowRight" &&
                modalOverlay.classList.contains(
                    "is-visible"
                ) &&
                !languageDrawer.classList.contains(
                    "is-open"
                ) &&
                currentBenefit < benefits.length - 1
            ) {
                changeBenefit(
                    currentBenefit + 1
                );
            }

            if (
                event.key === "ArrowLeft" &&
                modalOverlay.classList.contains(
                    "is-visible"
                ) &&
                !languageDrawer.classList.contains(
                    "is-open"
                ) &&
                currentBenefit > 0
            ) {
                changeBenefit(
                    currentBenefit - 1
                );
            }
        }
    );

});
// =========================
// MOBILE NAVIGATION
// =========================

document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const navbar =
        document.querySelector(".navbar");

    const navigationLinks =
        document.querySelectorAll(".nav-links a");

    if (!mobileMenuButton || !navbar) return;

    mobileMenuButton.addEventListener("click", function () {
        const menuIsOpen =
            navbar.classList.toggle("nav-open");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            String(menuIsOpen)
        );

        mobileMenuButton.setAttribute(
            "aria-label",
            menuIsOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );
    });

    navigationLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            navbar.classList.remove("nav-open");

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            mobileMenuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        });
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 760) {
            navbar.classList.remove("nav-open");

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    });
});
