// Получаем модальное окно на главной странице.
const orderDialog = document.getElementById('order-dialog');

// Получаем все кнопки «Заказать» в карточках товаров.
const orderButtons = document.querySelectorAll('.product-card__button');

// Получаем кнопку закрытия модального окна.
const closeDialogButton = document.getElementById('close-order-dialog');

// Получаем скрытое поле для названия выбранного товара.
const selectedProductInput = document.getElementById('selected-product');

// Получаем форму из модального окна.
const orderForm = document.getElementById('order-form');

// Получаем сообщение об успешном оформлении заказа.
const successMessage = document.getElementById('success-message');


// Проверяем, что элементы модального окна есть на странице.
if (
    orderDialog &&
    closeDialogButton &&
    selectedProductInput &&
    orderForm &&
    successMessage
) {

    // Перебираем все кнопки «Заказать».
    orderButtons.forEach((button) => {

        // Реагируем на нажатие кнопки.
        button.addEventListener('click', () => {

            // Получаем название товара из data-product.
            const productName = button.dataset.product;

            // Записываем выбранный товар в скрытое поле формы.
            selectedProductInput.value = productName;

            // Скрываем старое сообщение об успешном заказе.
            successMessage.hidden = true;

            // Открываем модальное окно.
            orderDialog.showModal();
        });
    });


    // Закрываем модальное окно по кнопке «Закрыть».
    closeDialogButton.addEventListener('click', () => {
        orderDialog.close();
    });


    // Обрабатываем отправку формы.
    orderForm.addEventListener('submit', (event) => {

        // Отменяем обычную отправку формы на сервер.
        event.preventDefault();

        // Получаем все элементы формы.
        const formElements = Array.from(orderForm.elements);


        // Убираем старые признаки ошибок.
        formElements.forEach((element) => {

            if (element.willValidate) {
                element.removeAttribute('aria-invalid');
            }

        });


        // Проверяем правильность заполнения формы.
        if (!orderForm.checkValidity()) {

            // Отмечаем поля, в которых есть ошибка.
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


            // Показываем стандартные подсказки браузера.
            orderForm.reportValidity();

            return;
        }


        // Показываем сообщение об успешном заказе.
        successMessage.hidden = false;

        // Очищаем форму.
        orderForm.reset();
    });
}


// Получаем отдельную форму со страницы order.html.
const orderPageForm = document.getElementById('order-page-form');

// Получаем сообщение об успешном заказе на order.html.
const orderSuccessMessage = document.getElementById(
    'order-success-message'
);


// Проверяем, что форма заказа есть на текущей странице.
if (orderPageForm && orderSuccessMessage) {

    // Обрабатываем отправку формы.
    orderPageForm.addEventListener('submit', (event) => {

        // Не отправляем форму на сервер.
        event.preventDefault();

        // Получаем все элементы формы.
        const formElements = Array.from(orderPageForm.elements);


        // Убираем старые признаки ошибок.
        formElements.forEach((element) => {

            if (element.willValidate) {
                element.removeAttribute('aria-invalid');
            }

        });


        // Проверяем заполнение обязательных полей.
        if (!orderPageForm.checkValidity()) {

            // Отмечаем поля с ошибками.
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


            // Показываем подсказки браузера.
            orderPageForm.reportValidity();

            return;
        }


        // Показываем сообщение после успешного оформления.
        orderSuccessMessage.hidden = false;

        // Очищаем форму.
        orderPageForm.reset();


        // Прокручиваем страницу к сообщению.
        orderSuccessMessage.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    });
}