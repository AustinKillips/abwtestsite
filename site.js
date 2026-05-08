const menuButton = document.querySelector(".menu-toggle");
const siteHeader = document.querySelector(".site-header");

if (menuButton && siteHeader) {
  menuButton.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("nav-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
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
