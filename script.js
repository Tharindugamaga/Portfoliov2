let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("heaader nav a");

// Toggle menu when clicking menu icon
menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// Function to remove active class from all nav links
function removeActiveClass() {
  navLinks.forEach((link) => link.classList.remove("active"));
}

// Function to add active class to the correct nav link
function highlightActiveSection() {
  let scrollPosition = window.scrollY + window.innerHeight / 3; // Adjust for better accuracy
  let currentSection = null;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      currentSection = section.id;
    }
  });

  removeActiveClass();

  if (currentSection) {
    let activeLink = document.querySelector(
      `heaader nav a[href="#${currentSection}"]`
    );
    if (activeLink) {
      console.log(activeLink);
      activeLink.classList.add("active");
    }
  }
}

// Event listener for scroll
window.addEventListener("scroll", highlightActiveSection);

// Initial call to highlight the active section when the page loads
document.addEventListener("DOMContentLoaded", highlightActiveSection);


    // Form Submission
    document.getElementById('ContactForm').addEventListener('submit', async function (e) {
      e.preventDefault();

      const form = e.target;
      const formMessage = document.getElementById('formMessage');
      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;

      // Disable button and show sending status
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      formMessage.style.display = 'none';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          formMessage.textContent = '✅ Message sent successfully! I will get back to you soon.';
          formMessage.className = 'form-message success';
          form.reset();
        } else {
          throw new Error('Message failed to send');
    }
  }
      finally {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        formMessage.style.display = 'block';

        setTimeout(() => {
          formMessage.style.display = 'none';
        }, 5000);
      }
   });
