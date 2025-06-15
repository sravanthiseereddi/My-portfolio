document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  const fields = {
    fullName: {
      element: form.querySelector('input[name="fullName"]'),
      message: "Full name is required and must be at least 8 characters.",
      validate: (val) => val.trim().length >= 8,
    },
    email: {
      element: form.querySelector('input[name="email"]'),
      message: "Valid email address is required.",
      pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
    },
    phone: {
      element: form.querySelector('input[name="phone"]'),
      message: "Phone number must be exactly 10 digits.",
      pattern: /^\d{10}$/,
    },
    course: {
      element: form.querySelector("select[name='course']"),
      message: "Please select a course.",
      validate: (val) => val.trim() !== "",
    },
    address: {
      element: form.querySelector("textarea[name='address']"),
      message: "Address must be at least 10 characters.",
  validate: (val) => {
  console.log("Address length:", val.trim().length);
  return val.trim().length >= 10 && val.trim().length <= 200;
}

    },
  };

  // Add error spans dynamically
  for (const key in fields) {
    const span = document.createElement("span");
    span.className = "error";
    fields[key].element.insertAdjacentElement("afterend", span);
    fields[key].error = span;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    for (const key in fields) {
      const field = fields[key];
      const value = field.element.value.trim();

      let valid = true;
      if (field.validate) {
        valid = field.validate(value);
      } else if (field.pattern) {
        valid = field.pattern.test(value);
      } else {
        valid = value !== "";
      }

      if (!valid) {
        field.error.textContent = field.message;
        isValid = false;
      } else {
        field.error.textContent = "";
      }
    }

    if (isValid) {
      const applicationData = {
        fullName: fields.fullName.element.value.trim(),
        email: fields.email.element.value.trim(),
        phone: fields.phone.element.value.trim(),
        course: fields.course.element.value,
        address: fields.address.element.value.trim(),
        submittedAt: new Date().toISOString(),
      };

      let submissions = JSON.parse(localStorage.getItem("studentApplications")) || [];
      submissions.push(applicationData);
      localStorage.setItem("studentApplications", JSON.stringify(submissions));

      alert(`Thank you, ${applicationData.fullName}! Your application has been submitted successfully.`);

      form.reset();

      for (const key in fields) {
        fields[key].error.textContent = "";
      }
    }
  });
});
