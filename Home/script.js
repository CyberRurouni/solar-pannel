document.addEventListener("DOMContentLoaded", () => {
  ///////////// Home Section

  //////////// About Section
  const about = document.querySelector("#about");
  const aboutItems = document.querySelectorAll(".about-item");
  const aboutContent = document.querySelector(".about-content p");
  const learnMore = document.querySelector(".about-content a");

  const content = [
    "To provide sustainable and affordable solar energy solutions to reduce carbon footprint and promote a greener planet.",
    "To be a leading provider of innovative solar energy solutions, ensuring a sustainable future for generations to come.",
    "A diverse team of experts in solar energy solutions, with expertise in residential, commercial, and industrial installations.",
    "Founded in 2010, Solar Company has grown to become a leading provider of solar energy solutions.",
  ];

  let charIndex = -1;
  let typingDelay = 20;
  let typingTimeout;

  aboutItems.forEach((item) => {
    item.addEventListener("click", () => {
      setActive(item);
    });
  });

  function setActive(element) {
    aboutItems.forEach((item) => {
      removeActive(item);
    });
    if (!element.classList.contains("active")) {
      element.classList.add("active");
      const index = Array.from(aboutItems).indexOf(element);
      type(index);
      visualBeauty(index);
    }
    if (element.classList.contains("active")) {
      element.classList.add("viewed");
    }
  }

  function removeActive(element) {
    element.classList.remove("active");
    element.classList.remove("glow");
    erase();
  }

  function type(index) {
    clearTimeout(typingTimeout);
    charIndex = 0;
    aboutContent.textContent = "";
    function typeChar() {
      if (charIndex < content[index].length) {
        aboutContent.textContent += content[index].charAt(charIndex);
        charIndex++;
        typingTimeout = setTimeout(typeChar, typingDelay);
      } else {
        learnMore.style.opacity = "1";
      }
    }
    typeChar();
  }

  function erase() {
    clearTimeout(typingTimeout);
    aboutContent.textContent = "";
    charIndex = -1;
    learnMore.style.opacity = "0";
  }

  function visualBeauty(index) {
    if (document.querySelectorAll(".viewed").length < aboutItems.length) {
      let nextItem = aboutItems[index + 1] || aboutItems[0];
      if (!nextItem.classList.contains("viewed")) {
        nextItem.classList.add("glow");
      } else {
        // Loop through aboutItems to find the next unviewed item
        for (let i = 0; i < aboutItems.length; i++) {
          if (!aboutItems[i].classList.contains("viewed")) {
            nextItem = aboutItems[i]; // Will only return unviewed item;
            nextItem.classList.add("glow");
            break;
          }
        }
      }
    } else {
      learnMore.classList.add("pulse");
    }
  }

  const aboutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          about.querySelector("h2").classList.add("fade-in");
          aboutItems.forEach((item) => item.classList.add("fade-in"));
          document.querySelector(".about-content").classList.add("fade-in");

          if (
            !aboutItems[0].classList.contains("active") &&
            !about.querySelector(".active")
          ) {
            setActive(aboutItems[0]);
          }
        }
      });
    },
    { threshold: 0.2 }
  );
  aboutObserver.observe(about);

  /////////// Services Section
  const servicesSection = document.getElementById("services");
  const servicesCarousel = document.querySelector(".services-carousel");
  const serviceItems = document.querySelectorAll(".service-item");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");

  let currentIndex = 0;

  nextBtn.addEventListener("click", () => {
    next();
  });

  prevBtn.addEventListener("click", () => {
    prev();
  });

  function next() {
    currentIndex = (currentIndex + 1) % serviceItems.length;
    updateCarousel();
    clearInterval(autoUpdate);
    restartAutoUpdate();
  }

  function prev() {
    currentIndex =
      (currentIndex - 1 + serviceItems.length) % serviceItems.length;
    updateCarousel();
    clearInterval(autoUpdate);
    restartAutoUpdate();
  }

  function updateCarousel() {
    const move = -currentIndex * 100;
    servicesCarousel.style.transform = `translateX(${move}%)`;
    serviceItems.forEach((item, index) => {
      item.classList.toggle("active", index === currentIndex);
    });
  }

  let autoUpdate = setInterval(next, 3000);

  servicesCarousel.addEventListener("mouseenter", () => {
    clearInterval(autoUpdate);
  });
  servicesCarousel.addEventListener("mouseleave", () => {
    autoUpdate = setInterval(next, 3000);
  });
  function restartAutoUpdate() {
    clearInterval(autoUpdate);
    autoUpdate = setInterval(next, 3000);
  }
  restartAutoUpdate();

  // Intersection Observer for scroll animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-services");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(servicesSection);

  ///// Process
  const processSection = document.getElementById("solar-process");
  const processItems = document.querySelectorAll(".process-item");
  const processImgs = document.querySelectorAll(".image-item");
  const bgImgs = [
    "Blur Pics/wallpaperflare.com_wallpaper (1).jpg",
    "Blur Pics/kenshin-bamboo-grove-duel-deskto (1).jpg",
    "Blur Pics/wallpaperflare.com_wallpaper (3).jpg",
    "Blur Pics/wallpaperflare.com_wallpaper (4).jpg",
    "Blur Pics/wallpaperflare.com_wallpaper (5).jpg",
    "Blur Pics/wallpaperflare.com_wallpaper (6).jpg",
  ];

  const processContentSection = document.createElement("div");
  const processContent = document.createElement("p");
  const cta = document.createElement("a");

  const initiallyVisible = document.querySelector(
    '[data-initially-visible="true"]'
  );
  processContentSection.appendChild(processContent);
  processContentSection.className = "process-content";
  document.querySelector(".process-circle").appendChild(processContentSection);

  let currentActiveItem = null;
  initiallyVisible.classList.add("visible");
  initiallyVisible.nextElementSibling.classList.add("glow");
  processContent.textContent = initiallyVisible.dataset.content;
  processContent.style.opacity = "1";
  processImgs[0].classList.add("active");

  function setActiveItem(item) {
    if (currentActiveItem) {
      currentActiveItem.classList.remove("active");
      // Remove 'glow' class from the next item
      const nextItem = currentActiveItem.nextElementSibling || processItems[0];
      nextItem.classList.remove("glow");
    }
    item.classList.add("active");
    item.classList.add("viewed");
    if (initiallyVisible && item.classList.contains("active")) {
      initiallyVisible.setAttribute("data-initially-visible", "false");
    }
    if (document.querySelector('[data-initially-visible="false"]')) {
      initiallyVisible.classList.remove("visible");
    }
    currentActiveItem = item;
    processContent.textContent = item.dataset.content;
    processContent.style.opacity = "1";

    // Add 'glow' class to the next item
    processItems.forEach((item) => {
      item.classList.remove("glow");
    });
    if (document.querySelectorAll("#solar-process .viewed").length <= 5) {
      const index = Array.from(processItems).indexOf(item);
      const nextItem = processItems[(index + 1) % processItems.length];
      nextItem.classList.add("glow");
    } else {
      processContentSection.appendChild(cta);
      cta.setAttribute("href", "/Solar Pannels/contact/index.html");
      cta.textContent = "Go Solar";
      cta.classList.add("pulse");
    }

    // Update the image
    processImgs.forEach((img) => {
      img.classList.remove("active");
    });
    const imgIndex = Array.from(processItems).indexOf(item);
    processImgs[imgIndex].classList.add("active");
    const imgSrc = bgImgs[imgIndex];
    processSection.style.backgroundImage = `url("${imgSrc}")`;
    processSection.style.backgroundSize = "cover";
    processSection.style.backgroundPosition = "center";
    processSection.style.backgroundRepeat = "no-repeat";
    processSection.style.transition = "background-image 1s ease-in-out";
  }

  // Function to animate process items
  function animateProcessItems(entries, processObserver) {
    if (entries[0].isIntersecting) {
      processItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = getOriginalTransform(item) + " scale(1)";
        }, index * 200);
      });
      processObserver.unobserve(processSection);
    }
  }

  // Function to get the original transform of an item
  function getOriginalTransform(item) {
    const index = Array.from(processItems).indexOf(item);
    const angle = 60 * index;
    return `translate(-50%, -50%) rotate(${angle}deg) translate(0, -200px) rotate(${-angle}deg)`;
  }

  // Initially set up process items
  processItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = getOriginalTransform(item) + " scale(0.5)";
    item.addEventListener("mouseenter", () => {
      setActiveItem(item);
    });
  });

  // Set up the Intersection Observer
  const processObserver = new IntersectionObserver(animateProcessItems, {
    threshold: 0.2,
  });
  processObserver.observe(processSection);

  // Initial setup for the glow effect
  setActiveItem(initiallyVisible);

  //// Projects

  // Html Elements
  const projectsSection = document.getElementById("projects");
  const spheres = document.querySelectorAll(".sphere");
  const progress = document.querySelector(".timeline-progress");
  let sectionTop;

  // Scroll
  const projectsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          sectionTop = entry.target.offsetTop;
          window.addEventListener("scroll", actualProgress);
        } else {
          window.removeEventListener("scroll", actualProgress);
        }
      });
    },
    { threshold: 0.1 }
  );

  projectsObserver.observe(projectsSection);

  // Actual Progress
  function actualProgress() {
    const scrollPosition = window.scrollY - sectionTop;
    const totalProgress = projectsSection.offsetHeight - window.innerHeight;
    const progressPercentage = (scrollPosition / totalProgress) * 100;
    progress.style.height = `${Math.min(
      100,
      Math.max(0, progressPercentage)
    )}%`;
    activateSpheres();
  }

  // Spheres Activation
  function activateSpheres() {
    const progressRect = progress.getBoundingClientRect();

    spheres.forEach((sphere) => {
      const sphereRect = sphere.getBoundingClientRect();

      if (
        progressRect.top <= sphereRect.bottom &&
        progressRect.bottom >= sphereRect.top
      ) {
        sphere.classList.add("active");
        const projectId = sphere.getAttribute("data-project");
        document.getElementById(projectId).classList.add("active");
      } else {
        sphere.classList.remove("active");
        const projectId = sphere.getAttribute("data-project");
        document.getElementById(projectId).classList.remove("active");
      }
    });
  }

  /////////////// Testimonials
  const slides = document.querySelectorAll(".testimonial-slide");
  const prevButton = document.getElementById("prev-slide");
  const nextButton = document.getElementById("next-slide");
  let currentSlide = 0;

  function showSlide(index) {
    slides[currentSlide].classList.remove("active");
    slides[index].classList.add("active");
    currentSlide = index;
  }

  function nextSlide() {
    let index = (currentSlide + 1) % slides.length;
    showSlide(index);
  }

  function prevSlide() {
    let index = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(index);
  }

  nextButton.addEventListener("click", () => {
    nextSlide();
    clearInterval(autoRotateInterval);
    restartUpdate();
  });
  prevButton.addEventListener("click", () => {
    prevSlide();
    clearInterval(autoRotateInterval);
    restartUpdate();
  });

  // Auto-rotate
  let autoRotateInterval = setInterval(nextSlide, 5000);

  // Pause auto-rotation when hovering over the slider
  const slider = document.querySelector(".testimonial-slider");
  slider.addEventListener("mouseenter", () =>
    clearInterval(autoRotateInterval)
  );
  slider.addEventListener("mouseleave", () => {
    autoRotateInterval = setInterval(nextSlide, 5000);
  });
  function restartUpdate() {
    clearInterval(autoRotateInterval);
    autoRotateInterval = setInterval(nextSlide, 5000);
  }
  restartUpdate();
});
