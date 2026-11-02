
/*
  AEGIS COSPLAY — обработка форм заказа.

  Основа проекта: JavaScript из КР №1.

  Практика №12:
  Адаптивная вёрстка реализована через HTML и CSS.
  JavaScript не управляет расположением элементов.

  Практика №13:
  Доступность модального окна, возврат фокуса,
  проверка полей и атрибут aria-invalid.

  Практика №14:
  Финальная проверка работы форм перед сдачей КР №3.

  Проект учебный: данные на сервер не отправляются.
*/


/* =========================================
   1. ЭЛЕМЕНТЫ МОДАЛЬНОГО ОКНА
   ========================================= */

// Находим модальное окно на главной странице.
const orderDialog = document.getElementById('order-dialog');

// Находим кнопки заказа в карточках товаров.
const orderButtons = document.querySelectorAll('.product-card__button');

// Кнопка закрытия модального окна.
const closeDialogButton = document.getElementById('close-order-dialog');

// Скрытое поле для выбранного товара.
const selectedProductInput = document.getElementById('selected-product');

// Форма внутри модального окна.
const orderForm = document.getElementById('order-form');

// Сообщение об успешном оформлении заказа.
const successMessage = document.getElementById('success-message');

// Запоминаем кнопку, с которой открыли окно.
// Это нужно для возврата фокуса после закрытия.
let lastOrderTrigger = null;


/* =========================================
   2. ОТКРЫТИЕ И ЗАКРЫТИЕ ОКНА
   Практика №13 — доступность
   ========================================= */

// Обработчики добавляем только на тех страницах,
// где действительно существует модальное окно.
if (
    orderDialog &&
    closeDialogButton &&
    selectedProductInput &&
    orderForm &&
    successMessage
) {

    // Перебираем все кнопки «Заказать».
    orderButtons.forEach((button) => {

        // При нажатии сохраняем выбранный товар
        // и открываем модальное окно.
        button.addEventListener('click', () => {

            // Запоминаем кнопку для возврата фокуса.
            lastOrderTrigger = button;

            // Получаем название товара из data-product.
            const productName = button.dataset.product;

            // Передаём название в скрытое поле формы.
            selectedProductInput.value = productName;

            // Скрываем сообщение от предыдущего заказа.
            successMessage.hidden = true;

            // showModal() открывает стандартный HTML-dialog.
            orderDialog.showModal();
        });
    });


    // Практика №13: после закрытия окна возвращаем
    // клавиатурный фокус на кнопку, открывшую его.
    // Событие close возникает и при закрытии через Escape.
    orderDialog.addEventListener('close', () => {

        // Проверяем, что кнопка осталась на странице.
        if (lastOrderTrigger && lastOrderTrigger.isConnected) {
            lastOrderTrigger.focus();
        }
    });


    // Закрываем модальное окно по кнопке «Закрыть».
    closeDialogButton.addEventListener('click', () => {
        orderDialog.close();
    });


    /* =========================================
       3. ПРОВЕРКА ФОРМЫ В МОДАЛЬНОМ ОКНЕ
       Практика №13 — валидация и ARIA
       ========================================= */

    // Обрабатываем отправку формы заказа.
    orderForm.addEventListener('submit', (event) => {

        // Отменяем обычную отправку данных на сервер.
        event.preventDefault();

        // Получаем все элементы формы.
        const formElements = Array.from(orderForm.elements);


        // Сначала удаляем признаки старых ошибок.
        formElements.forEach((element) => {

            // willValidate проверяет, участвует ли
            // элемент в стандартной HTML-валидации.
            if (element.willValidate) {
                element.removeAttribute('aria-invalid');
            }

        });


        // Проверяем обязательные поля и форматы данных.
        if (!orderForm.checkValidity()) {

            // Отмечаем все неправильно заполненные поля.
            formElements.forEach((element) => {

                if (
                    element.willValidate &&
                    !element.checkValidity()
                ) {
                    // Практика №13: aria-invalid сообщает
                    // вспомогательным технологиям об ошибке.
                    element.setAttribute(
                        'aria-invalid',
                        'true'
                    );
                }

            });


            // Показываем встроенные подсказки браузера.
            orderForm.reportValidity();

            // Прерываем обработку, если есть ошибки.
            return;
        }


        // Показываем сообщение об успешном заполнении.
        successMessage.hidden = false;

        // Очищаем введённые данные.
        orderForm.reset();
    });
}


/* =========================================
   4. ФОРМА НА СТРАНИЦЕ ORDER.HTML
   ========================================= */

// Находим отдельную форму оформления заказа.
const orderPageForm = document.getElementById('order-page-form');

// Находим сообщение об успешном заказе.
const orderSuccessMessage = document.getElementById(
    'order-success-message'
);


// Этот блок выполняется только на странице order.html.
if (orderPageForm && orderSuccessMessage) {

    // Обрабатываем отправку отдельной формы заказа.
    orderPageForm.addEventListener('submit', (event) => {

        // Не отправляем данные на сервер.
        event.preventDefault();

        // Получаем все элементы формы.
        const formElements = Array.from(orderPageForm.elements);


        // Удаляем признаки ошибок предыдущей проверки.
        formElements.forEach((element) => {

            if (element.willValidate) {
                element.removeAttribute('aria-invalid');
            }

        });


        // Проверяем заполнение обязательных полей.
        if (!orderPageForm.checkValidity()) {

            // Практика №13: отмечаем поля с ошибками.
            formElements.forEach((element) => {

                if (
                    element.willValidate &&
                    !element.checkValidity()
                ) {
                    element.setAttribute(
                        'aria-invalid',
                        'true'
                    );
                }

            });


            // Показываем подсказки встроенной HTML-валидации.
            orderPageForm.reportValidity();

            // Не продолжаем обработку при ошибках.
            return;
        }


        // Показываем сообщение после заполнения формы.
        orderSuccessMessage.hidden = false;

        // Сбрасываем значения полей.
        orderPageForm.reset();


        // Прокручиваем страницу к сообщению,
        // чтобы пользователь увидел результат.
        orderSuccessMessage.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    });
}
