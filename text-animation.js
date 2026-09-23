document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       TEXT REVEAL ANIMATIONS
    ===================================================== */

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

            const textNodes =
                Array.from(heroTitle.childNodes);

            textNodes.forEach((node) => {

                if (node.nodeType === Node.TEXT_NODE) {

                    const text =
                        node.textContent;

                    const fragment =
                        document.createDocumentFragment();

                    [...text].forEach((character) => {

                        if (character === " ") {

                            fragment.appendChild(
                                document.createTextNode(" ")
                            );

                            return;
                        }

                        const span =
                            document.createElement("span");

                        span.className =
                            "text-letter";

                        span.textContent =
                            character;

                        fragment.appendChild(span);

                    });

                    node.replaceWith(fragment);

                }

            });


            const name =
                heroTitle.querySelector("span");

            if (name) {

                const nameText =
                    name.textContent;

                name.innerHTML = "";

                [...nameText].forEach(
                    (character, index) => {

                        const span =
                            document.createElement("span");

                        span.className =
                            "text-letter";

                        span.textContent =
                            character;

                        span.style.animationDelay =
                            `${0.35 + index * 0.06}s`;

                        name.appendChild(span);

                    }
                );

            }

        }


        /* =================================================
           HERO SUBTITLE — FADE UP
        ================================================= */

        if (heroSubtitle) {

            heroSubtitle.classList.add(
                "text-reveal-up",
                "text-delay-3"
            );

        }


        /* =================================================
           HERO DESCRIPTION — WORD REVEAL
        ================================================= */

        if (heroDescription) {

            const text =
                heroDescription.textContent
                    .replace(/\s+/g, " ")
                    .trim();

            heroDescription.innerHTML = "";

            text.split(" ").forEach(
                (word, index) => {

                    const span =
                        document.createElement("span");

                    span.className =
                        "text-word";

                    span.textContent =
                        word;

                    span.style.animationDelay =
                        `${0.55 + index * 0.055}s`;

                    heroDescription.appendChild(span);

                    if (
                        index <
                        text.split(" ").length - 1
                    ) {

                        heroDescription.appendChild(
                            document.createTextNode(" ")
                        );

                    }

                }
            );

        }


        /* =================================================
           SECTION LABELS — FADE UP
        ================================================= */

        document
            .querySelectorAll(".section-label")
            .forEach((element, index) => {

                element.classList.add(
                    "text-reveal-up"
                );

                element.style.animationDelay =
                    `${index * 0.08}s`;

            });


        /* =================================================
           SECTION TITLES — MASK REVEAL
        ================================================= */

        document
            .querySelectorAll(".section-title")
            .forEach((element, index) => {

                element.classList.add(
                    "text-reveal-mask"
                );

                element.style.animationDelay =
                    `${0.15 + index * 0.1}s`;

            });


        /* =================================================
           ABOUT TEXT — FADE UP
        ================================================= */

        document
            .querySelectorAll(
                "#about .section-text"
            )
            .forEach((element, index) => {

                element.classList.add(
                    "text-reveal-up"
                );

                element.style.animationDelay =
                    `${0.35 + index * 0.15}s`;

            });


        /* =================================================
           SKILLS — FADE UP
        ================================================= */

        document
            .querySelectorAll(
                "#skills .skill-card"
            )
            .forEach((card, index) => {

                card.classList.add(
                    "text-reveal-up"
                );

                card.style.animationDelay =
                    `${0.2 + index * 0.08}s`;

            });


        /* =================================================
           EDUCATION — FADE UP
        ================================================= */

        document
            .querySelectorAll(
                "#education .education-item"
            )
            .forEach((item, index) => {

                item.classList.add(
                    "text-reveal-up"
                );

                item.style.animationDelay =
                    `${0.2 + index * 0.15}s`;

            });

    }


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    function waitForSections() {

        if (
            window.portfolioSectionsReady
        ) {

            window.portfolioSectionsReady
                .then(() => {

                    setupTextAnimations();

                });

        } else {

            setupTextAnimations();

        }

    }


    waitForSections();

});
