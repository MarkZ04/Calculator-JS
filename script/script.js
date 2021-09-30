window.onload = () => {
    'use strict';

    const calc = {
        screen: document.getElementById('screen'),
        buttons: document.querySelectorAll('button'),

        showResult(str) {

            if (str === '0') return;

            if (str.includes('+')) {

                let arr = str.split('+');
                return this.screen.innerHTML = this.sum(+arr[0], +arr[1])
            }

            if (str.includes('*')) {

                let arr = str.split('*');
                return calc.screen.innerHTML = this.mult(+arr[0], +arr[1])
            }

            if (str.includes('/')) {

                let arr = str.split('/');
                return calc.screen.innerHTML = this.division(+arr[0], +arr[1])
            }

            if (str.includes('-')) {

                let arrMinuses = str.split('').filter(el => el === '-');
                if (arrMinuses.length > 1) {

                    let arr = str.split('-');
                    return calc.screen.innerHTML = this.diff(-(+arr[1]), +arr[2])
                }
                let arr = str.split('-');
                return calc.screen.innerHTML = this.diff(+arr[0], +arr[1])
            }

        },
        sum(a, b) {
            return `${(a*10 + b*10)/10}`;
        },
        diff(a, b) {
            return `${(a*10 - b*10)/10}`;
        },
        mult(a, b) {
            return `${(a*10) * (b*10)/100}`;
        },
        division(a, b) {
            return `${(a*10) / (b*10)}`;
        },
        input(btn) {

            let strScreen = this.screen.innerHTML;
            let regNumber = new RegExp('[0-9]');
            let regMathOperation = /[\+\-\/\*]/;
            let arrNumbs = this.screen.innerHTML.split(regMathOperation);

            // в строке не число
            if (!regNumber.test(this.screen.innerHTML)) {

                this.screen.innerHTML = '0';
                return;
            }

            // ввод первого числа
            if (!regMathOperation.test(strScreen)) {

                // в строке только '0'
                if (strScreen === '0') {
                    checkZero.call(this, btn);
                    return;
                }

                // первое число дробное
                if (strScreen.includes('.')) {

                    (fractionalNumb.bind(this, btn))()
                    return;
                }
                this.screen.innerHTML += btn.innerHTML;
                return;
            }

            // первое число отрицательное
            if (strScreen[0] === '-') {

                this.screen.innerHTML = '0';
            }

            // ввод второго числа (первое число положительное)
            if (regMathOperation.test(strScreen) && strScreen[0] !== '-') {

                /* '+, -, *, /' последний
                символ в строке */
                if (regMathOperation.test(strScreen[strScreen.length - 1])) {
                    inputAfterMathSymbol.call(this, btn);
                    return;
                }

                // вотрое число === '0'
                if (arrNumbs[1] === '0') {

                    if (btn.innerHTML === '.') {
                        this.screen.innerHTML += btn.innerHTML;
                        return;
                    }
                    return;
                }

                // второе число дробное
                if (arrNumbs[1].includes('.')) {

                    if (!regMathOperation.test(btn.innerHTML)) {
                        fractionalNumb.call(this, btn)
                        return;
                    }
                }

                // ввод второй операции
                if (arrNumbs.length === 2) {

                    if (regMathOperation.test(btn.innerHTML)) {
                        this.showResult(this.screen.innerHTML);
                        this.screen.innerHTML += btn.innerHTML;
                        return;
                    }
                }

                this.screen.innerHTML += btn.innerHTML;
            }

        }
    }

    // кнопка 'Равно'
    let result = document.getElementById('result');
    // кнопка 'Очистка экрана'
    let clear = document.getElementById('clear');

    // обработчик клика на кнопке 'Равно'
    result.addEventListener('click', () => {

        let screenValue = calc.screen.innerHTML;
        let reg = new RegExp('^[0-9]$');
        if (!reg.test(screenValue[screenValue.length - 1])) return;

        calc.showResult(calc.screen.innerHTML);
    })

    // обработчик клика на кнопке 'Очистка экрана'
    clear.addEventListener('click', () => {

        calc.screen.innerHTML = '0';
        calc.showResult(calc.screen.innerHTML);
    })

    /* обработчик клика на всех кнопках,
    кроме 'Равно' и 'Очистка экрана' */
    calc.buttons.forEach(function(el) {
        el.addEventListener('click', function() {

            resizeText();
            if (el !== result && el !== clear) {

                calc.input(el);
            }
        })
    })

    // изменение размера текста экрана
    function resizeText() {

        if (calc.screen.innerHTML.length > 7) {

            calc.screen.style.font = '3em sans-serif';
            return;
        }
        calc.screen.style.font = '5em sans-serif';
    }

    // проверка 'screen.innerHTML' === '0'
    function checkZero(btn) {

        let btnValue = btn.innerHTML;
        let regNumber = new RegExp('^[0-9]$');
        if (regNumber.test(btnValue)) {

            this.screen.innerHTML = btnValue;
            return;
        }
        this.screen.innerHTML += btnValue;
    }

    // ввод числа после мат-символа
    function inputAfterMathSymbol(btn) {

        let btnValue = btn.innerHTML;
        let regNumber = new RegExp('^[0-9]$');
        if (regNumber.test(btnValue)) {

            this.screen.innerHTML += btnValue;
        }
    }

    // ввод дробной части
    function inputFraction(btn) {

        if (btn.innerHTML !== '.') {

            this.screen.innerHTML += btn.innerHTML
        }
    }

    // число дробное
    function fractionalNumb(btn) {

        let strScreen = this.screen.innerHTML;
        // '.' последний символ в строке
        if (strScreen[strScreen.length - 1] === '.') {

            inputAfterMathSymbol.call(this, btn);
            return;
        }
        inputFraction.call(this, btn);
        return;
    }

}