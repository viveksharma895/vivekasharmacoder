
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
