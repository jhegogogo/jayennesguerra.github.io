document.addEventListener("DOMContentLoaded", () => {


    /* =========================================
       SEPARATE SECTION FILES
    ========================================== */

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



    /* =========================================
       LOAD SECTION FILE
    ========================================== */

    async function loadSection(section) {

        const container =
            document.getElementById(
                section.container
            );


        if (!container) {
            return;
        }


        try {

            const fileURL = new URL(
                `sections/${section.file}`,
                document.baseURI
            );


            const response = await fetch(
                fileURL.href,
                {
                    cache: "no-cache"
                }
            );


            if (!response.ok) {

                throw new Error(
                    `${section.file} returned ${response.status}`
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


            /*
             * Do NOT remove the whole website
             * if one section fails.
             */

            container.innerHTML = "";

        }

    }



    /* =========================================
       LOAD ALL SECTIONS
    ========================================== */

    async function loadAllSections() {

        await Promise.all(
            sections.map(
                section => loadSection(section)
            )
        );


        setupNavigation();

        setupResumeModal();

        setupImageProtection();

        handleInitialHash();

    }



    /* =========================================
       NAVIGATION
    ========================================== */

    function setupNavigation() {

        const links =
            document.querySelectorAll(
                'a[href^="#"]'
            );


        links.forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {

                        console.warn(
                            `Navigation target not found: ${targetId}`
                        );

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



    /* =========================================
       INITIAL HASH
    ========================================== */

    function handleInitialHash() {

        const hash =
            window.location.hash;


        if (!hash) {
            return;
        }


        const target =
            document.querySelector(hash);


        if (!target) {
            return;
        }


        setTimeout(() => {

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 200);

    }



    /* =========================================
       RESUME MODAL
    ========================================== */

    function setupResumeModal() {

        const modal =
            document.getElementById(
                "resumeModal"
            );


        const openButton =
            document.getElementById(
                "resumeButton"
            );


        const closeButton =
            document.getElementById(
                "resumeClose"
            );


        const confirmButton =
            document.getElementById(
                "resumeConfirm"
            );


        if (
            !modal ||
            !openButton
        ) {
            return;
        }



        function openModal() {

            modal.classList.add(
                "active"
            );


            modal.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.classList.add(
                "modal-open"
            );

        }



        function closeModal() {

            modal.classList.remove(
                "active"
            );


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

                if (
                    event.target === modal
                ) {

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



    /* =========================================
       IMAGE PROTECTION
    ========================================== */

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



    /* =========================================
       DISABLE CONTEXT MENU
    ========================================== */

    document.addEventListener(
        "contextmenu",
        event => {

            event.preventDefault();

        }
    );



    /* =========================================
       INTRO ANIMATION
    ========================================== */

    const intro =
        document.getElementById(
            "introScreen"
        );


    if (intro) {

        setTimeout(() => {

            intro.classList.add(
                "intro-hidden"
            );


            setTimeout(() => {

                intro.remove();

            }, 900);

        }, 5500);

    }



    /* =========================================
       START LOADING
    ========================================== */

    loadAllSections();

});
