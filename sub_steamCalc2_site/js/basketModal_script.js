const cards = document.querySelector(".payment_method_card"),
    soloCards = document.querySelectorAll(".payment_method_soloCard"),
    soloCardCards = document.querySelector(".payment_method_cards"),
    soloCardQiwi = document.querySelector(".payment_method_qiwi"),
    soloCardUsdt = document.querySelector(".payment_method_usdt"),
    /// Переменные, которые можно изменять под разные карточки
    frstTextContent = document.querySelector(".qiwi_wallet_number_span_1"),
    scndUnderTextInContent = document.querySelector(
        ".qiwi_wallet_number_span_2"
    ),
    rightTextInFooter = document.querySelector(
        ".sub_footer_sub_main_basket_right_withdrawal_method_2"
    ),
    /// Переменная, которые нужны только для карточки вида: Card
    inputInContentForCards = document.querySelector(
        ".card_wallet_number_input"
    ),
    /// Переменная, которые нужны только для карточки вида: USDT
    addFieldInFooterUsdt = document.querySelector(
        ".sub_footer_sub_main_basket_right_2_usdt"
    ),
    /// Переменная, которая нужны только для карточек вида: QIWI & USDT
    inputInContentForQiwiAndUsdt = document.querySelector(
        ".qiwi_wallet_number_input"
    );

/// Фун-ия, которая при клике на блок: Cards, изменяет содержимое модального окна на должное содержимое для Cards.
function changeContentForCard() {
    frstTextContent.textContent = "Выберите карту";
    inputInContentForCards.style.display = "flex";
    inputInContentForQiwiAndUsdt.style.display = "none";
    scndUnderTextInContent.textContent =
        "Если у вас еще не привязана карта, то вы можете добавить карту в личном кабинете в разделе “Платежные реквизиты”.";
    rightTextInFooter.textContent = "CARDS";
    addFieldInFooterUsdt.style.display = "none";
}

/// Фун-ия, которая при клике на блок: QIWI, изменяет содержимое модального окна на должное содержимое для QIWI.
function changeContentForQiwi() {
    frstTextContent.textContent = "Ваш номер QIWI кошелька";
    inputInContentForCards.style.display = "none";
    inputInContentForQiwiAndUsdt.style.display = "flex";
    inputInContentForQiwiAndUsdt.value = "565556565656522";
    scndUnderTextInContent.textContent =
        "Если у вас еще не добавлен номер QIWI кошелька, то вы можете добавить его в личном кабинете в разделе “Платежные реквизиты”.";
    rightTextInFooter.textContent = "QIWI кошелек";
    addFieldInFooterUsdt.style.display = "none";
    subInputContent.classList.add("sub_choice_card_2");
}

/// Фун-ия, которая при клике на блок: USDT, изменяет содержимое модального окна на должное содержимое для USDT.
function changeContentForUsdt() {
    frstTextContent.textContent = "Ваш номер TRC-20 кошелька";
    inputInContentForCards.style.display = "none";
    inputInContentForQiwiAndUsdt.style.display = "flex";
    inputInContentForQiwiAndUsdt.value = "8848484848848484";
    scndUnderTextInContent.textContent =
        "Если у вас еще не добавлен номер TRC-20 кошелька, то вы можете добавить его в личном кабинете в разделе “Платежные реквизиты”.";
    rightTextInFooter.textContent = "CARDS";
    addFieldInFooterUsdt.style.display = "block";
    subInputContent.classList.add("sub_choice_card_2");
}

/// Общий обработчик событий, который позволяет пользователю переключаться между блоками выбора платежных средств. (Реализованный через делегирование событий)
cards.addEventListener("click", function (event) {
    event.preventDefault();
    const unique = event.target.closest(".payment_method_soloCard");
    soloCards.forEach((card) => card.classList.remove("payment_method_active"));
    if (!unique) return;
    unique.classList.add("payment_method_active");
    if (soloCardCards.classList.contains("payment_method_active")) {
        changeContentForCard();
    } else if (soloCardQiwi.classList.contains("payment_method_active")) {
        changeContentForQiwi();
    } else if (soloCardUsdt.classList.contains("payment_method_active")) {
        changeContentForUsdt();
    }
});

/// Открытие pop-up'а с выбором банковских карт (в блоке Cards)

const bottomArrowForInput = document.querySelector(
        ".card_wallet_number_input_svg"
    ),
    subInputContent = document.querySelector(".sub_choice_card_2");

bottomArrowForInput.addEventListener("click", () => {
    subInputContent.classList.toggle("sub_choice_card_2");
});

/// Переключение банковских карт в pop-up'е

const cardsItems = document.querySelectorAll(".sub_choice_card_2_block_span_2"),
    parentBlockForCardsItems = document.querySelector(
        ".qiwi_wallet_number_span"
    );

/// Реализации переключения через делегирование событий

parentBlockForCardsItems.addEventListener("click", function (event) {
    event.preventDefault();
    const unique = event.target.closest(".sub_choice_card_2_block_span_2 ");
    if (!unique) return;
    cardsItems.forEach((cardsItem) =>
        cardsItem.classList.remove("sub_choice_card_2_block_span_2_active")
    );
    unique.classList.add("sub_choice_card_2_block_span_2_active");
    document.querySelector(".qiwi_wallet_number_input_Cards").value =
        unique.innerHTML;
});

/// Релизация открытия pop-up'ов после нажатия на кнопку "Получить деньги"
function deleteContentBasketModalForButtonDeleteAll() {
    if (!isModalOpen) {
        basketModal.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        /// Добавление эффекта пустой корзины, после того, как пользователь продал товары
        document.querySelector(".sub_main_basket_right").style.filter =
            "brightness(65%)";
        document.querySelector(
            ".header_sub_main_basket_right_span4"
        ).textContent = "0";
        document.querySelector(
            ".sub_footer_sub_main_basket_right_withdrawal_method_2_dollars"
        ).textContent = "$ 0";
        document.querySelector(
            ".sub_footer_sub_main_basket_right_withdrawal_method_2_usdt"
        ).textContent = "USDT 0";
        document.querySelector(
            ".sub_footer_sub_main_basket_right_withdrawal_method_23"
        ).textContent = "$ 0";
        document.querySelector(".total_goods_span_2").textContent = "0";
        ///Удаление карточек товаров
        document
            .querySelector(".sub_main_basket_left_sub_card")
            .classList.add("sub_main_basket_left_sub_card_hidden");
        document
            .querySelector(".sub_main_basket_left_card_empty")
            .classList.add("sub_main_basket_left_card_empty_notHidden");
        isModalOpen = true;
    } else {
        document
            .querySelector(".error_loading")
            .classList.add("error_loading_notHidden");
        overlay_forBasketModal.classList.remove(
            "hidden_overlay_forBasketModal"
        );
    }
}

document
    .querySelector(".header_sub_main_basket_left_a")
    .addEventListener("click", () => {
        deleteContentBasketModalForButtonDeleteAll();
    });

/// Добавление классов всех, требующихся для реализации открытия pop-up'ов
const buttonGetMoney = document.querySelector(".get_money"),
    popUpLoader = document.querySelector(".new_account"),
    popUpSuccess = document.querySelector(".success_loading"),
    popUpSuccessCloser = document.querySelector(".cross_3_popUp"),
    popUpErorr = document.querySelector(".error_loading"),
    popUpErorrCloser = document.querySelector(".cross_3_popUp_erorr"),
    overlay_forBasketModal = document.querySelector(".overlay_forBasketModal");

let isModalOpen = false; /// Переменная, проверяющая, было ли открыто модальное окно

/// Фун-ия, которая добавляет pop-up'ы после нажатия на кнопку пользователем
function openPopUpForGetMoneyButton() {
    if (!isModalOpen) {
        basketModal.style.overflow = "hidden";
        overlay_forBasketModal.classList.remove(
            "hidden_overlay_forBasketModal"
        );
        // basketModal.style.filter = "brightness(40%)";
        popUpLoader.classList.remove("new_account_hidden");
        const popUpForGetMoneyButton = setTimeout(function () {
            popUpLoader.classList.add("new_account_hidden");
            popUpSuccess.classList.remove("success_loading_hidden");
        }, 2000);
        isModalOpen = true;
    } else {
        basketModal.style.overflow = "hidden";
        overlay_forBasketModal.classList.remove(
            "hidden_overlay_forBasketModal"
        );
        document
            .querySelector(".error_loading")
            .classList.add("error_loading_notHidden");
    }
}

/// Фун-ия, которая скрывает pop-up, а также уделяет содержимое корзины
function closeSuccessPopUpForGetMoneyButton() {
    basketModal.style.overflow = "auto";
    overlay_forBasketModal.classList.add("hidden_overlay_forBasketModal");
    popUpSuccess.classList.add("success_loading_hidden");
    basketModal.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    /// Добавление эффекта пустой корзины, после того, как пользователь продал товары
    document.querySelector(".sub_main_basket_right").style.filter =
        "brightness(65%)";
    document.querySelector(".header_sub_main_basket_right_span4").textContent =
        "0";
    document.querySelector(
        ".sub_footer_sub_main_basket_right_withdrawal_method_2_dollars"
    ).textContent = "$ 0";
    document.querySelector(
        ".sub_footer_sub_main_basket_right_withdrawal_method_2_usdt"
    ).textContent = "USDT 0";
    document.querySelector(
        ".sub_footer_sub_main_basket_right_withdrawal_method_23"
    ).textContent = "$ 0";
    document.querySelector(".total_goods_span_2").textContent = "0";
    ///Удаление карточек товаров
    document
        .querySelector(".sub_main_basket_left_sub_card")
        .classList.add("sub_main_basket_left_sub_card_hidden");
    document
        .querySelector(".sub_main_basket_left_card_empty")
        .classList.add("sub_main_basket_left_card_empty_notHidden");
}

/// Фун-ия закрытия pop-up'а с ошибкой при повторном клике на кнопку: "Получить деньги"
function closeErorrPopUpForGetMoneyButton() {
    popUpErorr.classList.remove("error_loading_notHidden");
    basketModal.style.overflow = "auto";
    overlay_forBasketModal.classList.add("hidden_overlay_forBasketModal");
    basketModal.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

/// Обработчик события при клике на кнопку: "Получить деньги"
buttonGetMoney.addEventListener("click", () => {
    openPopUpForGetMoneyButton();

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeErorrPopUpForGetMoneyButton();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeSuccessPopUpForGetMoneyButton();
        }
    });

    popUpErorrCloser.addEventListener("click", () => {
        closeErorrPopUpForGetMoneyButton();
    });

    popUpSuccessCloser.addEventListener("click", () => {
        closeSuccessPopUpForGetMoneyButton();
    });

    overlay_forBasketModal.addEventListener("click", () => {
        /// Проверка на наличие pop-up'а с загрузкой
        if (
            popUpLoader.classList.contains("new_account_hidden") &&
            !popUpSuccess.classList.contains("success_loading_hidden")
        ) {
            closeSuccessPopUpForGetMoneyButton();
        }
    });

    overlay_forBasketModal.addEventListener("click", () => {
        /// Проверка на наличие класса удаленных предметов
        if (popUpLoader.classList.contains("new_account_hidden")) {
            closeErorrPopUpForGetMoneyButton();
        }
    });
});

/// Добавление обработчиков событий на модальное окно с ошибкой загрузки предметов, если пользователь изначально удаляет предметы через кнопку удалить всё

popUpErorrCloser.addEventListener("click", () => {
    closeErorrPopUpForGetMoneyButton();
});

overlay_forBasketModal.addEventListener("click", () => {
    /// Проверка на наличие класса удаленных предметов
    if (popUpLoader.classList.contains("new_account_hidden")) {
        closeErorrPopUpForGetMoneyButton();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeErorrPopUpForGetMoneyButton();
    }
});

/// Увеличение и уменьшение кол-ва карточек на 1-й странице корзины

/// Добавление классов для 1-го число-блока
const textInNumberBlockFrst = document.querySelector(
        ".sub_main_basket_left_solo_card_add_element_block_div_spanFrst"
    ),
    minusInNumberBlockFrst = document.querySelector(
        ".sub_main_basket_left_solo_card_add_element_block_svg_1Frst"
    ),
    plusInNumberBlockFrst = document.querySelector(
        ".sub_main_basket_left_solo_card_add_element_block_svg_2Frst"
    ),
    /// Добавление классов для 2-го число-блока
    textInNumberBlockScnd = document.querySelector(
        ".sub_main_basket_left_solo_card_add_element_block_div_spanScnd"
    ),
    minusInNumberBlockScnd = document.querySelector(
        ".sub_main_basket_left_solo_card_add_element_block_svg_1Scnd"
    ),
    plusInNumberBlockScnd = document.querySelector(
        ".sub_main_basket_left_solo_card_add_element_block_svg_2Scnd"
    );

/// Увеличение значения в число-блоке на 1
function plusNumber(num) {
    if (+num.innerHTML >= 1 && +num.innerHTML < 20) {
        num.textContent = +num.innerHTML + 1;
    } else return;
}

/// Уменьшение значения числа в число-блоке на 1
function minusNumber(num) {
    if (+num.innerHTML > 1) {
        num.textContent = +num.innerHTML - 1;
    } else return;
}

minusInNumberBlockFrst.addEventListener("click", () => {
    minusNumber(textInNumberBlockFrst);
});

plusInNumberBlockFrst.addEventListener("click", () => {
    plusNumber(textInNumberBlockFrst);
});

minusInNumberBlockScnd.addEventListener("click", () => {
    minusNumber(textInNumberBlockScnd);
});

plusInNumberBlockScnd.addEventListener("click", () => {
    plusNumber(textInNumberBlockScnd);
});
