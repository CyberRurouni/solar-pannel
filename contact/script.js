document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = entry.target.dataset.delay || "0s";
        entry.target.style.animationPlayState = "running";
        observer.unobserve(entry.target);
      }
    });
  });

  animatedElements.forEach((el) => {
    el.style.animationPlayState = "paused";
    observer.observe(el);
  });
});
