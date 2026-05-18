const revealElements = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

if ("IntersectionObserver" in window) {
  const revealOnScroll = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealElements.forEach((element) => revealOnScroll.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

const updateActiveLink = () => {
  let currentSection = "";
  const pageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 130;

    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  if (pageBottom) {
    currentSection = sections[sections.length - 1].getAttribute("id");
  }

  navLinks.forEach((link) => {
    const linkTarget = link.getAttribute("href").replace("#", "");
    link.classList.toggle("active", linkTarget === currentSection);
  });
};

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);
