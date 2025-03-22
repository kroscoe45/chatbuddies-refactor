document.addEventListener("DOMContentLoaded", (event) => {
  // Function to prevent body scroll

  const preventScroll = () => {
    document.body.style.overflow = "hidden";
  };

  // Function to allow body scroll
  const allowScroll = () => {
    document.body.style.overflow = "auto";
  };

  /* ---------------- 
     Header
  ---------------- */

  // Hamburger Icon

  const hamburgerIcon = document.getElementById("hamburger");

  hamburgerIcon.addEventListener("click", () => {
    hamburgerIcon.classList.toggle("active");
  });

  // Header Mobile Transitions

  const headerMobile = document.querySelector("#header-mobile");
  const headerContent = document.querySelector(".header-content");

  function navToggle() {
    headerContent.classList.toggle("active");

    if (headerContent.classList.contains("active")) {
      preventScroll();
      headerMobile.style.height = "100%";
    } else {
      allowScroll();
      // Delaty for closing transition
      setTimeout(() => {
        headerMobile.style.height = "0";
      }, 400);
    }
  }

  hamburgerIcon.addEventListener("click", navToggle);

  /* ------------------
     Hero BG Animation 
  ----------------------*/

  const heroSection = document.querySelector("#hero");
  const heroCursor = document.querySelector("#hero .cursor-gradient");
  const heroCursorWidthHalf = heroCursor.offsetWidth / 2;

  heroSection.addEventListener("mousemove", (event) => {
    const x = event.pageX - heroSection.offsetLeft;
    const y = event.pageY - heroSection.offsetTop;

    heroCursor.style.left = `${x - heroCursorWidthHalf}px`;
    heroCursor.style.top = `${y - heroCursorWidthHalf}px`;
  });

  // Mouseleave event listener for the hero section
  heroSection.addEventListener("mouseleave", () => {
    // Reset circle position to center when leaving the section
    heroCursor.style.left = `${
      heroSection.clientWidth / 2 - heroCursor.offsetWidth / 2
    }px`;
    heroCursor.style.top = `${
      heroSection.clientHeight / 2 - heroCursor.offsetHeight / 2
    }px`;
  });

  /* ---------------- 
     Accordions 
  ---------------- */

  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((accordion) => {
    const accordionTitle = accordion.querySelector(".accordion-title");
    const accordionContent = accordion.querySelector(".accordion-content");

    accordionTitle.addEventListener("click", () => {
      accordionContent.classList.toggle("open");

      const svgElement = accordionTitle.querySelector("svg");

      if (svgElement) {
        /* For Faqs Accordion */
        accordionTitle.querySelector("svg").classList.toggle("rotate");
      } else {
        accordionTitle.classList.toggle("rotate");
      }
    });
  });

  const openLightboxButtons = document.querySelectorAll(
    "[data-lightbox-target]"
  );
  const lightboxes = document.querySelectorAll(".lightbox");

  openLightboxButtons.forEach((button) => {
    button.addEventListener("click", () => {
      lightboxes.forEach((lightbox) => (lightbox.style.display = "none"));

      preventScroll();

      const lightboxId = button.getAttribute("data-lightbox-target");

      const lightbox = document.getElementById(lightboxId);
      if (lightbox) {
        lightbox.style.display = "flex";
      }
    });
  });

  // Close lightbox when the close button is clicked
  lightboxes.forEach((lightbox) => {
    const closeBtn = lightbox.querySelector(".lightbox-close-icon");
    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
      allowScroll();
    });
  });

  // Close lightbox when clicking outside the content
  lightboxes.forEach((lightbox) => {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
        allowScroll();
      }
    });
  });

  /* ----------------------- 
     Scroll to Top Button
  ------------------------- */

  const btnScrollToTop = document.getElementById("btnScrollToTop");

  // scroll to top of page when button clicked
  btnScrollToTop.addEventListener("click", (e) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

  // toggle 'scroll to top' based on scroll position
  window.addEventListener("scroll", (e) => {
    if (window.scrollY > 50) {
      btnScrollToTop.classList.add("slideup");
    } else {
      btnScrollToTop.classList.remove("slideup");
    }
    // btnScrollToTop.style.display = window.scrollY > 50 ? "block" : "none";
  });

  /* ------------------------------ 
     Make Images larger on scroll
  -------------------------------- */

  const images = document.querySelectorAll(".scroll-scale");

  // Set a threshold value (0 to 1), where 0 is when the image is fully out of view and 1 is when it's fully in view
  const threshold = 0.9; // You can adjust this value as needed (0.0 to 1.0)

  const scaleOnScroll = () => {
    images.forEach((image) => {
      const rect = image.getBoundingClientRect();
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

      // Calculate how much of the image is visible in the viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate the progress based on the threshold
        const scaledTop =
          windowHeight - rect.top - windowHeight * (1 - threshold);
        const scaledHeight = rect.height + windowHeight * (1 - threshold);
        const progress = Math.min(Math.max(scaledTop / scaledHeight, 0), 1); // Ensure progress is between 0 and 1

        // Scale between 0.5 and 1 based on scroll position
        const scale = 0.5 + progress * 0.5;
        image.style.transform = `scale(${Math.min(scale, 1)})`;
      } else {
        // Reset scale when out of viewport
        image.style.transform = "scale(0.5)";
      }
    });
  };

  // Trigger the scale function on scroll
  window.addEventListener("scroll", scaleOnScroll);

  // Run once on load in case elements are already in view
  scaleOnScroll();
}); // End of the DOMContentLoaded event
