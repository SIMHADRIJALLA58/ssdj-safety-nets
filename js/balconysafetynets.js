  const reveal = document.querySelector(".reveal");

  window.addEventListener("scroll", () => {
    const sectionTop = reveal.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (sectionTop < screenHeight - 150) {
      reveal.classList.add("active");
    }
  });