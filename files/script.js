particlesJS.load('particles-js', 'files/particles.json', function() {
    console.log('Particles.js loaded.');
});


// Log whether Particle.js is loaded
console.log(typeof particlesJS !== "undefined" ? "Particle.js Loaded" : "Particle.js Not Loaded");

// Typed.js Initialization
var typed = new Typed(".text", {
    strings: ["Cybersecurity", "Programming", "Cloud Computing"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true,
});

// Back to Top Button
const toTop = document.querySelector(".top");
if (toTop) {
    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 100) {
            toTop.classList.add("active");
        } else {
            toTop.classList.remove("active");
        }
    });
}

// Initialize EmailJS
emailjs.init("ies5O4lUoUZXStXpZ");

document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const formStatus = document.getElementById("form-status");

    // Collect form data
    const formData = {
        from_name: this.name.value.trim(),
        reply_to: this.email.value.trim(),
        message: this.message.value.trim(),
    };

    // Validate input fields
    if (!formData.from_name || !formData.reply_to || !formData.message) {
        formStatus.textContent = "Please fill out all fields before submitting.";
        formStatus.style.color = "red";
        return;
    }

    // Debug: Log formData to ensure it’s populated correctly
    console.log("Form Data:", formData);

    // Send email via EmailJS
    emailjs
        .send("service_bgdp99x", "template_j1mehp9", formData)
        .then(() => {
            formStatus.textContent = "Message sent successfully!";
            formStatus.style.color = "#00d9ff";
            this.reset(); // Clear the form
        })
        .catch((error) => {
            formStatus.textContent = "Failed to send message. Please try again.";
            formStatus.style.color = "red";

            // Debug: Log the full error for inspection
            console.error("EmailJS Error:", error);
        });
});



// Initialize Particle.js
particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#00d9ff" },
        shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#00d9ff",
            opacity: 0.4,
            width: 1,
        },
        move: { enable: true, speed: 6, out_mode: "out" },
    },
    interactivity: {
        detect_on: "window",
        events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
        },
        modes: {
            grab: { distance: 140, line_linked: { opacity: 1 } },
            bubble: { distance: 400, size: 40, duration: 2 },
            repulse: { distance: 200 },
            push: { particles_nb: 4 },
        },
    },
    retina_detect: true,
});

/* Attempt to control location of particles */
function manageParticles() {
    const sectionsWithParticles = ["Skills", "Projects", "contact"];
    const particlesContainer = document.getElementById("particles-js");
    const threshold = 0.5;

    const currentSection = sectionsWithParticles.find((id) => {
        const section = document.getElementById(id);
        const rect = section.getBoundingClientRect();
        const sectionHeight = rect.height;

        console.log(`Checking section: ${id}, rect:`, rect); // Debugging log

        return (
            rect.top >= -sectionHeight * threshold &&
            rect.bottom <= window.innerHeight + sectionHeight * threshold
        );
    });

    console.log(`Current section: ${currentSection}`); // Debugging log

    if (currentSection) {
        if (!particlesContainer) {
            const newParticlesDiv = document.createElement("div");
            newParticlesDiv.id = "particles-js";
            document.body.appendChild(newParticlesDiv);
            particlesJS.load("particles-js", "files/particles.json");
        }
        particlesContainer?.classList.remove("hidden");
    } else if (particlesContainer) {
        particlesContainer.classList.add("hidden");
    }
}



// Add event listener for scroll
window.addEventListener("scroll", manageParticles);

// Initialize on page load
manageParticles();

/* Mobile functionality for projects*/
document.querySelectorAll('.row').forEach((row) => {
    let tapped = false;
    row.addEventListener('touchstart', (e) => {
      // Prevent the link from following immediately
      e.preventDefault();
      if (!tapped) {
        // First tap: show the layer
        row.classList.add('show-layer');
        tapped = true;
        
        // Reset after a short delay if user doesn't tap again
        setTimeout(() => {
          tapped = false;
          row.classList.remove('show-layer');
        }, 2000);
      } else {
        // Second tap: follow the link
        window.location = row.closest('a').href;
      }
    });
  });
  
