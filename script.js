document.addEventListener("DOMContentLoaded", () => {

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
                    const target =
                        document.getElementById(container);

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

            /*
             * These must run AFTER the external
             * section HTML has been loaded.
             */
            setupNavigation();
            setupProjectTabs();
            setupLeadershipSlideshow();
            preventImageDragging();

        } catch (error) {
            console.error(
                "Error loading portfolio sections:",
                error
            );
        }
    }


    /* =========================================
       NAVIGATION
    ========================================= */

    function setupNavigation() {
        const navLinks = document.querySelectorAll(
            '.nav-links a[href^="#"]'
        );

        navLinks.forEach((link) => {
            link.addEventListener("click", (event) => {
                const targetId =
                    link.getAttribute("href");

                if (!targetId || targetId === "#") {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const header =
                    document.querySelector(".site-header");

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

                history.pushState(
                    null,
                    "",
                    targetId
                );
            });
        });
    }


    /* =========================================
       RYLIM PROJECT TABS
    ========================================= */

    function setupProjectTabs() {
        const projectCards =
            document.querySelectorAll(".project-card");

        projectCards.forEach((card) => {

            const tabs =
                card.querySelectorAll(".project-tab");

            const panels =
                card.querySelectorAll(
                    ".project-tab-panel"
                );

            tabs.forEach((tab) => {

                tab.addEventListener("click", () => {

                    const targetTab =
                        tab.getAttribute("data-tab");


                    /* Remove active state from tabs */
                    tabs.forEach((item) => {
                        item.classList.remove("active");
                    });


                    /* Hide all panels */
                    panels.forEach((panel) => {
                        panel.classList.remove("active");
                    });


                    /* Activate clicked tab */
                    tab.classList.add("active");


                    /* Show matching panel */
                    const targetPanel =
                        card.querySelector(
                            `.project-tab-panel[data-panel="${targetTab}"]`
                        );

                    if (targetPanel) {
                        targetPanel.classList.add("active");
                    }

                });

            });

        });
    }


    /* =========================================
       LEADERSHIP SLIDESHOW
    ========================================= */

    function setupLeadershipSlideshow() {
        const slideshows =
            document.querySelectorAll(
                ".leadership-slideshow"
            );

        slideshows.forEach((slideshow) => {

            const images =
                slideshow.querySelectorAll("img");

            if (images.length <= 1) {
                return;
            }

            let currentIndex = 0;

            const interval =
                parseInt(
                    slideshow.dataset.interval,
                    10
                ) || 3000;


            /* Set first image as active */
            images.forEach((image, index) => {
                image.classList.toggle(
                    "active",
                    index === 0
                );
            });


            /* Automatic slideshow */
            setInterval(() => {

                images[currentIndex]
                    .classList.remove("active");

                currentIndex =
                    (currentIndex + 1) %
                    images.length;

                images[currentIndex]
                    .classList.add("active");

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
            document.getElementById(
                "themeToggleIcon"
            );

        if (!themeToggle || !themeToggleIcon) {
            return;
        }


        const savedTheme =
            localStorage.getItem("theme");


        /* =====================================
           RESTORE SAVED THEME
        ===================================== */

        if (savedTheme === "light") {

            document.body.classList.add(
                "light-mode"
            );

            themeToggleIcon.textContent = "☀";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to dark mode"
            );

        } else {

            document.body.classList.remove(
                "light-mode"
            );

            themeToggleIcon.textContent = "☾";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to light mode"
            );
        }


        /* =====================================
           TOGGLE THEME
        ===================================== */

        themeToggle.addEventListener(
            "click",
            () => {

                const isLightMode =
                    document.body.classList.toggle(
                        "light-mode"
                    );


                /* Save selected theme */
                localStorage.setItem(
                    "theme",
                    isLightMode
                        ? "light"
                        : "dark"
                );


                /* Update icon and accessibility text */
                if (isLightMode) {

                    themeToggleIcon.textContent = "☀";

                    themeToggle.setAttribute(
                        "aria-label",
                        "Switch to dark mode"
                    );

                    themeToggle.setAttribute(
                        "title",
                        "Switch to dark mode"
                    );

                } else {

                    themeToggleIcon.textContent = "☾";

                    themeToggle.setAttribute(
                        "aria-label",
                        "Switch to light mode"
                    );

                    themeToggle.setAttribute(
                        "title",
                        "Switch to light mode"
                    );
                }

            }
        );
    }


    /* =========================================
       RESUME MODAL
    ========================================= */

    function setupResumeModal() {

        const resumeButton =
            document.getElementById(
                "resumeButton"
            );

        const resumeModal =
            document.getElementById(
                "resumeModal"
            );

        const resumeClose =
            document.querySelector(
                ".resume-modal-close"
            );

        const resumeConfirm =
            document.getElementById(
                "resumeConfirm"
            );

        if (!resumeButton || !resumeModal) {
            return;
        }


        /* =====================================
           OPEN MODAL
        ===================================== */

        function openResumeModal() {

            resumeModal.classList.add(
                "active"
            );

            resumeModal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.style.overflow =
                "hidden";
        }


        /* =====================================
           CLOSE MODAL
        ===================================== */

        function closeResumeModal() {

            resumeModal.classList.remove(
                "active"
            );

            resumeModal.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.style.overflow =
                "";
        }


        /* Open using Resume button */
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


        /* =====================================
           CLOSE WHEN CLICKING OUTSIDE
        ===================================== */

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


        /* =====================================
           CLOSE WITH ESCAPE
        ===================================== */

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape" &&
                    resumeModal.classList.contains(
                        "active"
                    )
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
            document.getElementById(
                "introScreen"
            );

        if (!introScreen) {
            return;
        }


        setTimeout(() => {

            introScreen.classList.add(
                "hidden"
            );


            setTimeout(() => {

                introScreen.style.display =
                    "none";

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

    setupResumeModal();

    setupIntroScreen();

    setupThemeToggle();

    loadSections();

});
