```javascript
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
```
