document.addEventListener("DOMContentLoaded", function () {
  // Create sun rays
  const sun = document.getElementById("sun");
  for (let i = 0; i < 8; i++) {
    const ray = document.createElement("div");
    ray.className = "ray";
    ray.style.transform = `rotate(${i * 45}deg)`;
    sun.appendChild(ray);
  }

  // Animate sun rays
  setInterval(() => {
    document.querySelectorAll(".ray").forEach((ray, index) => {
      ray.style.height = `${160 + Math.sin(Date.now() / 200 + index) * 30}px`;
    });
  }, 50);

  // Calculate savings
  const monthlyBillInput = document.getElementById("monthly-bill");
  const monthlySavingsSpan = document.getElementById("monthly-savings");
  const yearlySavingsSpan = document.getElementById("yearly-savings");

  function calculateSavings() {
    const monthlyBill = parseFloat(monthlyBillInput.value) || 0;
    const monthlySavings = (monthlyBill * 0.75).toFixed(2); // Assuming 75% savings
    const yearlySavings = (monthlyBill * 12 * 0.75).toFixed(2); // Assuming 75% savings
    monthlySavingsSpan.textContent = monthlySavings;
    yearlySavingsSpan.textContent = yearlySavings;
  }

  monthlyBillInput.addEventListener("input", calculateSavings);
  calculateSavings(); // Initial calculation
  // Stats
  const statsSection = document.getElementById("stats");
  const statItems = document.querySelectorAll(".stats-item");
  const initialValues = document.querySelectorAll(".stats-item .number");

  function animateValues(item, initialValue, finalValue, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      item.innerHTML =
        Math.floor(progress * (finalValue - initialValue) + initialValue) + "+";
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          initialValues.forEach((item) => {
            const initialValue = 0;
            const finalValue = parseInt(item.textContent);
            animateValues(item, initialValue, finalValue, 2000);
          });
          statsObserver.unobserve(statsSection);
        }
      });
    },
    { threshold: 0.2 }
  );
  statsObserver.observe(statsSection);

  //   Services
  const servicesSection = document.getElementById("all-services");
  const servicesGrid = document.querySelector(".services-grid");
  const serviceItems = document.querySelectorAll(".service");
  const firstTwoServices = document.querySelectorAll(
    ".service:nth-child(1), .service:nth-child(2)"
  );
  const lastTwoServices = document.querySelectorAll(
    ".service:nth-child(3), .service:nth-child(4)"
  );
  const servicesDetails = document.getElementById("services-details");
  const detailItems = document.querySelectorAll(".details");
  const dots = document.querySelectorAll(".dot");
  const all = document.querySelectorAll("#all");

  // Initial Variables
  let sectionTop;
  let previousCardVelocity = 0;

  // Function to calculate midpoints
  function calculateMidpoints() {
    return {
      midpoint1:
        (window.innerWidth - firstTwoServices[0].offsetWidth) / 2 -
        firstTwoServices[0].getBoundingClientRect().left,
      midpoint2:
        (window.innerWidth - firstTwoServices[0].offsetWidth) / 2 -
        firstTwoServices[1].getBoundingClientRect().left,
      midpoint3:
        (window.innerWidth - lastTwoServices[0].offsetWidth) / 2 -
        lastTwoServices[0].getBoundingClientRect().left,
      midpoint4:
        (window.innerWidth - lastTwoServices[0].offsetWidth) / 2 -
        lastTwoServices[1].getBoundingClientRect().left,
    };
  }

  let midpoints = calculateMidpoints();

  // Recalculate midpoints on window resize
  window.addEventListener("resize", () => {
    midpoints = calculateMidpoints();
  });

  // Spying On Movement
  const movementRecord = (item) => {
    return parseFloat(getComputedStyle(item).getPropertyValue("--left"));
  };

  // Define your servicesObserver
  const servicesObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          serviceItems.forEach((item, index) => {
            item.style.setProperty("--index", index);
          });
          sectionTop = entry.target.offsetTop;
          window.addEventListener("scroll", showCasing);
        } else {
          window.removeEventListener("scroll", showCasing);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  servicesObserver.observe(servicesSection);

  function showCasing() {
    const scrolling = window.scrollY - sectionTop;
    const totalScroll = servicesSection.offsetHeight;
    const progress = scrolling / totalScroll;
    let centeringProgress = scrolling / servicesGrid.offsetHeight;
    const cardVelocity = progress * window.innerHeight;

    if (cardVelocity > 0) {
      // Apply card velocity to all items
      serviceItems.forEach((item, index) => {
        item.style.transform = `translateY(${
          cardVelocity + (index + 1) * 10
        }%)`;
      });
      const allLeftItemsAligned = Array.from(firstTwoServices).every(
        (i) =>
          i.getBoundingClientRect().left ===
          serviceItems[3].getBoundingClientRect().left
      );

      const allRightItemsAligned = Array.from(lastTwoServices).every(
        (i) =>
          i.getBoundingClientRect().left ===
          serviceItems[0].getBoundingClientRect().left
      );

      if (!allLeftItemsAligned) {
        centeringProgress = Math.min(Math.max(centeringProgress, 0), 1);
        const center1 = midpoints.midpoint1 * centeringProgress;
        const center2 = midpoints.midpoint2 * centeringProgress;

        moveFirstTwoServices(center1, center2);
      }

      if (!allRightItemsAligned) {
        centeringProgress = Math.min(Math.max(centeringProgress, 0), 1);
        const center3 = midpoints.midpoint3 * centeringProgress;
        const center4 = midpoints.midpoint4 * centeringProgress;

        moveLastTwoServices(center3, center4);
      }
      if (allLeftItemsAligned && allRightItemsAligned) {
        if (cardVelocity > previousCardVelocity) {
          if (cardVelocity > 100 && cardVelocity < 200) {
            dominance(0);
          } else if (cardVelocity > 250 && cardVelocity < 300) {
            dominance(1);
          } else if (cardVelocity > 350 && cardVelocity < 400) {
            dominance(2);
          } else if (cardVelocity > 450) {
            dominance(3);
          }
          previousCardVelocity = cardVelocity;
        } else if (cardVelocity <= previousCardVelocity) {
          serviceItems.forEach((item, index) => {
            item.classList.remove("active");
            item.style.zIndex = 0;
          });
          if (cardVelocity < 200) {
            dominance(0);
          } else if (cardVelocity < 300) {
            dominance(1);
          } else if (cardVelocity < 400) {
            dominance(2);
          } else if (cardVelocity < 450) {
            dominance(3);
          }
        }

        all.forEach((item, index) => {
          item.classList.remove("active");
          dotAmplification(index, 0);
        });

        if (cardVelocity > 100 && cardVelocity < 200) {
          serviceItems[0].classList.add("active");
          all[0].classList.add("active");
          dotAmplification(0, cardVelocity);
        } else if (cardVelocity > 250 && cardVelocity < 300) {
          serviceItems[1].classList.add("active");
          if (cardVelocity > 260) {
            all[1].classList.add("active");
            dotAmplification(1, cardVelocity);
          }
        } else if (cardVelocity > 350 && cardVelocity < 400) {
          serviceItems[2].classList.add("active");
          if (cardVelocity > 360) {
            all[2].classList.add("active");
            dotAmplification(2, cardVelocity);
          }
        } else if (cardVelocity > 450) {
          serviceItems[3].classList.add("active");
          if (cardVelocity > 460) {
            all[3].classList.add("active");
            dotAmplification(3, cardVelocity);
          }
        }
      }
    }
  }

  function moveFirstTwoServices(center1, center2) {
    firstTwoServices.forEach((service, index) => {
      const serviceCenter = index === 0 ? center1 : center2;
      if (serviceCenter > movementRecord(service)) {
        service.style.transition = "all 0.3s ease";
        if (
          serviceCenter <=
          (index === 0 ? midpoints.midpoint1 : midpoints.midpoint2)
        )
          service.style.setProperty("--left", serviceCenter + "px");
      } else if (serviceCenter < movementRecord(service)) {
        service.style.transition = "all 0.3s ease";
        service.style.setProperty("--left", serviceCenter + "px");
      }
    });
  }

  function moveLastTwoServices(center3, center4) {
    lastTwoServices.forEach((service, index) => {
      const serviceCenter = index === 0 ? center3 : center4;
      if (serviceCenter < movementRecord(service)) {
        service.style.transition = "all 0.3s ease";
        if (
          serviceCenter >=
          (index === 0 ? midpoints.midpoint3 : midpoints.midpoint4)
        )
          service.style.setProperty("--left", serviceCenter + "px");
      } else if (serviceCenter > movementRecord(service)) {
        service.style.transition = "all 0.3s ease";
        service.style.setProperty("--left", serviceCenter + "px");
      }
    });
  }

  function dotAmplification(num, dotAmplifying) {
    dots[num].style.width = dotAmplifying * 3 + "%";
    dots[num].style.height = dotAmplifying * 3 + "%";
    dots[num].style.transition = "all 0.5s linear";
  }
  function dominance(num) {
    serviceItems[num].style.zIndex = "10";
  }
});
