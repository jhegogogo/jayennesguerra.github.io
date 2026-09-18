document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       SECTION FILES
    ========================================== */

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
       LOAD SEPARATE HTML FILES
    ========================================== */

    async function loadSections() {

        for (const section of sections) {

            const container =
                document.getElementById(section.container);

            if (!container) {
                console.warn(
                    `Container #${section.container} was not found.`
                );

                continue;
            }

            try {

                const response =
                    await fetch(section.file);

                if (!response.ok) {
                    throw new Error(
                        `HTTP ${response.status}`
                    );
                }

                const html =
                    await response.text();

                container.innerHTML = html;

            } catch (error) {

                console.error(
                    `Could not load ${section.file}:`,
                    error
                );

                container.innerHTML = "";
            }
        }

        setupNavigation();
        setupLeadershipSlideshow();
    }


    /* =========================================
       NAVIGATION
    ========================================== */

    function setupNavigation() {

        const navLinks =
            document.querySelectorAll(
                ".nav-links a"
            );


        navLinks.forEach(link => {

            link.addEventListener("click", event => {

                const href =
                    link.getAttribute("href");

                if (
                    !href ||
                    !href.startsWith("#")
                ) {
                    return;
                }


                const target =
                    document.querySelector(href);

                if (!target) {
                    return;
                }


                event.preventDefault();


                const header =
                    document.querySelector(
                        ".site-header"
                    );

                const headerHeight =
                    header
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

            });

        });

    }


    /* =========================================
       LEADERSHIP PHOTO SLIDESHOW
    ========================================== */

    function setupLeadershipSlideshow() {

        const slideshows =
            document.querySelectorAll(
                ".leadership-slideshow"
            );


        slideshows.forEach(slideshow => {

            const slides =
                slideshow.querySelectorAll(
                    "img"
                );


            if (slides.length <= 1) {
                return;
            }


            let currentSlide = 0;


            slides.forEach((slide, index) => {

                slide.classList.toggle(
                    "active",
                    index === 0
                );

            });


            const interval =
                slideshow.dataset.interval
                    ? Number(slideshow.dataset.interval)
                    : 3000;


            window.setInterval(() => {

                slides[currentSlide].classList.remove(
                    "active"
                );


                currentSlide =
                    (currentSlide + 1) %
                    slides.length;


                slides[currentSlide].classList.add(
                    "active"
                );

            }, interval);

        });

    }


    /* =========================================
       RESUME MODAL
    ========================================== */

    const resumeButton =
        document.getElementById(
            "resumeButton"
        );

    const resumeModal =
        document.getElementById(
            "resumeModal"
        );

    const resumeClose =
        document.getElementById(
            "resumeClose"
        );

    const resumeConfirm =
        document.getElementById(
            "resumeConfirm"
        );


    function openResumeModal() {

        if (!resumeModal) {
            return;
        }

        resumeModal.classList.add("active");

        resumeModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

    }


    function closeResumeModal() {

        if (!resumeModal) {
            return;
        }

        resumeModal.classList.remove("active");

        resumeModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";

    }


    if (resumeButton) {

        resumeButton.addEventListener(
            "click",
            openResumeModal
        );

    }


    if (resumeClose) {

        resumeClose.addEventListener(
            "click",
            closeResumeModal
        );

    }


    if (resumeConfirm) {

        resumeConfirm.addEventListener(
            "click",
            closeResumeModal
        );

    }


    /* =========================================
       CLOSE MODAL WHEN CLICKING OUTSIDE
    ========================================== */

    if (resumeModal) {

        resumeModal.addEventListener(
            "click",
            event => {

                if (
                    event.target === resumeModal
                ) {
                    closeResumeModal();
                }

            }
        );

    }


    /* =========================================
       ESCAPE KEY
    ========================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeResumeModal();
            }

        }
    );


    /* =========================================
       INTRO SCREEN
    ========================================== */

    const introScreen =
        document.getElementById(
            "introScreen"
        );


    if (introScreen) {

        const INTRO_DURATION = 3600;


        window.setTimeout(() => {

            introScreen.classList.add(
                "hidden"
            );

            window.setTimeout(() => {

                introScreen.style.display =
                    "none";

            }, 850);

        }, INTRO_DURATION);

    }


    /* =========================================
       PREVENT IMAGE DRAGGING
    ========================================== */

    document.addEventListener(
        "dragstart",
        event => {

            if (
                event.target.tagName === "IMG"
            ) {
                event.preventDefault();
            }

        }
    );


    /* =========================================
       LOAD EVERYTHING
    ========================================== */

    loadSections();

});
/* =========================================================
   THEME TOGGLE
========================================================= */

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
    }

    themeToggle.addEventListener("click", () => {

        const isLightMode =
            document.body.classList.toggle("light-mode");

        localStorage.setItem(
            "theme",
            isLightMode ? "light" : "dark"
        );

        themeToggleIcon.textContent =
            isLightMode ? "☾" : "☀";

        themeToggle.setAttribute(
            "aria-label",
            isLightMode
                ? "Switch to dark mode"
                : "Switch to light mode"
        );

        themeToggle.setAttribute(
            "title",
            isLightMode
                ? "Switch to dark mode"
                : "Switch to light mode"
        );

    });

}
