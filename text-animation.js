document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       TEXT REVEAL ANIMATIONS
    ===================================================== */

    const INTRO_DURATION = 4500;


    function setupTextAnimations() {

        const heroTitle =
            document.querySelector(".hero h1");

        const heroSubtitle =
            document.querySelector(".hero h2");

        const heroDescription =
            document.querySelector(".hero-description");


        /* =================================================
           HERO TITLE — LETTER REVEAL
        ================================================= */

        if (heroTitle) {

            const originalText =
                heroTitle.textContent
                    .replace(/\s+/g, " ")
                    .trim();

            heroTitle.innerHTML = "";

            [...originalText].forEach(
                (character, index) => {

                    const span =
                        document.createElement("span");

                    span.className =
                        "text-letter";

                    span.textContent =
                        character;

                    if (character === " ") {
                        span.classList.add(
                            "text-space"
                        );
                    }

                    span.style.animationDelay =
                        `${0.05 + index * 0.045}s`;

                    heroTitle.appendChild(span);

                }
            );

        }


        /* =================================================
           HERO SUBTITLE — FADE UP
        ================================================= */

        if (heroSubtitle) {

            heroSubtitle.classList.add(
                "text-reveal-up"
            );

            heroSubtitle.style.animationDelay =
                "0.9s";

        }


        /* =================================================
           HERO DESCRIPTION — WORD REVEAL
        ================================================= */

        if (heroDescription) {

            const text =
                heroDescription.textContent
                    .replace(/\s+/g, " ")
                    .trim();

            const words =
                text.split(" ");

            heroDescription.innerHTML = "";

            words.forEach(
                (word, index) => {

                    const span =
                        document.createElement("span");

                    span.className =
                        "text-word";

                    span.textContent =
                        word;

                    span.style.animationDelay =
                        `${1.15 + index * 0.045}s`;

                    heroDescription.appendChild(
                        span
                    );

                    if (
                        index <
                        words.length - 1
                    ) {

                        heroDescription.appendChild(
                            document.createTextNode(" ")
                        );

                    }

                }
            );

        }


        /* =================================================
           HERO BUTTONS
        ================================================= */

        document
            .querySelectorAll(".hero-buttons")
            .forEach((element) => {

                element.classList.add(
                    "text-reveal-up"
                );

                element.style.animationDelay =
                    "2.2s";

            });


        /* =================================================
           HERO CARD
        ================================================= */

        const heroCard =
            document.querySelector(".hero-card");

        if (heroCard) {

            heroCard.classList.add(
                "text-reveal-up"
            );

            heroCard.style.animationDelay =
                "2.4s";

        }


        /* =================================================
           ABOUT SECTION
        ================================================= */

        document
            .querySelectorAll(
                "#about .section-label"
            )
            .forEach((element) => {

                element.classList.add(
                    "text-reveal-up"
                );

                element.style.animationDelay =
                    "0.15s";

            });


        document
            .querySelectorAll(
                "#about .section-title"
            )
            .forEach((element) => {

                element.classList.add(
                    "text-reveal-mask"
                );

                element.style.animationDelay =
                    "0.3s";

            });


        document
            .querySelectorAll(
                "#about .section-text"
            )
            .forEach((element, index) => {

                element.classList.add(
                    "text-reveal-up"
                );

                element.style.animationDelay =
                    `${0.5 + index * 0.15}s`;

            });


        /* =================================================
           SKILLS SECTION
        ================================================= */

        document
            .querySelectorAll(
                "#skills .section-label"
            )
            .forEach((element) => {

                element.classList.add(
                    "text-reveal-up"
                );

                element.style.animationDelay =
                    "0.15s";

            });


        document
            .querySelectorAll(
                "#skills .section-title"
            )
            .forEach((element) => {

                element.classList.add(
                    "text-reveal-mask"
                );

                element.style.animationDelay =
                    "0.3s";

            });


        document
            .querySelectorAll(
                "#skills .skill-card"
            )
            .forEach((card, index) => {

                card.classList.add(
                    "text-reveal-up"
                );

                card.style.animationDelay =
                    `${0.45 + index * 0.08}s`;

            });


        /* =================================================
           EDUCATION SECTION
        ================================================= */

        document
            .querySelectorAll(
                "#education .section-label"
            )
            .forEach((element) => {

                element.classList.add(
                    "text-reveal-up"
                );

                element.style.animationDelay =
                    "0.15s";

            });


        document
            .querySelectorAll(
                "#education .section-title"
            )
            .forEach((element) => {

                element.classList.add(
                    "text-reveal-mask"
                );

                element.style.animationDelay =
                    "0.3s";

            });


        document
            .querySelectorAll(
                "#education .education-item"
            )
            .forEach((item, index) => {

                item.classList.add(
                    "text-reveal-up"
                );

                item.style.animationDelay =
                    `${0.45 + index * 0.15}s`;

            });

    }


    /* =====================================================
       WAIT FOR INTRO
    ===================================================== */

    function startAfterIntro() {

        if (
            sessionStorage.getItem(
                "portfolioIntroPlayed"
            ) === "true"
        ) {

            setupTextAnimations();

            return;

        }


        setTimeout(() => {

            setupTextAnimations();

        }, INTRO_DURATION);

    }


    /* =====================================================
       WAIT FOR DYNAMIC SECTIONS
    ===================================================== */

    if (window.portfolioSectionsReady) {

        window.portfolioSectionsReady.then(() => {

            startAfterIntro();

        });

    } else {

        startAfterIntro();

    }

});
