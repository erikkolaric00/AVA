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

