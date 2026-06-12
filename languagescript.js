const translations = {

en: {
title: "AI Receptionist for Modern Businesses",
text: "AVA answers calls, manages bookings, and supports your customers 24/7."
},

sl: {
title: "AI receptor za sodobna podjetja",
text: "AVA sprejema klice, upravlja rezervacije in podpira vaše stranke 24/7."
},

hr: {
title: "AI recepcionar za moderna poslovanja",
text: "AVA odgovara na pozive, upravlja rezervacijama i podržava vaše klijente 24/7."
},

de: {
title: "KI-Rezeptionist für moderne Unternehmen",
text: "AVA beantwortet Anrufe, verwaltet Buchungen und unterstützt Ihre Kunden rund um die Uhr."
}

};

function changeLanguage(lang) {

document.getElementById("hero-title").innerText =
translations[lang].title;

document.getElementById("hero-text").innerText =
translations[lang].text;

localStorage.setItem("language", lang);
}

window.onload = () => {

const savedLanguage =
localStorage.getItem("language") || "en";

changeLanguage(savedLanguage);

};
