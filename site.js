const menuButton = document.querySelector(".menu-toggle");
const siteHeader = document.querySelector(".site-header");
const logoAlt = document.querySelector(".logo-alt");
const gritMenuButton = document.querySelector(".nav-submenu-toggle");
const gritMenuItem = document.querySelector(".nav-item-grit");
const navBackButton = document.querySelector(".nav-back");
const siteNav = document.querySelector(".site-nav");
const mobileNavQuery = window.matchMedia("(max-width: 850px)");

function closeGritMenu() {
  siteHeader?.classList.remove("nav-submenu-open");
  gritMenuItem?.classList.remove("is-dropdown-open");
  gritMenuButton?.setAttribute("aria-expanded", "false");
}

if (menuButton && siteHeader) {
  menuButton.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("nav-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));

    if (!isOpen) {
      closeGritMenu();
    }
  });
}

if (gritMenuButton && siteHeader) {
  gritMenuButton.addEventListener("click", () => {
    if (mobileNavQuery.matches) {
      siteHeader.classList.add("nav-submenu-open");
      gritMenuButton.setAttribute("aria-expanded", "true");
      return;
    }

    const isOpen = gritMenuItem?.classList.toggle("is-dropdown-open") || false;
    gritMenuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

if (navBackButton) {
  navBackButton.addEventListener("click", closeGritMenu);
}

if (siteNav) {
  siteNav.addEventListener("click", (event) => {
    const link = event.target.closest("a");

    if (!link) {
      return;
    }

    closeGritMenu();
    siteHeader?.classList.remove("nav-open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
}

document.addEventListener("click", (event) => {
  if (mobileNavQuery.matches || gritMenuItem?.contains(event.target)) {
    return;
  }

  closeGritMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeGritMenu();
    siteHeader?.classList.remove("nav-open");
    menuButton?.setAttribute("aria-expanded", "false");
  }
});

const logoImages = [
  "assets/alt logo - colors/alt-logo blue .svg",
  "assets/alt logo - colors/alt-logo brown .svg",
  "assets/alt logo - colors/alt-logo orange .svg",
  "assets/alt logo - colors/alt-logo pink .svg",
  "assets/alt logo - colors/alt-logo tan .svg",
  "assets/alt logo - colors/alt-logo white .svg"
];

function rotateLogoColor() {
  const currentIndex = Number(localStorage.getItem("abwLogoColorIndex") || 0);
  const nextIndex = (currentIndex + 1) % logoImages.length;
  logoAlt.src = logoImages[nextIndex];
  localStorage.setItem("abwLogoColorIndex", String(nextIndex));
}

if (logoAlt) {
  logoAlt.addEventListener('mouseenter', rotateLogoColor);
}

const counters = document.querySelectorAll("[data-count-target]");

function formatCount(value) {
  return new Intl.NumberFormat("en-US").format(Math.round(value)) + "+";
}

function animateCounter(counter, index) {
  const target = Number(counter.dataset.countTarget);
  const duration = 3400 + index * 700;
  const startTime = performance.now();

  function frame(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = formatCount(target * eased);

    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      counter.textContent = formatCount(target);
    }
  }

  requestAnimationFrame(frame);
}

if (counters.length) {
  counters.forEach((counter) => {
    counter.textContent = "0+";
  });

  counters.forEach(animateCounter);
}
