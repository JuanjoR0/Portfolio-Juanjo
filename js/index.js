// DESPLIEGUE IDIOMAS 
document.addEventListener("DOMContentLoaded", () => {

    const toggleBtn = document.getElementById("langToggle");
    const menu = document.getElementById("langMenu");
    const langOptions = document.querySelectorAll(".lang-option");

    let langMenuTimeout; // ⬅ temporizador para autocierre

    // ---- FUNCIONES DE APERTURA / CIERRE ----

    function openLangMenu() {
        menu.classList.add("open");

        // Reiniciar temporizador si ya existía
        clearTimeout(langMenuTimeout);

        // Autocerrar en 4 segundos
        langMenuTimeout = setTimeout(() => {
            menu.classList.remove("open");
        }, 4000);
    }

    function closeLangMenu() {
        menu.classList.remove("open");
        clearTimeout(langMenuTimeout);
    }

    // ---- ABRIR/CERRAR POR CLIC ----
    toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        if (menu.classList.contains("open")) {
            closeLangMenu();
        } else {
            openLangMenu();
        }
    });

    // ---- CERRAR AL HACER CLIC FUERA ----
    document.addEventListener("click", () => {
        closeLangMenu();
    });

    // Evitar que el clic dentro del menú lo cierre
    menu.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    // ---- CLICK EN ES/EN ----
    langOptions.forEach(btn => {
        btn.addEventListener("click", () => {

            const selectedLang = btn.dataset.lang;

            // Guardar selección
            localStorage.setItem("lang", selectedLang);

            // Cargar traducción sin recargar
            loadLanguage(selectedLang);

            // Actualizar botón activo
            document.querySelectorAll(".lang-option").forEach(opt => {
                opt.classList.toggle("active", opt.dataset.lang === selectedLang);
            });

            // Cerrar menú después de seleccionar
            closeLangMenu();
        });
    });

});



//CAMBIAR IDIOMA
let currentLang = "en";

// Cargar archivo JSON según el idioma
async function loadLanguage(lang) {
    const res = await fetch(`./lang/${lang}.json`);
    const translations = await res.json();
    applyTranslations(translations);
}

// Reemplazar textos en la página
function applyTranslations(translations) {
    document.querySelectorAll("[data-lang]").forEach(el => {
        const key = el.getAttribute("data-lang");
        if (translations[key]) {
            el.textContent = translations[key];
        }
    });
}

// Cambiar idioma desde botones EN / ES
document.addEventListener("click", e => {
    if (e.target.matches(".lang-option")) {
        const lang = e.target.dataset.lang;

        localStorage.setItem("lang", lang);
        currentLang = lang;
        loadLanguage(lang);
    }
});

// Auto detección al entrar
loadLanguage(currentLang);


//ANIMACION TITULO
const target = document.getElementById('typewriter');
const cursor = target.querySelector('.cursor');

// Texto dividido: parte normal + parte destacada
const text1 = 'Advanced Technician in ';
const text2 = 'Web Development';

let i = 0;
let phase = 1;

function typeWriter() {
  if (phase === 1) {
    if (i < text1.length) {
      target.insertBefore(document.createTextNode(text1.charAt(i)), cursor);
      i++;
      setTimeout(typeWriter, 70);
    } else {
      // Termina la primera parte, pasa a la segunda
      phase = 2;
      i = 0;
      setTimeout(typeWriter, 100);
    }
  } else if (phase === 2) {
    const span = document.createElement('span');
    span.className = 'highlight';
    target.insertBefore(span, cursor);

    function typeSecondPart() {
      if (i < text2.length) {
        span.textContent += text2.charAt(i);
        i++;
        setTimeout(typeSecondPart, 70);
      }
    }

    typeSecondPart();
  }
}

window.addEventListener('load', typeWriter);


//FUNCIONALIDAD SCROLL MENU
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120; // compensa el header fijo
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});


//CARROUSEL PROJECTS
document.querySelectorAll('.carousel').forEach(carousel => {
  const images = carousel.querySelectorAll('img');
  let index = 0;

  const showImage = (i) => {
    images.forEach((img, idx) => {
      img.classList.toggle('active', idx === i);
    });
  };

  carousel.querySelector('.prev').addEventListener('click', () => {
    index = (index - 1 + images.length) % images.length;
    showImage(index);
  });

  carousel.querySelector('.next').addEventListener('click', () => {
    index = (index + 1) % images.length;
    showImage(index);
  });

  showImage(index);
});


//FORMULARIO CONTACTO 
emailjs.init("uAfDY151cda4VoP_M");
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const successMsg = document.getElementById("success-message");

    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Evita recarga de página

      // Envía el formulario
      emailjs.sendForm('service_575ya6t', 'template_dnhd4j2', this)
        .then(() => {
          form.reset(); // Limpia el formulario
          successMsg.classList.remove("hidden"); // Muestra mensaje
        }, (error) => {
          console.error("Failed to send message:", error);
          alert("There was an error sending your message. Please try again.");
        });
    });
  });

  //COPY NUMBER 
  function copyPhoneNumber() {
    const phone = document.getElementById("phone-number").innerText;
    navigator.clipboard.writeText(phone).then(() => {
      alert("Número copiado al portapapeles");
    });
  }

//MENU HAMBURGUESA
const btn   = document.querySelector('.hamburger');
const menu  = document.querySelector('.nav-menu');
const shade = document.querySelector('.nav-backdrop');

function setOpen(open){
  menu.classList.toggle('is-open', open);
  btn.classList.toggle('is-open', open);
  shade.classList.toggle('is-open', open);
  btn.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
}

btn?.addEventListener('click', () => setOpen(!menu.classList.contains('is-open')));

shade?.addEventListener('click', () => setOpen(false));

/* Cierra al pulsar un enlace del menú y deja que el navegador haga scroll al ancla */
menu?.addEventListener('click', (e) => {
  if (e.target.matches('a')) setOpen(false);
});

/* Seguridad: cierra al cambiar tamaño (por si pasas a desktop) */
window.addEventListener('resize', () => {
  if (window.innerWidth > 480) setOpen(false);
});

