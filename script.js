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

                    const response =
                        await fetch(file);

                    if (!response.ok) {

                        throw new Error(
                            `Failed to load ${file}: ${response.status}`
                        );

                    }

                    const html =
                        await response.text();

                    target.innerHTML = html;

                })
            );


            /*
             * These must run AFTER the external
             * section HTML has been loaded.
             */

            setupNavigation();
setupProjectTabs();
setupCertificationCarousels();
setupRylimCarousel();
setupLeadershipSlideshow();
            setupLeadershipCarousel();
setupMediaProtection();


        } catch (error) {

            console.error(
                "Error loading portfolio sections:",
                error
            );

        }

    }


/* =========================================
   NAVIGATION + SECTION SCROLL LOCK
========================================= */

function setupNavigation() {

    const navLinks =
        document.querySelectorAll(
            '.nav-links a[href^="#"]'
        );

    const header =
        document.querySelector(
            ".site-header"
        );


    /* =====================================
       NAVIGATION GROUPS
    ===================================== */

    const navigationGroups = [

        {
            name: "home",
            start: "home",
            end: "education"
        },

        {
            name: "experience",
            start: "experience",
            end: "leadership"
        },

        {
            name: "projects",
            start: "projects",
            end: "projects"
        },

        {
            name: "certifications",
            start: "certifications",
            end: "certifications"
        },

        {
            name: "contact",
            start: "contact",
            end: "contact"
        }

    ];


    /* =====================================
       CURRENT GROUP
    ===================================== */

    let currentGroup =
        navigationGroups[0];


    let navigationTransitioning = false;


    /* =====================================
       GET ELEMENT
    ===================================== */

    function getElement(id) {

        return document.getElementById(id);

    }


    /* =====================================
       GET HEADER HEIGHT
    ===================================== */

    function getHeaderHeight() {

        return header
            ? header.offsetHeight
            : 0;

    }


    /* =====================================
       GET GROUP BOUNDARIES
    ===================================== */

    function getGroupBounds(group) {

        const startElement =
            getElement(group.start);

        const endElement =
            getElement(group.end);


        if (
            !startElement ||
            !endElement
        ) {

            return null;

        }


        const headerHeight =
            getHeaderHeight();


        const startPosition =
            startElement.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;


        const endPosition =
            endElement.getBoundingClientRect().bottom +
            window.scrollY -
            window.innerHeight;


        return {

            start:
                Math.max(
                    0,
                    startPosition
                ),

            end:
                Math.max(
                    startPosition,
                    endPosition
                )

        };

    }


    /* =====================================
       FIND GROUP BY TARGET
    ===================================== */

    function getGroupByTarget(targetId) {

        return navigationGroups.find(
            (group) =>
                group.start === targetId ||
                group.end === targetId
        );

    }


    /* =====================================
       GET TRANSITION NAME
    ===================================== */

    function getTransitionName(
        fromGroup,
        toGroup
    ) {

        return `${fromGroup.name}-to-${toGroup.name}`;

    }


    /* =====================================
       CREATE TRANSITION ELEMENT
    ===================================== */

    let transitionElement =
        document.querySelector(
            ".page-transition"
        );


    if (!transitionElement) {

        transitionElement =
            document.createElement("div");

        transitionElement.className =
            "page-transition";

        document.body.appendChild(
            transitionElement
        );

    }


    /* =====================================
       PLAY NAVIGATION TRANSITION
    ===================================== */

    function playNavigationTransition(
        transitionName,
        callback
    ) {

        if (navigationTransitioning) {
            return;
        }


        navigationTransitioning = true;


        transitionElement.className =
            "page-transition";


        transitionElement.dataset.transition =
            transitionName;


        /*
         * Force browser reflow so the
         * animation can restart every time.
         */

        void transitionElement.offsetWidth;


        transitionElement.classList.add(
            "active"
        );


        /*
         * Destination changes while the
         * transition covers the screen.
         */

        setTimeout(() => {

            callback();

        }, 400);


        /*
         * Transition duration.
         */

        setTimeout(() => {

            transitionElement.classList.remove(
                "active"
            );

            transitionElement.removeAttribute(
                "data-transition"
            );


            navigationTransitioning =
                false;

        }, 850);

    }


    /* =====================================
       NAVIGATION CLICK
    ===================================== */

    navLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

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

                    return;

                }


                event.preventDefault();


                const targetGroup =
                    getGroupByTarget(
                        targetId.replace("#", "")
                    );


                if (!targetGroup) {

                    return;

                }


                /*
                 * Clicking the currently active
                 * navigation group does nothing.
                 */

                if (
                    targetGroup.name ===
                    currentGroup.name
                ) {

                    return;

                }


                const previousGroup =
                    currentGroup;


                const transitionName =
                    getTransitionName(
                        previousGroup,
                        targetGroup
                    );


                /*
                 * Change the active group
                 * immediately so the scroll
                 * lock belongs to the new group.
                 */

                currentGroup =
                    targetGroup;


                /*
                 * Play the unique transition
                 * for this FROM → TO route.
                 */

                playNavigationTransition(
                    transitionName,
                    () => {

                        const headerHeight =
                            getHeaderHeight();


                        const targetPosition =
                            target.getBoundingClientRect().top +
                            window.scrollY -
                            headerHeight;


                        /*
                         * Jump instantly instead
                         * of smooth scrolling.
                         */

                        window.scrollTo({

                            top:
                                Math.max(
                                    0,
                                    targetPosition
                                ),

                            behavior: "instant"

                        });


                        history.pushState(
                            null,
                            "",
                            targetId
                        );

                    }
                );

            }
        );

    });


    /* =====================================
       WHEEL SCROLL LOCK
    ===================================== */

    window.addEventListener(
        "wheel",
        (event) => {

            if (
                navigationTransitioning
            ) {

                event.preventDefault();

                return;

            }


            const bounds =
                getGroupBounds(
                    currentGroup
                );


            if (!bounds) {

                return;

            }


            const currentScroll =
                window.scrollY;


            const scrollingDown =
                event.deltaY > 0;

            const scrollingUp =
                event.deltaY < 0;


            if (
                scrollingDown &&
                currentScroll >=
                    bounds.end - 2
            ) {

                event.preventDefault();

                window.scrollTo({
                    top: bounds.end
                });

                return;

            }


            if (
                scrollingUp &&
                currentScroll <=
                    bounds.start + 2
            ) {

                event.preventDefault();

                window.scrollTo({
                    top: bounds.start
                });

            }

        },
        {
            passive: false
        }
    );


    /* =====================================
       TOUCH SCROLL LOCK
    ===================================== */

    let touchStartY = 0;
    let touchStartX = 0;


    window.addEventListener(
        "touchstart",
        (event) => {

            if (
                event.touches.length !== 1
            ) {

                return;

            }


            touchStartY =
                event.touches[0].clientY;

            touchStartX =
                event.touches[0].clientX;

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "touchmove",
        (event) => {

            if (
                navigationTransitioning ||
                event.touches.length !== 1
            ) {

                return;

            }


            const bounds =
                getGroupBounds(
                    currentGroup
                );


            if (!bounds) {

                return;

            }


            const currentScroll =
                window.scrollY;


            const currentY =
                event.touches[0].clientY;

            const currentX =
                event.touches[0].clientX;


            const deltaY =
                currentY - touchStartY;

            const deltaX =
                currentX - touchStartX;


            /*
             * Ignore horizontal swipes.
             * This prevents the navigation lock
             * from interfering with carousels.
             */

            if (
                Math.abs(deltaX) >
                Math.abs(deltaY)
            ) {

                return;

            }


            const scrollingDown =
                deltaY < 0;

            const scrollingUp =
                deltaY > 0;


            if (
                scrollingDown &&
                currentScroll >=
                    bounds.end - 2
            ) {

                event.preventDefault();

                window.scrollTo({
                    top: bounds.end
                });

                return;

            }


            if (
                scrollingUp &&
                currentScroll <=
                    bounds.start + 2
            ) {

                event.preventDefault();

                window.scrollTo({
                    top: bounds.start
                });

            }

        },
        {
            passive: false
        }
    );


    /* =====================================
       KEYBOARD SCROLL LOCK
    ===================================== */

    window.addEventListener(
        "keydown",
        (event) => {

            if (
                navigationTransitioning
            ) {

                return;

            }


            /*
             * Do not interfere with typing
             * inside form fields.
             */

            const activeElement =
                document.activeElement;

            if (
                activeElement &&
                (
                    activeElement.tagName === "INPUT" ||
                    activeElement.tagName === "TEXTAREA" ||
                    activeElement.tagName === "SELECT"
                )
            ) {

                return;

            }


            const bounds =
                getGroupBounds(
                    currentGroup
                );


            if (!bounds) {

                return;

            }


            const currentScroll =
                window.scrollY;


            const key =
                event.key;


            const scrollingDown =
                key === "ArrowDown" ||
                key === "PageDown" ||
                key === " ";


            const scrollingUp =
                key === "ArrowUp" ||
                key === "PageUp";


            if (
                scrollingDown &&
                currentScroll >=
                    bounds.end - 2
            ) {

                event.preventDefault();

                window.scrollTo({
                    top: bounds.end
                });

                return;

            }


            if (
                scrollingUp &&
                currentScroll <=
                    bounds.start + 2
            ) {

                event.preventDefault();

                window.scrollTo({
                    top: bounds.start
                });

            }

        }
    );


    /* =====================================
       RESIZE
    ===================================== */

    window.addEventListener(
        "resize",
        () => {

            const bounds =
                getGroupBounds(
                    currentGroup
                );


            if (!bounds) {

                return;

            }


            if (
                window.scrollY >
                bounds.end
            ) {

                window.scrollTo({
                    top: bounds.end
                });

            }


            if (
                window.scrollY <
                bounds.start
            ) {

                window.scrollTo({
                    top: bounds.start
                });

            }

        }
    );


    /* =====================================
       INITIAL HASH
    ===================================== */

    const initialHash =
        window.location.hash;


    if (initialHash) {

        const targetId =
            initialHash.replace("#", "");


        const targetGroup =
            getGroupByTarget(
                targetId
            );


        if (targetGroup) {

            currentGroup =
                targetGroup;

        }

    }

}


    /* =========================================
       RYLIM PROJECT TABS
    ========================================= */

    function setupProjectTabs() {

        const projectCards =
            document.querySelectorAll(
                ".project-card"
            );

        projectCards.forEach((card) => {

            const tabs =
                card.querySelectorAll(
                    ".project-tab"
                );

            const panels =
                card.querySelectorAll(
                    ".project-tab-panel"
                );

            tabs.forEach((tab) => {

                tab.addEventListener(
                    "click",
                    () => {

                        const targetTab =
                            tab.getAttribute(
                                "data-tab"
                            );


                        /* Remove active state from tabs */

                        tabs.forEach((item) => {

                            item.classList.remove(
                                "active"
                            );

                        });


                        /* Hide all panels */

                        panels.forEach((panel) => {

                            panel.classList.remove(
                                "active"
                            );

                        });


                        /* Activate clicked tab */

                        tab.classList.add(
                            "active"
                        );


                        /* Show matching panel */

                        const targetPanel =
                            card.querySelector(
                                `.project-tab-panel[data-panel="${targetTab}"]`
                            );

                        if (targetPanel) {

                            targetPanel.classList.add(
                                "active"
                            );

                        }

                    }
                );

            });

        });

    }

/* =========================================
   CERTIFICATION CAROUSELS
========================================= */

function setupCertificationCarousels() {

    const carousels =
        document.querySelectorAll(
            ".certification-carousel"
        );


    carousels.forEach((carousel) => {

        const cards =
            Array.from(
                carousel.querySelectorAll(
                    ".certification-card"
                )
            );

        const previousButton =
            carousel.querySelector(
                ".certification-prev"
            );

        const nextButton =
            carousel.querySelector(
                ".certification-next"
            );

        const category =
            carousel.closest(
                ".certification-category"
            );

        const dots =
            category
                ? Array.from(
                    category.querySelectorAll(
                        ".certification-dot"
                    )
                )
                : [];


        if (
            cards.length === 0 ||
            !previousButton ||
            !nextButton
        ) {
            return;
        }


        /* =====================================
           STARTING POSITION
        ===================================== */

        const startIndex =
            parseInt(
                carousel.dataset.startIndex,
                10
            );

        let currentIndex =
            Number.isNaN(startIndex)
                ? 0
                : startIndex;


        if (
            currentIndex < 0 ||
            currentIndex >= cards.length
        ) {
            currentIndex = 0;
        }


        /* =====================================
           GET CARD INDEX
        ===================================== */

        function getIndex(offset) {

            return (
                currentIndex +
                offset +
                cards.length
            ) % cards.length;

        }


        /* =====================================
           UPDATE CAROUSEL
        ===================================== */

        function updateCarousel() {

            const previousIndex =
                getIndex(-1);

            const centerIndex =
                getIndex(0);

            const nextIndex =
                getIndex(1);


            cards.forEach(
                (card, index) => {

                    card.classList.remove(
                        "certification-card-left",
                        "certification-card-center",
                        "certification-card-right"
                    );


                    if (
                        index === previousIndex
                    ) {

                        card.classList.add(
                            "certification-card-left"
                        );

                    } else if (
                        index === centerIndex
                    ) {

                        card.classList.add(
                            "certification-card-center"
                        );

                    } else if (
                        index === nextIndex
                    ) {

                        card.classList.add(
                            "certification-card-right"
                        );

                    }

                }
            );


            updateDots();

        }


        /* =====================================
           UPDATE DOTS
        ===================================== */

        function updateDots() {

            dots.forEach(
                (dot, index) => {

                    dot.classList.toggle(
                        "active",
                        index === currentIndex
                    );

                }
            );

        }


        /* =====================================
           PREVIOUS CERTIFICATION
        ===================================== */

        function showPrevious() {

            currentIndex =
                (
                    currentIndex -
                    1 +
                    cards.length
                ) %
                cards.length;

            updateCarousel();

        }

        function showNext() {

            currentIndex =
                (
                    currentIndex +
                    1
                ) %
                cards.length;

            updateCarousel();

        }

        previousButton.addEventListener(
            "click",
            showPrevious
        );


        nextButton.addEventListener(
            "click",
            showNext
        );

        dots.forEach(
            (dot, dotIndex) => {

                dot.addEventListener(
                    "click",
                    () => {

                        if (
                            dotIndex >= cards.length
                        ) {
                            return;
                        }


                        currentIndex =
                            dotIndex;

                        updateCarousel();

                    }
                );

            }
        );


        /* =====================================
           DRAG / SWIPE SUPPORT
        ===================================== */

        const track =
            carousel.querySelector(
                ".certification-carousel-track"
            );


        if (track) {

            let startX = 0;
            let startY = 0;
            let isPointerDown = false;
            let didDrag = false;

            const swipeThreshold = 50;

            track.addEventListener(
                "pointerdown",
                (event) => {

                    if (
                        event.pointerType === "mouse" &&
                        event.button !== 0
                    ) {
                        return;
                    }

                    if (
                        event.target.closest(
                            "a, button"
                        )
                    ) {
                        return;
                    }


                    startX =
                        event.clientX;

                    startY =
                        event.clientY;

                    isPointerDown = true;
                    didDrag = false;


                    track.classList.add(
                        "is-dragging"
                    );


                    if (
                        track.setPointerCapture
                    ) {

                        track.setPointerCapture(
                            event.pointerId
                        );

                    }
                }
            );

            track.addEventListener(
                "pointermove",
                (event) => {

                    if (!isPointerDown) {
                        return;
                    }

                    const deltaX =
                        event.clientX -
                        startX;

                    const deltaY =
                        event.clientY -
                        startY;

                    if (
                        Math.abs(deltaX) >
                        Math.abs(deltaY)
                    ) {

                        if (
                            Math.abs(deltaX) >
                            10
                        ) {

                            didDrag = true;

                        }

                    }

                }
            );

            track.addEventListener(
                "pointerup",
                (event) => {

                    if (!isPointerDown) {
                        return;
                    }


                    const deltaX =
                        event.clientX -
                        startX;

                    const deltaY =
                        event.clientY -
                        startY;


                    isPointerDown = false;


                    track.classList.remove(
                        "is-dragging"
                    );

                    if (
                        Math.abs(deltaX) <=
                        Math.abs(deltaY)
                    ) {

                        return;

                    }

                    if (
                        Math.abs(deltaX) <
                        swipeThreshold
                    ) {
                        return;
                    }

                    if (deltaX < 0) {

                        showNext();

                    } else {

                        showPrevious();

                    }

                }
            );

            track.addEventListener(
                "pointercancel",
                () => {

                    isPointerDown = false;

                    track.classList.remove(
                        "is-dragging"
                    );

                }
            );

            track.addEventListener(
                "click",
                (event) => {

                    if (didDrag) {

                        event.preventDefault();
                        event.stopPropagation();

                        didDrag = false;

                    }

                },
                true
            );

        }

        updateCarousel();
    });
}
    
    /* =========================================
       RYLIM MEDIA CAROUSEL
    ========================================= */

    function setupRylimCarousel() {

        const carousels =
            document.querySelectorAll(
                ".rylim-carousel"
            );

        carousels.forEach((carousel) => {

            const slides =
                carousel.querySelectorAll(
                    ".rylim-slide"
                );

            const previousButton =
                carousel.querySelector(
                    ".rylim-prev"
                );

            const nextButton =
                carousel.querySelector(
                    ".rylim-next"
                );

            const indicators =
                carousel.parentElement.querySelectorAll(
                    ".rylim-dot"
                );

            if (
                slides.length === 0 ||
                !previousButton ||
                !nextButton
            ) {
                return;
            }


            let currentIndex = 0;


            /* =====================================
               SHOW CURRENT SLIDE
            ===================================== */

            function showSlide(index) {

                currentIndex = index;


                slides.forEach(
                    (slide, slideIndex) => {

                        const isActive =
                            slideIndex === currentIndex;

                        slide.classList.toggle(
                            "active",
                            isActive
                        );


                        /*
                         * Pause any video when its
                         * slide is no longer active.
                         */

                        const video =
                            slide.querySelector(
                                "video"
                            );

                        if (
                            video &&
                            !isActive
                        ) {

                            video.pause();

                        }

                    }
                );


                /* Update indicators */

                indicators.forEach(
                    (dot, dotIndex) => {

                        dot.classList.toggle(
                            "active",
                            dotIndex === currentIndex
                        );

                    }
                );

            }


            /* =====================================
               PREVIOUS SLIDE
            ===================================== */

            previousButton.addEventListener(
                "click",
                () => {

                    currentIndex =
                        (
                            currentIndex -
                            1 +
                            slides.length
                        ) %
                        slides.length;

                    showSlide(
                        currentIndex
                    );

                }
            );


            /* =====================================
               NEXT SLIDE
            ===================================== */

            nextButton.addEventListener(
                "click",
                () => {

                    currentIndex =
                        (
                            currentIndex +
                            1
                        ) %
                        slides.length;

                    showSlide(
                        currentIndex
                    );

                }
            );


            /* =====================================
               CAROUSEL INDICATORS
            ===================================== */

            indicators.forEach(
                (dot, dotIndex) => {

                    dot.addEventListener(
                        "click",
                        () => {

                            if (
                                dotIndex >=
                                slides.length
                            ) {
                                return;
                            }

                            showSlide(
                                dotIndex
                            );

                        }
                    );

                }
            );

            showSlide(0);

        });

    }

/* =========================================
   LEADERSHIP IMAGE SLIDESHOW
========================================= */

function setupLeadershipSlideshow() {

    const slideshows =
        document.querySelectorAll(
            ".leadership-slideshow"
        );


    slideshows.forEach((slideshow) => {

        const slides =
            Array.from(
                slideshow.querySelectorAll("img")
            );


        if (slides.length <= 1) {
            return;
        }


        const interval =
            parseInt(
                slideshow.dataset.interval,
                10
            ) || 3000;


        let currentIndex = 0;


        function showSlide(index) {

            slides.forEach(
                (slide, slideIndex) => {

                    slide.classList.toggle(
                        "active",
                        slideIndex === index
                    );

                }
            );

        }


        showSlide(currentIndex);


        setInterval(() => {

            currentIndex =
                (
                    currentIndex + 1
                ) % slides.length;


            showSlide(currentIndex);

        }, interval);

    });

}
  /* =========================================
   LEADERSHIP CAROUSEL
========================================= */

function setupLeadershipCarousel() {

    const carousels =
        document.querySelectorAll(
            ".leadership-grid"
        );


    carousels.forEach((carousel) => {

        const cards =
            Array.from(
                carousel.querySelectorAll(
                    ".leadership-card"
                )
            );

        const previousButton =
            carousel.querySelector(
                ".leadership-prev"
            );

        const nextButton =
            carousel.querySelector(
                ".leadership-next"
            );

        const section =
            carousel.closest(
                "#leadership"
            );

        const dots =
            section
                ? Array.from(
                    section.querySelectorAll(
                        ".leadership-dot"
                    )
                )
                : [];


        if (
            cards.length === 0 ||
            !previousButton ||
            !nextButton
        ) {
            return;
        }


        let currentIndex = 0;

        function getIndex(offset) {

            return (
                currentIndex +
                offset +
                cards.length
            ) % cards.length;

        }

        function updateCarousel() {

            const previousIndex =
                getIndex(-1);

            const centerIndex =
                getIndex(0);

            const nextIndex =
                getIndex(1);


            cards.forEach(
                (card, index) => {

                    card.classList.remove(
                        "leadership-card-left",
                        "leadership-card-center",
                        "leadership-card-right"
                    );


                    if (
                        index === previousIndex
                    ) {

                        card.classList.add(
                            "leadership-card-left"
                        );

                    } else if (
                        index === centerIndex
                    ) {

                        card.classList.add(
                            "leadership-card-center"
                        );

                    } else if (
                        index === nextIndex
                    ) {

                        card.classList.add(
                            "leadership-card-right"
                        );

                    }

                }
            );


            updateDots();

        }


        function updateDots() {

            if (dots.length === 0) {
                return;
            }


            dots.forEach(
                (dot, index) => {

                    dot.classList.toggle(
                        "active",
                        index === currentIndex
                    );

                }
            );

        }


        function showPrevious() {

            currentIndex =
                (
                    currentIndex -
                    1 +
                    cards.length
                ) %
                cards.length;

            updateCarousel();

        }

        function showNext() {

            currentIndex =
                (
                    currentIndex +
                    1
                ) %
                cards.length;

            updateCarousel();

        }

        previousButton.addEventListener(
            "click",
            showPrevious
        );


        nextButton.addEventListener(
            "click",
            showNext
        );

        dots.forEach(
            (dot, dotIndex) => {

                dot.addEventListener(
                    "click",
                    () => {

                        currentIndex =
                            dotIndex;

                        updateCarousel();

                    }
                );

            }
        );

        let startX = 0;
        let startY = 0;
        let isPointerDown = false;
        let didDrag = false;

        const swipeThreshold = 50;


        carousel.addEventListener(
            "pointerdown",
            (event) => {

                if (
                    event.pointerType === "mouse" &&
                    event.button !== 0
                ) {
                    return;
                }


                if (
                    event.target.closest(
                        "a, button"
                    )
                ) {
                    return;
                }


                startX =
                    event.clientX;

                startY =
                    event.clientY;

                isPointerDown = true;
                didDrag = false;


                carousel.classList.add(
                    "is-dragging"
                );


                if (
                    carousel.setPointerCapture
                ) {

                    carousel.setPointerCapture(
                        event.pointerId
                    );

                }

            }
        );


        carousel.addEventListener(
            "pointermove",
            (event) => {

                if (!isPointerDown) {
                    return;
                }


                const deltaX =
                    event.clientX -
                    startX;

                const deltaY =
                    event.clientY -
                    startY;


                if (
                    Math.abs(deltaX) >
                    Math.abs(deltaY)
                ) {

                    if (
                        Math.abs(deltaX) >
                        10
                    ) {

                        didDrag = true;

                    }

                }

            }
        );


        carousel.addEventListener(
            "pointerup",
            (event) => {

                if (!isPointerDown) {
                    return;
                }

                const deltaX =
                    event.clientX -
                    startX;

                const deltaY =
                    event.clientY -
                    startY;

                isPointerDown = false;

                carousel.classList.remove(
                    "is-dragging"
                );
                if (
                    Math.abs(deltaX) <=
                    Math.abs(deltaY)
                ) {

                    return;

                }

                if (
                    Math.abs(deltaX) <
                    swipeThreshold
                ) {

                    return;

                }

                if (deltaX < 0) {

                    showNext();
                }

                else {

                    showPrevious();

                }

            }
        );


        carousel.addEventListener(
            "pointercancel",
            () => {

                isPointerDown = false;

                carousel.classList.remove(
                    "is-dragging"
                );

            }
        );

        carousel.addEventListener(
            "click",
            (event) => {

                if (didDrag) {
                    event.preventDefault();
                    event.stopPropagation();
                    didDrag = false;
                }

            },
            true
        );

        updateCarousel();
    });

}

 /* =========================================
   THEME TOGGLE
========================================= */

function setupThemeToggle() {

    const themeToggle =
        document.getElementById(
            "themeToggle"
        );

    const themeToggleIcon =
        document.getElementById(
            "themeToggleIcon"
        );

    if (
        !themeToggle ||
        !themeToggleIcon
    ) {
        return;
    }


    let themeTransitioning = false;


    /* =====================================
       UPDATE THEME BUTTON
    ===================================== */

    function updateThemeButton(isLightMode) {

        if (isLightMode) {

            themeToggleIcon.textContent =
                "☀";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to dark mode"
            );

        } else {

            themeToggleIcon.textContent =
                "☾";

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


    /* =====================================
       RESTORE SAVED THEME
    ===================================== */

    const savedTheme =
        localStorage.getItem(
            "theme"
        );

    const initialLightMode =
        savedTheme === "light";


    if (initialLightMode) {

        document.body.classList.add(
            "light-mode"
        );

    } else {

        document.body.classList.remove(
            "light-mode"
        );

    }


    updateThemeButton(
        initialLightMode
    );


    /* =====================================
       THEME CIRCLE TRANSITION
    ===================================== */

   themeToggle.addEventListener("click", async () => {

    if (themeTransitioning) {
        return;
    }

    themeTransitioning = true;

    const currentlyLight =
    document.body.classList.contains("light-mode");

const targetLightMode =
    !currentlyLight;


const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

if (prefersReducedMotion) {

    document.body.classList.toggle(
        "light-mode",
        targetLightMode
    );

    localStorage.setItem(
        "theme",
        targetLightMode
            ? "light"
            : "dark"
    );

    updateThemeButton(
        targetLightMode
    );

    themeTransitioning = false;

    return;
}



    /* =====================================
       GET BUTTON POSITION
    ===================================== */

    const buttonRect =
        themeToggle.getBoundingClientRect();

    const centerX =
        buttonRect.left +
        buttonRect.width / 2;

    const centerY =
        buttonRect.top +
        buttonRect.height / 2;


    /* =====================================
       CALCULATE CIRCLE SIZE
    ===================================== */

    const maxX =
        Math.max(
            centerX,
            window.innerWidth - centerX
        );

    const maxY =
        Math.max(
            centerY,
            window.innerHeight - centerY
        );

    const radius =
        Math.hypot(maxX, maxY);


    /* =====================================
       CHANGE THEME
    ===================================== */

    const changeTheme = () => {

        document.body.classList.toggle(
            "light-mode",
            targetLightMode
        );

        localStorage.setItem(
            "theme",
            targetLightMode
                ? "light"
                : "dark"
        );

        updateThemeButton(
            targetLightMode
        );
    };


    /* =====================================
       START VIEW TRANSITION
    ===================================== */

    if (!document.startViewTransition) {

        changeTheme();

        themeTransitioning = false;

        return;
    }


    const transition =
        document.startViewTransition(
            changeTheme
        );


    /* =====================================
       CIRCULAR REVEAL
    ===================================== */

    await transition.ready;


    document.documentElement.animate(
        {
            clipPath: [
                `circle(0px at ${centerX}px ${centerY}px)`,

                `circle(${radius}px at ${centerX}px ${centerY}px)`
            ]
        },
        {
    duration: 750,

    easing:
        "cubic-bezier(.76, 0, .24, 1)",

    fill: "both",

    pseudoElement:
        "::view-transition-new(root)"
}
    );


    /* =====================================
       WAIT UNTIL FINISHED
    ===================================== */

    await transition.finished;

    themeTransitioning = false;

});
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

        if (
            !resumeButton ||
            !resumeModal
        ) {
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


    /*
     * Intro duration:
     * 7 seconds gives enough time for the
     * animations without making the opening
     * feel too long.
     */

    const INTRO_DURATION = 4500;


    /* =====================================
       START INTRO ANIMATIONS
    ===================================== */

    requestAnimationFrame(() => {

        introScreen.classList.add(
            "intro-start"
        );

    });


    /* =====================================
       HIDE INTRO
    ===================================== */

    setTimeout(() => {

        introScreen.classList.add(
            "hidden"
        );


        /*
         * Remove the intro from the page
         * after the fade-out finishes.
         */

        setTimeout(() => {

            introScreen.style.display =
                "none";

        }, 1000);

    }, INTRO_DURATION);

}


    /* =========================================
       MEDIA / COPY PROTECTION
    ========================================= */

    function setupMediaProtection() {

        /* =====================================
           PREVENT IMAGE / VIDEO DRAGGING
        ===================================== */

        const media =
            document.querySelectorAll(
                "img, video"
            );

        media.forEach((element) => {

            element.setAttribute(
                "draggable",
                "false"
            );

            element.addEventListener(
                "dragstart",
                (event) => {

                    event.preventDefault();

                }
            );

        });


        /* =====================================
           PREVENT RIGHT-CLICK
        ===================================== */

        document.addEventListener(
            "contextmenu",
            (event) => {

                event.preventDefault();

            }
        );


        /* =====================================
           PREVENT COPYING / CUTTING
        ===================================== */

        document.addEventListener(
            "copy",
            (event) => {

                event.preventDefault();

            }
        );

        document.addEventListener(
            "cut",
            (event) => {

                event.preventDefault();

            }
        );


        /* =====================================
           PREVENT PASTE
        ===================================== */

        document.addEventListener(
            "paste",
            (event) => {

                event.preventDefault();

            }
        );


        /* =====================================
           DISABLE COMMON KEYBOARD SHORTCUTS
        ===================================== */

        document.addEventListener(
            "keydown",
            (event) => {

                const key =
                    event.key.toLowerCase();

                const modifier =
                    event.ctrlKey ||
                    event.metaKey;

                if (!modifier) {
                    return;
                }


                /* Copy */

                if (key === "c") {
                    event.preventDefault();
                }


                /* Cut */

                if (key === "x") {
                    event.preventDefault();
                }


                /* Select All */

                if (key === "a") {
                    event.preventDefault();
                }


                /* Save Page */

                if (key === "s") {
                    event.preventDefault();
                }

            }
        );

    }


    /* =========================================
       INITIALIZE
    ========================================= */

    setupResumeModal();

    setupIntroScreen();

    setupThemeToggle();

    loadSections();

});
