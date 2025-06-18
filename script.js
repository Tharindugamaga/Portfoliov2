// Navbar toggle
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

// Toggle menu when clicking menu icon
menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// Remove active class from nav links
function removeActiveClass() {
  navLinks.forEach((link) => link.classList.remove("active"));
}

// Highlight active section in navbar
function highlightActiveSection() {
  let scrollPosition = window.scrollY + window.innerHeight / 3;
  let currentSection = null;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = section.id;
    }
  });

  removeActiveClass();

  if (currentSection) {
    let activeLink = document.querySelector(`header nav a[href="#${currentSection}"]`);
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }
}

window.addEventListener("scroll", highlightActiveSection);
document.addEventListener("DOMContentLoaded", highlightActiveSection);

// Form Submission with fetch
document.getElementById('ContactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const formMessage = document.getElementById('formMessage');
  const submitButton = form.querySelector('input[type="submit"], button[type="submit"]');
  const originalButtonText = submitButton.value || submitButton.textContent;

  // Disable button & show sending text
  submitButton.disabled = true;
  if (submitButton.tagName.toLowerCase() === 'input') {
    submitButton.value = 'Sending...';
  } else {
    submitButton.textContent = 'Sending...';
  }
  formMessage.style.display = 'none';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      formMessage.textContent = '✅ Message sent successfully! I will get back to you soon.';
      formMessage.className = 'form-message success';
      form.reset();
    } else {
      throw new Error('Message failed to send');
    }
  } catch (error) {
    formMessage.textContent = '❌ Failed to send message. Please try again.';
    formMessage.className = 'form-message error';
  } finally {
    submitButton.disabled = false;
    if (submitButton.tagName.toLowerCase() === 'input') {
      submitButton.value = originalButtonText;
    } else {
      submitButton.textContent = originalButtonText;
    }

    formMessage.style.display = 'block';
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  }
});
