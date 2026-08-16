/* =========================================
   SMK NEGERI 1 TANJUNGPANDAN
   MAIN JAVASCRIPT
========================================= */


// =========================================
// SELECTOR
// =========================================

const $ = (selector) => {
    return document.querySelector(selector);
};

const $$ = (selector) => {
    return document.querySelectorAll(selector);
};


// =========================================
// LOADING
// =========================================

window.addEventListener("load", () => {

    const loading = $("#loading");

    setTimeout(() => {

        if (loading) {
            loading.classList.add("hide");
        }

    }, 800);

});


// =========================================
// NAVBAR
// =========================================

const navbar = $("#navbar");

window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 30) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


// =========================================
// MOBILE MENU
// =========================================

const menuButton = $("#menuButton");
const navigation = $("#navigation");

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        navigation.classList.toggle("open");

    });

}


// Tutup menu ketika link diklik

$$(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        if (navigation) {
            navigation.classList.remove("open");
        }

    });

});


// =========================================
// ACTIVE NAVIGATION
// =========================================

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            current = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${current}`
        ) {

            link.classList.add("active");

        }

    });

});


// =========================================
// REVEAL ANIMATION
// =========================================

const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


$$(".reveal").forEach(element => {

    revealObserver.observe(element);

});


// =========================================
// STATISTICS COUNTER
// =========================================

const statistics =
    document.querySelectorAll(
        "[data-number]"
    );


let counterStarted = false;


const counterObserver =
    new IntersectionObserver(
        (entries) => {

            if (
                entries[0].isIntersecting &&
                !counterStarted
            ) {

                counterStarted = true;

                statistics.forEach(element => {

                    const target =
                        Number(
                            element.dataset.number
                        );

                    let number = 0;

                    const increment =
                        Math.max(
                            1,
                            Math.ceil(target / 50)
                        );


                    const counter =
                        setInterval(() => {

                            number += increment;

                            if (number >= target) {

                                number = target;

                                clearInterval(
                                    counter
                                );

                            }


                            if (target >= 100) {

                                element.textContent =
                                    number + "+";

                            } else {

                                element.textContent =
                                    number;

                            }

                        }, 25);

                });

            }

        },
        {
            threshold: 0.5
        }
    );


const statsContainer =
    $(".statistics");

if (statsContainer) {

    counterObserver.observe(
        statsContainer
    );

}


// =========================================
// FILTER JURUSAN
// =========================================

const filters =
    document.querySelectorAll(
        ".filter"
    );

const programs =
    document.querySelectorAll(
        ".program-card"
    );


filters.forEach(filter => {

    filter.addEventListener(
        "click",
        () => {

            // Hilangkan active

            filters.forEach(button => {

                button.classList.remove(
                    "active"
                );

            });


            // Aktifkan tombol

            filter.classList.add(
                "active"
            );


            const category =
                filter.dataset.filter;


            programs.forEach(program => {

                const programCategory =
                    program.dataset.category;


                if (
                    category === "all" ||
                    category ===
                    programCategory
                ) {

                    program.classList.remove(
                        "hide"
                    );

                } else {

                    program.classList.add(
                        "hide"
                    );

                }

            });

        }
    );

});


// =========================================
// MODAL
// =========================================

const modal = $("#modal");

const modalTitle =
    $("#modalTitle");

const modalText =
    $("#modalText");

const modalLabel =
    $("#modalLabel");

const modalClose =
    $("#modalClose");

const modalButton =
    $("#modalButton");


function openModal(
    title,
    text,
    label = "INFORMASI"
) {

    if (!modal) return;

    modalTitle.textContent =
        title;

    modalText.textContent =
        text;

    modalLabel.textContent =
        label;

    modal.classList.add(
        "show"
    );

    document.body.classList.add(
        "no-scroll"
    );

}


function closeModal() {

    if (!modal) return;

    modal.classList.remove(
        "show"
    );

    document.body.classList.remove(
        "no-scroll"
    );

}


// Tombol close

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeModal
    );

}


// Tombol modal

if (modalButton) {

    modalButton.addEventListener(
        "click",
        closeModal
    );

}


// Klik background modal

if (modal) {

    modal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === modal
            ) {

                closeModal();

            }

        }
    );

}


// ESC

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            closeModal();

        }

    }
);


// =========================================
// PORTAL SISWA
// =========================================

const portalButton =
    $("#portalButton");


if (portalButton) {

    portalButton.addEventListener(
        "click",
        () => {

            openModal(

                "Portal Siswa",

                "Portal siswa dapat dikembangkan menjadi sistem login, absensi, jadwal pelajaran, nilai, pengumuman, dan berbagai layanan akademik.",

                "PORTAL DIGITAL"

            );

        }
    );

}


// =========================================
// PENDAFTARAN
// =========================================

const registrationButton =
    $("#registrationButton");


if (registrationButton) {

    registrationButton.addEventListener(
        "click",
        () => {

            openModal(

                "Informasi Pendaftaran",

                "Bagian ini dapat dikembangkan menjadi sistem PPDB online lengkap dengan formulir pendaftaran, persyaratan, jadwal, dan status seleksi.",

                "PPDB"

            );

        }
    );

}


// =========================================
// DETAIL PROGRAM KEAHLIAN
// =========================================

const programInformation = {

    RPL:
        "Rekayasa Perangkat Lunak mempelajari pemrograman, website, aplikasi, database, UI/UX, dan pengembangan software.",

    DKV:
        "Desain Komunikasi Visual mempelajari desain grafis, branding, ilustrasi, fotografi, video, dan animasi.",

    MPLB:
        "Manajemen Perkantoran mempelajari administrasi, pelayanan, komunikasi bisnis, dan teknologi perkantoran.",

    AKL:
        "Akuntansi dan Keuangan mempelajari pencatatan transaksi, laporan keuangan, perpajakan, dan aplikasi akuntansi.",

    TITL:
        "Teknik Instalasi Tenaga Listrik mempelajari instalasi, pemeliharaan, keselamatan kerja, dan sistem kelistrikan.",

    TKR:
        "Teknik Kendaraan Ringan mempelajari perawatan kendaraan, diagnosis kerusakan, dan teknologi otomotif."

};


const detailButtons =
    document.querySelectorAll(
        ".detail-button"
    );


detailButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const program =
                button.dataset.program;


            openModal(

                `Program ${program}`,

                programInformation[
                    program
                ],

                "PROGRAM KEAHLIAN"

            );

        }
    );

});


// =========================================
// BACK TO TOP
// =========================================

const backTop =
    $("#backTop");


window.addEventListener(
    "scroll",
    () => {

        if (!backTop) return;


        if (
            window.scrollY > 500
        ) {

            backTop.classList.add(
                "show"
            );

        } else {

            backTop.classList.remove(
                "show"
            );

        }

    }
);


if (backTop) {

    backTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


// =========================================
// TAHUN FOOTER
// =========================================

const year =
    $("#year");


if (year) {

    year.textContent =
        new Date().getFullYear();

}


// =========================================
// ANIMASI MOUSE
// =========================================

document.addEventListener(
    "mousemove",
    (event) => {

        const logo =
            $(".logo-card");

        if (!logo) return;


        const x =
            (window.innerWidth / 2 -
            event.clientX) / 70;

        const y =
            (window.innerHeight / 2 -
            event.clientY) / 70;


        logo.style.transform =
            `translate(${x}px, ${y}px)`;

    }
);


// =========================================
// LOG
// =========================================

console.log(
    "SMK Negeri 1 Tanjungpandan Website aktif 🚀"
);