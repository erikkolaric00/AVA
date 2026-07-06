
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

const DEV_PASSWORD = "AVA2026"; // change this password anytime

document.addEventListener("keydown", function(e){

    // Press CTRL + SHIFT + A to unlock dev mode
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

// Keep website unlocked after correct password
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
