
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

const languageBtn =
document.querySelector(".language-btn");

const languageMenu =
document.querySelector(".language-menu");

languageBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    languageMenu.classList.toggle("show");

});

document.addEventListener("click", () => {

    languageMenu.classList.remove("show");

});

// =========================
// LANGUAGE PLACEHOLDER
// =========================
// You can connect this later
// to your language translation system.

const languageLinks = document.querySelectorAll(".language-menu a");

languageLinks.forEach(link => {

    link.addEventListener("click", (e) => {

        e.preventDefault();

        const selectedLanguage = link.textContent;

        languageBtn.textContent = selectedLanguage + " ▼";

        languageMenu.style.display = "none";

        console.log("Selected language:", selectedLanguage);

        // Future:
        // changeLanguage('en')
        // changeLanguage('sl')
        // changeLanguage('hr')
        // changeLanguage('de')

    });

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
