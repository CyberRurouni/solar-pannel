document.addEventListener("DOMContentLoaded", function () {
  function createLeaves() {
    const hero = document.querySelector(".hero");
    const leafCount = 15;
    for (let i = 0; i < leafCount; i++) {
      const leaf = document.createElement("div");
      leaf.classList.add("leaf");
      leaf.style.left = `${Math.random() * 100}%`;
      leaf.style.animationDuration = `${Math.random() * 10 + 5}s`;
      leaf.style.animationDelay = `${Math.random() * 5}s`;
      hero.appendChild(leaf);
    }
  }

  createLeaves();

  ///////////// About
  const about = document.getElementById("about");
  const scrollContainers = document.querySelectorAll(".scroll-container");

  function expand(scrollTop, scrollBottom, page, content, contentSection) {
    setTimeout(() => {
      scrollTop.style.transform = "translateY(calc(-50% - 275px))";
      scrollBottom.style.transform = "translateY(calc(-50% + 275px))";
      page.style.height = "550px";

      setTimeout(() => {
        content.style.opacity = "1";
      }, 1000);
    }, 500);
  }

  const containerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          const contentSection = entry.target
            .closest(".our-mission, .our-vision, .our-story")
            ?.querySelector(
              ".mission-content, .vision-content, .story-content"
            );

          expand(
            entry.target.querySelector(".scroll-top"),
            entry.target.querySelector(".scroll-bottom"),
            entry.target.querySelector(".page"),
            entry.target.querySelector(".content")
          );
          if (contentSection) {
            contentSection.classList.add("animate");
          }
          containerObserver.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.2, // Trigger when 20% of the target is visible
    }
  );

  scrollContainers.forEach((container) => containerObserver.observe(container));

  /////////  Team
  const teamSection = document.querySelector(".team");
  const teamMembers = document.querySelectorAll(".team-member");
  
  const teamObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        teamSection.classList.add("animate");
        teamMembers.forEach((member, index) => {
          member.style.setProperty('--index', index);
          member.classList.add("animate");
        });
        teamMembers[0].classList.add("reveal");
        setTimeout(() => {
          teamMembers[0].classList.remove("reveal");
        }, 2500);
        teamObserver.unobserve(entries[0].target);
      }
    },
    {
      threshold: 0.2,
    }
  );
  
  teamObserver.observe(teamSection);
});
