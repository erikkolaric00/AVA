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

    if(e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a"){

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
// CONTACT FORM
// =========================

const contactForm = document.getElementById("contactForm");

if(contactForm){

    contactForm.addEventListener("submit", function(e){
        e.preventDefault();

        const name = document.getElementById("contactName").value;
        const email = document.getElementById("contactEmail").value;
        const message = document.getElementById("contactMessage").value;

        const subject = encodeURIComponent("New AVA Website Inquiry");

        const body = encodeURIComponent(
            "Name: " + name + "\n" +
            "Email: " + email + "\n\n" +
            "Message:\n" + message
        );

        window.location.href =
            "mailto:avaerikk@gmail.com?subject=" + subject + "&body=" + body;
    });

}
