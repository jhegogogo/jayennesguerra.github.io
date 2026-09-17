document.addEventListener("DOMContentLoaded", () => {

    const sections = [
        {
            file: "experience.html",
            container: "experience-container"
        },
        {
            file: "skills.html",
            container: "skills-container"
        },
        {
            file: "projects.html",
            container: "projects-container"
        },
        {
            file: "certifications.html",
            container: "certifications-container"
        },
        {
            file: "education.html",
            container: "education-container"
        },
        {
            file: "leadership.html",
            container: "leadership-container"
        }
    ];


    /* ================================
       LOAD SEPARATE HTML FILES
    ================================= */

    async function loadSections() {

        for (const section of sections) {

            try {

                const response = await fetch(
                    `sections/${section.file}`
                );

                if (!response.ok) {
                    throw new Error(
                        `Could not load ${section.file}`
                    );
                }

                const html =
                    await response.text();

                document.getElementById(
                    section.container
                ).innerHTML = html;

            } catch (error) {

                console.error(error);

            }

        }


        setupNavigation();
        setupResumeModal();
        setupImageProtection();

    }


    /* ================================
       SMOOTH NAVIGATION
    ================================= */

    function setupNavigation() {

        document
            .querySelectorAll('a[href^="#"]')
            .forEach(link => {

                link.addEventListener(
                    "click",
                    event => {

                        const targetId =
                            link.getAttribute("href");

                        const target =
                            document.querySelector(
                                targetId
                            );

                        if (!target) {
                            return;
                        }

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                        history.replaceState(
                            null,
                            "",
                            targetId
                        );

                    }
                );

            });

    }


    /* ================================
       RESUME MODAL
    ================================= */

    function setupResumeModal() {

        const modal =
            document.getElementById("resumeModal");

        const openButton =
            document.querySelector(".resume-btn");

        const closeButton =
            document.querySelector(
                ".resume-modal-close"
            );

        const confirmButton =
            document.querySelector(
                ".resume-modal-confirm"
            );


        if (!modal || !openButton) {
            return;
        }


        function openModal() {

            modal.classList.add("active");

            modal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.classList.add(
                "modal-open"
            );

        }


        function closeModal() {

            modal.classList.remove("active");

            modal.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.classList.remove(
                "modal-open"
            );

        }


        openButton.addEventListener(
            "click",
            openModal
        );


        closeButton?.addEventListener(
            "click",
            closeModal
        );


        confirmButton?.addEventListener(
            "click",
            closeModal
        );


        modal.addEventListener(
            "click",
            event => {

                if (event.target === modal) {
                    closeModal();
                }

            }
        );


        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape" &&
                    modal.classList.contains("active")
                ) {

                    closeModal();

                }

            }
        );

    }


    /* ================================
       IMAGE PROTECTION
    ================================= */

    function setupImageProtection() {

        document
            .querySelectorAll("img")
            .forEach(image => {

                image.setAttribute(
                    "draggable",
                    "false"
                );

                image.addEventListener(
                    "dragstart",
                    event => {
                        event.preventDefault();
                    }
                );

            });

    }


    /* ================================
       CONTEXT MENU
    ================================= */

    document.addEventListener(
        "contextmenu",
        event => {
            event.preventDefault();
        }
    );


    /* ================================
       INTRO ANIMATION
    ================================= */

    const intro =
        document.getElementById("introScreen");

    if (intro) {

        setTimeout(() => {

            intro.remove();

        }, 6500);

    }


    /* ================================
       START
    ================================= */

    loadSections();

});
