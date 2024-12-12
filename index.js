// index.js
import { createInlineForm } from '@formcrafts/embed';

document.addEventListener('DOMContentLoaded', function () {
  const myInlineForm = createInlineForm({
    form: "d2c3a252", // Replace with your actual Form Key
    target: document.getElementById("formcrafts-container"),
    seamless: true,
  });

  myInlineForm.on("submit:success", function () {
    console.log("Form submitted successfully.");

    // Access form values
    const formValues = myInlineForm.values();
    console.log("Form Values:", formValues);

    // Extract relevant fields
    const field46 = formValues.field46 || ""; // Adjust based on your form's field keys

    if (field46 === "Appel") {
      // Hide FormCrafts form
      const formContainer = document.getElementById("formcrafts-container");
      if (formContainer) {
        formContainer.style.display = "none";
        console.log("FormCrafts container hidden.");
      }

      // Show 'other-bloc' immediately
      const otherBloc = document.getElementById("other-bloc");
      if (otherBloc) {
        otherBloc.style.display = "block";
        console.log("Other-bloc displayed.");
      }
    } else {
      // Hide FormCrafts form
      const formContainer = document.getElementById("formcrafts-container");
      if (formContainer) {
        formContainer.style.display = "none";
        console.log("FormCrafts container hidden.");
      }

      // Show Calendly container with prefilled data
      const calendlyContainer = document.getElementById("calendly-container");
      if (calendlyContainer) {
        calendlyContainer.style.display = "block";

        // Extract other fields
        const fname = formValues.field41 || ""; // Replace with your actual field key
        const lname = formValues.field42 || "";
        const email = formValues.field16 || "";
        const location = formValues.field15 || "";

        // Construct Calendly URL with prefilled data
        const calendlyUrl = `https://calendly.com/your-calendly-link?hide_gdpr_banner=1` +
          `&name=${encodeURIComponent(fname + ' ' + lname)}` +
          `&email=${encodeURIComponent(email)}` +
          `&a1=${encodeURIComponent(location)}`;

        // Inject Calendly widget
        calendlyContainer.innerHTML = `
          <div class="calendly-inline-widget" data-url="${calendlyUrl}" style="min-width:320px;height:700px;"></div>
          <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
        `;
        console.log("Calendly widget injected with prefilled data.");
      }
    }
  });

  myInlineForm.on("submit:error", function (errors) {
    console.error("Form submission error:", errors);
    alert("There was an error submitting the form. Please try again.");
  });
});