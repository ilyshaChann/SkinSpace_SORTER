/// Фун-нал появления модального окна под кнопкой с валютами
const currencyBlock = document.querySelector(".sub_currency"),
    subCurrencyBlock = document.querySelector(".block_currency"),
    arrow = document.querySelector(".currency_svg"),
    crossMobileModal = document.querySelector(".cross"),
    screenWidth = window.innerWidth;

function openPopUp(arrow, popUpBlock, rotate, notHiddenBlock) {
    arrow.classList.toggle(`${rotate}`);
    popUpBlock.classList.toggle(`${notHiddenBlock}`);
}

currencyBlock.addEventListener("click", function () {
    if (screenWidth >= 1280) {
        openPopUp(
            arrow,
            subCurrencyBlock,
            "currency_svg_rotate",
            "notHidden_block_currency"
        );
    } else {
        openPopUp(
            arrow,
            subCurrencyBlock,
            "currency_svg_rotate",
            "notHidden_block_currency"
        );
        crossMobileModal.addEventListener("click", () => {
            subCurrencyBlock.classList.remove("notHidden_block_currency");
            arrow.classList.remove("currency_svg_rotate");
        });
    }
});

/// Фун-нал крестика у "input"
const input = document.querySelector(".input_promo"),
    inputCross = document.querySelector(".sub_input_link_svg");

inputCross.addEventListener("click", () => {
    (input.value = ""), input.focus();
});

/// Переключение между пунктами pop-up'а с валютами
const parent = document.querySelector(".content_block_currency"),
    allELements = document.querySelectorAll(".any_currency"),
    textMainButton = document.querySelector(".currency_span");

function currencyItems(event, allEl, item, activeItem, textButton) {
    event.preventDefault();
    const unique = event.target.closest(`.${item}`);
    if (unique) {
        allEl.forEach((link) => link.classList.remove(`${activeItem}`));
        unique.classList.add(`${activeItem}`);
        textButton.textContent = unique.textContent;
    } else {
        return;
    }
}

parent.addEventListener("click", function (event) {
    currencyItems(
        event,
        allELements,
        "any_currency",
        "any_currency_active",
        textMainButton
    );
});

/// Фун-нал появления модального окна под кнопкой с фильтрами
const filterButton = document.querySelectorAll(".sub_filter_card"),
    filterBlock = document.querySelector(".special_sub_filter_card"),
    subFilterBlock = document.querySelector(".sub_filters"),
    arrowFilter = document.querySelector(".sub_filter_card_svg"),
    parentBlock = document.querySelector(".desktop_filter");

let currentOpenPopup = null; // Добавляем переменную для отслеживания текущего открытого pop-up'а

parentBlock.addEventListener("click", function (event) {
    event.preventDefault();
    const unique = event.target.closest(".special_sub_filter_card");

    if (unique) {
        if (
            currentOpenPopup !== null &&
            currentOpenPopup !== unique.nextElementSibling
        ) {
            // Если есть открытый pop-up и это не тот, по которому кликнули, закрываем его
            currentOpenPopup.classList.remove("notHidden_sub_fiters");
            currentOpenPopup.previousElementSibling.children[1].classList.remove(
                "sub_filter_card_svg_rotate"
            );
        }

        openPopUp(
            unique.children[1],
            unique.nextElementSibling,
            "sub_filter_card_svg_rotate",
            "notHidden_sub_fiters"
        );

        currentOpenPopup = unique.nextElementSibling; // Обновляем текущий открытый pop-up
    }
});

/// Переключение между пунктами pop-up'а с фильтрами
const parentFilter = document.querySelector(".content_sub_fiters"),
    subFilterPopUp = document.querySelector(".sub_fiters"),
    allFilterElements = document.querySelectorAll(".frst_fiter_span"),
    textMainButtonFilter = document.querySelector(".sub_filter_card_span");

parentBlock.addEventListener("click", function (event) {
    event.preventDefault();
    const unique = event.target.closest(".frst_fiter_span");
    if (unique) {
        currencyItems(
            event,
            allFilterElements,
            "frst_fiter_span",
            "frst_fiter_span_white",
            unique.parentElement.parentElement.previousElementSibling
                .firstElementChild
        );
    } else {
        return;
    }
});

/// Фун-нал крестика у картинки на "главной" части сайта
const crossMainPicture = document.querySelector(".headband_svg"),
    mainPictureSection = document.querySelector(".headband_section");

crossMainPicture.addEventListener("click", () => {
    mainPictureSection.classList.add("headband_section_close");
    setTimeout(() => {
        mainPictureSection.style.display = "none";
    }, 150);
});

/// Модальное окно с авторизацией
const modalAuthorization = document.querySelector(".authorization"),
    buttonOpenModal = document.querySelector(".open_steam_button"),
    overlay = document.querySelector(".overlay"),
    closeModal = document.querySelector(".cross_3"),
    parentHtml = document.querySelector("html");

/// Фун-ия, открывающая модальное окно: Авторизация
function openModalFn(modal, openClass, overlay, parentToClose) {
    modal.classList.toggle(`${openClass}`);
    overlay.classList.remove("hidden_overlay");
    parentToClose.style.overflow = "hidden";
}

/// Фун-ия, закрывающая модальное окно: Авторизация
function closeModalFn(modal, closeClass, overlay, parentToClose) {
    modal.classList.remove(`${closeClass}`);
    overlay.classList.add("hidden_overlay");
    parentToClose.style.overflow = "auto";
}

/// Обработчик события при клике на кнопку: "Войти через стим"
buttonOpenModal.addEventListener("click", () => {
    openModalFn(modalAuthorization, "open_authorization", overlay, parentHtml);

    closeModal.addEventListener("click", () => {
        closeModalFn(
            modalAuthorization,
            "open_authorization",
            overlay,
            parentHtml
        );
    });

    overlay.addEventListener("click", () => {
        closeModalFn(
            modalAuthorization,
            "open_authorization",
            overlay,
            parentHtml
        );
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeModalFn(
                modalAuthorization,
                "open_authorization",
                overlay,
                parentHtml
            );
        }
    });
});

/// Модальное окно: Корзина
const basketButton = document.querySelector(".basket"),
    basketButtonClose = document.querySelector(
        ".header_sub_main_basket_right_svgMobile"
    ),
    basketModal = document.querySelector(".main_basket_1"),
    headerSection = document.querySelector("header"),
    filterSection = document.querySelector(".filter");

let scrollListener;

/// Фун-ия, открывающая модальное окно: Корзина
function openBasketModal() {
    basketModal.classList.toggle("main_basket_1_active");
    overlay.classList.remove("hidden_overlay");
    parentHtml.style.overflow = "hidden";
    headerSection.scrollIntoView({ behavior: "smooth" });
}

/// Фун-ия, закрывающая модальное окно: Корзина
function closeBasketModal() {
    basketModal.classList.remove("main_basket_1_active");
    overlay.classList.add("hidden_overlay");
    parentHtml.style.overflow = "auto";
    filterSection.scrollIntoView({ behavior: "smooth" });
}

/// Обработчик события при клике на иконку корзины
basketButton.addEventListener("click", () => {
    openBasketModal();

    basketButtonClose.addEventListener("click", () => {
        closeBasketModal();
    });

    /// Обработчик события, который скрывает корзину, при клике на крестик (мобильная версия)
    document
        .querySelector(".header_sub_main_basket_left_svgMobile")
        .addEventListener("click", () => {
            closeBasketModal();
        });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeBasketModal();
        }
    });

    overlay.addEventListener("click", function closeBasketOnOverlay() {
        closeBasketModal();
        overlay.removeEventListener("click", closeBasketOnOverlay);
    });
});

/// Модальное окно для всех кнопок, после нажатиях на которые потребуется воздействие backend'а

/// Фун-ия, открывающая общее модальное окно
function openGeneralModal() {
    document.querySelector("header").scrollIntoView({ behavior: "smooth" });
    document
        .querySelector(".popUp_inDeveloping")
        .classList.add("popUp_inDeveloping_notHidden");
    overlay.classList.remove("hidden_overlay");
    parentHtml.style.overflow = "hidden";
}

/// Фун-ия, закрывающая общее модальное окно
function closeGeneralModal() {
    /// Проверка на то, открыта ли основная картинка на главной странице. Это нужно для того, чтобы понимать, надо страницу скроллить к верху или нет
    if (!mainPictureSection.classList.contains("headband_section_close")) {
        document
            .querySelector(".basic_text")
            .scrollIntoView({ behavior: "smooth" });
        overlay.classList.add("hidden_overlay");
        parentHtml.style.overflow = "auto";
        document
            .querySelector(".popUp_inDeveloping")
            .classList.remove("popUp_inDeveloping_notHidden");
    } else {
        overlay.classList.add("hidden_overlay");
        parentHtml.style.overflow = "auto";
        document
            .querySelector(".popUp_inDeveloping")
            .classList.remove("popUp_inDeveloping_notHidden");
    }
}

/// Дополнительная фун-ия, для решения бага, при котором после закрытия общего модального окна, пользователя скроллило к определённой секции
function closeGeneralModalForHeaderButton() {
    overlay.classList.add("hidden_overlay");
    parentHtml.style.overflow = "auto";
    document
        .querySelector(".popUp_inDeveloping")
        .classList.remove("popUp_inDeveloping_notHidden");
}

/// Обработчик события при клике на кнопку: "Узнать стоимость"
document.querySelector(".price_button").addEventListener("click", () => {
    openGeneralModal();

    document
        .querySelector(".popUp_inDeveloping_btn")
        .addEventListener("click", () => {
            closeGeneralModal();
        });

    overlay.addEventListener("click", () => {
        closeGeneralModal();
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeGeneralModal();
        }
    });
});

/// Обработчик события при клике на кнопку в модальном окне: "Войти через стим"
document.querySelector(".login_via_steam").addEventListener("click", () => {
    closeModalFn(modalAuthorization, "open_authorization", overlay, parentHtml);
    openGeneralModal();

    document
        .querySelector(".popUp_inDeveloping_btn")
        .addEventListener("click", () => {
            closeGeneralModalForHeaderButton();
        });

    overlay.addEventListener("click", () => {
        closeGeneralModalForHeaderButton();
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeGeneralModalForHeaderButton();
        }
    });
});

/// Фун-нал переключения кнопки: "Добавить в корзину" на текст: "Добавлено" через обычный цикл

document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", function (event) {
        event.preventDefault();
        const unique = event.target.closest(".B_link_card_1");
        if (!unique) return;
        unique.classList.remove("B_link_card_1");
        unique.classList.add("B_link_card_3");
        unique.textContent = "добавлено";
        // insertAdjacentHTML(
        //     "beforeend",
        //     "<p class='B_link_card_3'>Добавлено</p>"
        // );
    });
});
