const translations = {

  en: {
    title: "AI Receptionist for Restaurants",
    text: "Never miss a reservation again."
  },

  sl: {
    title: "AI receptor za restavracije",
    text: "Nikoli več ne zamudite rezervacije."
  },

  hr: {
    title: "AI recepcionar za restorane",
    text: "Nikada više ne propustite rezervaciju."
  },

  de: {
    title: "KI-Rezeptionist für Restaurants",
    text: "Verpassen Sie nie wieder eine Reservierung."
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
