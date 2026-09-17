/* =========================================================
   PORTFOLIO SCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PREVENT IMAGE DRAGGING
    ====================================================== */

    const images = document.querySelectorAll("img");

    images.forEach((image) => {
        image.addEventListener("dragstart", (event) => {
            event.preventDefault();
        });
    });


    /* =====================================================
       OPTIONAL RIGHT-CLICK PROTECTION
    ====================================================== */

    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });


    /* =====================================================
       RESUME MODAL
    ====================================================== */

    const resumeModal = document.querySelector(
        ".resume-modal-overlay"
    );

    const resumeButtons = document.querySelectorAll(
        ".resume-btn"
    );

    const resumeCloseButton = document.querySelector(
        ".resume-modal-close"
    );


    /* Open Resume Modal */

    resumeButtons.forEach((button) => {

        button.addEventListener("click", (event) => {

            event.preventDefault();

            if (!resumeModal) {
                return;
            }

            resumeModal.classList.add("active");

            document.body.classList.add("modal-open");

        });

    });


    /* Close Resume Modal */

    const closeResumeModal = () => {

        if (!resumeModal) {
            return;
        }

        resumeModal.classList.remove("active");

        document.body.classList.remove("modal-open");

    };


    if (resumeCloseButton) {

        resumeCloseButton.addEventListener(
            "click",
            closeResumeModal
        );

    }


    /* Close when clicking the overlay */

    if (resumeModal) {

        resumeModal.addEventListener("click", (event) => {

            if (
                event.target === resumeModal
            ) {
                closeResumeModal();
            }

        });

    }


    /* =====================================================
       ESCAPE KEY
    ====================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeResumeModal();

        }

    });


    /* =====================================================
       OPENING INTRO
    ====================================================== */

    const introScreen = document.querySelector(
        ".intro-screen"
    );


    if (introScreen) {

        /*
         * Intro exists only on main.html.
         *
         * After the animation finishes,
         * remove it from the page completely.
         */

        const removeIntro = () => {

            introScreen.remove();

            document.body.classList.remove(
                "intro-active"
            );

        };


        /*
         * CSS animation runs for approximately
         * 6 seconds including the fade-out.
         */

        setTimeout(
            removeIntro,
            6200
        );

    }


    /* =====================================================
       SMOOTH INTERNAL NAVIGATION
    ====================================================== */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "main.html";

    const navLinks =
        document.querySelectorAll(
            ".nav-links a"
        );


    navLinks.forEach((link) => {

        const linkPage =
            link.getAttribute("href");

        if (!linkPage) {
            return;
        }

        /*
         * Only compare actual page names.
         * This prevents main.html#about from
         * interfering with page navigation.
         */

        const pageName =
            linkPage.split("#")[0];

        if (
            pageName &&
            pageName === currentPage
        ) {

            link.classList.add("active");

        }

    });


    /* =====================================================
       REDUCED MOTION
    ====================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        prefersReducedMotion &&
        introScreen
    ) {

        introScreen.remove();

    }

});
