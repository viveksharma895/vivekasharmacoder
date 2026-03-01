// smooth scroll
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

// Get existing smoother (created in main.js)
let smoother = ScrollSmoother.get();

// If not created yet, create it
if (!smoother) {
  smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5,
    effects: true
  });
}

// Smooth scroll for menu links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = this.getAttribute("href");

    smoother.scrollTo(target, true, "power2.out");
  });
});
// smooth scroll

const buttons = document.querySelectorAll(".budget-btn");
const requirementInput = document.getElementById("requirement");

buttons.forEach(button => {
  button.addEventListener("click", function () {
    buttons.forEach(btn => btn.classList.remove("active"));
    this.classList.add("active");
    requirementInput.value = this.innerText;
  });
});

document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = {
    name: this.name.value,
    number: this.number.value,
    email: this.email.value,
    message: this.message.value,
    requirement: this.requirement.value
  };

  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });

  const result = await response.json();
  alert(result.message);
});
