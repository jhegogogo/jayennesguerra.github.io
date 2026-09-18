document.addEventListener("DOMContentLoaded", () => {
    /* =========================================
       SECTION FILES
    ========================================= */

    const sections = [
        {
            file: "sections/experience.html",
            container: "experience-container"
        },
        {
            file: "sections/skills.html",
            container: "skills-container"
        },
        {
            file: "sections/projects.html",
            container: "projects-container"
        },
        {
            file: "sections/certifications.html",
            container: "certifications-container"
        },
        {
            file: "sections/education.html",
            container: "education-container"
        },
        {
            file: "sections/leadership.html",
            container: "leadership-container"
        }
    ];


    /* =========================================
       LOAD SECTIONS
    ========================================= */

    async function loadSections() {
        try {
            await Promise.all(
                sections.map(async ({ file, container }) => {
                    const target = document.getElementById(container);

                    if (!target) {
                        return;
                    }

                    const response = await fetch(file);

                    if (!response.ok) {
                        throw new Error(
                            `Failed to load ${file}: ${response.status}`
                        );
                    }

                    const html = await response.text();

                    target.innerHTML = html;
                })
            );

            setupNavigation();
            setupLeadershipSlideshow();

        } catch (error) {
            console.error("Error loading portfolio sections:", error);
        }
    }


    /* =========================================
       NAVIGATION
    ========================================= */

    function setupNavigation() {
        const navLinks = document.querySelectorAll(
            '.site-nav a[href^="#"]'
        );

        navLinks.forEach((link) => {
            link.addEventListener("click", (event) => {
                const targetId = link.getAttribute("href");

                if (!targetId || targetId === "#") {
                    return;
                }

                const target = document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const header = document.querySelector(".site-header");

                const headerHeight = header
                    ? header.offsetHeight
                    : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

                history.pushState(null, "", targetId);
            });
        });
    }


    /* =========================================
       LEADERSHIP SLIDESHOW
    ========================================= */

    function setupLeadershipSlideshow() {
        const slideshows = document.querySelectorAll(
            ".leadership-slideshow"
        );

        slideshows.forEach((slideshow) => {
            const images = slideshow.querySelectorAll("img");

            if (images.length <= 1) {
                return;
            }

            let currentIndex = 0;

            const interval =
                parseInt(
                    slideshow.dataset.interval,
                    10
                ) || 3000;

            images.forEach((image, index) => {
                image.classList.toggle(
                    "active",
                    index === 0
                );
            });

            setInterval(() => {
                images[currentIndex].classList.remove("active");

                currentIndex =
                    (currentIndex + 1) % images.length;

                images[currentIndex].classList.add("active");
            }, interval);
        });
    }


    /* =========================================
       THEME TOGGLE
    ========================================= */

    function setupThemeToggle() {
        const themeToggle =
            document.getElementById("themeToggle");

        const themeToggleIcon =
            document.getElementById("themeToggleIcon");

        if (!themeToggle || !themeToggleIcon) {
            return;
        }

        const savedTheme =
            localStorage.getItem("theme");

        /* Restore saved theme */
        if (savedTheme === "light") {
            document.body.classList.add("light-mode");

            themeToggleIcon.textContent = "☾";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to dark mode"
            );
        } else {
            document.body.classList.remove("light-mode");

            themeToggleIcon.textContent = "☀";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to light mode"
            );
        }


        /* Toggle theme */
        themeToggle.addEventListener("click", () => {
            const isLightMode =
                document.body.classList.toggle(
                    "light-mode"
                );

            localStorage.setItem(
                "theme",
                isLightMode ? "light" : "dark"
            );

            if (isLightMode) {
                themeToggleIcon.textContent = "☾";

                themeToggle.setAttribute(
                    "aria-label",
                    "Switch to dark mode"
                );

                themeToggle.setAttribute(
                    "title",
                    "Switch to dark mode"
                );
            } else {
                themeToggleIcon.textContent = "☀";

                themeToggle.setAttribute(
                    "aria-label",
                    "Switch to light mode"
                );

                themeToggle.setAttribute(
                    "title",
                    "Switch to light mode"
                );
            }
        });
    }


    /* =========================================
       RESUME MODAL
    ========================================= */

    function setupResumeModal() {
        const resumeButton =
            document.getElementById("resumeButton");

        const resumeModal =
            document.getElementById("resumeModal");

        const resumeClose =
            document.querySelector(".resume-modal-close");

        const resumeConfirm =
            document.getElementById("resumeConfirm");

        if (!resumeButton || !resumeModal) {
            return;
        }


        /* Open modal */
        function openResumeModal() {
            resumeModal.classList.add("active");

            document.body.style.overflow = "hidden";
        }


        /* Close modal */
        function closeResumeModal() {
            resumeModal.classList.remove("active");

            document.body.style.overflow = "";
        }


        resumeButton.addEventListener(
            "click",
            openResumeModal
        );


        /* Close using X button */
        if (resumeClose) {
            resumeClose.addEventListener(
                "click",
                closeResumeModal
            );
        }


        /* Close using Got it button */
        if (resumeConfirm) {
            resumeConfirm.addEventListener(
                "click",
                closeResumeModal
            );
        }


        /* Close when clicking outside modal */
        resumeModal.addEventListener(
            "click",
            (event) => {
                if (
                    event.target === resumeModal ||
                    event.target.classList.contains(
                        "resume-modal-overlay"
                    )
                ) {
                    closeResumeModal();
                }
            }
        );


        /* Close with Escape */
        document.addEventListener(
            "keydown",
            (event) => {
                if (
                    event.key === "Escape" &&
                    resumeModal.classList.contains("active")
                ) {
                    closeResumeModal();
                }
            }
        );
    }


    /* =========================================
       INTRO SCREEN
    ========================================= */

    function setupIntroScreen() {
        const introScreen =
            document.getElementById("introScreen");

        if (!introScreen) {
            return;
        }

        setTimeout(() => {
            introScreen.classList.add("hidden");

            setTimeout(() => {
                introScreen.style.display = "none";
            }, 800);

        }, 3600);
    }


    /* =========================================
       PREVENT IMAGE DRAGGING
    ========================================= */

    function preventImageDragging() {
        const images =
            document.querySelectorAll("img");

        images.forEach((image) => {
            image.addEventListener(
                "dragstart",
                (event) => {
                    event.preventDefault();
                }
            );
        });
    }


    /* =========================================
       INITIALIZE
    ========================================= */

    setupThemeToggle();

    setupResumeModal();

    setupIntroScreen();

    preventImageDragging();

    loadSections();
});
