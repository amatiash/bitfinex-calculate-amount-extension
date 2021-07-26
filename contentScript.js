"use strict";
const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
// Start
// ----------------------------------------------------
// This is needed due to navigation without reloading a page, so we need to init again
setInterval(init, 1000);
// ----------------------------------------------------
function init() {
    hidePayLessFeesNotice();
    const amountinput = document.querySelector('[id^="amountinput"]');
    const priceinput = document.querySelector('[id^="priceinput"]');
    const isInited = window['usdinput'] || window['calcbtn'];
    // Quit if there is no amount or price input, or if it's already inited
    if (!amountinput || !priceinput || isInited)
        return;
    // ----------------------------------------------------
    priceinput.insertAdjacentHTML('afterend', '<input type="number" class="ui-input" autocomplete="off" id="usdinput" min="1" value="100" style="margin-top: 10px;">');
    amountinput.insertAdjacentHTML('afterend', '<button type="button" id="calcbtn" class="ui-button" style="margin-top: 10px;width: calc(100% - 1px);">Calculate️</button>');
    const usdinput = document.getElementById('usdinput');
    const calcbtn = document.getElementById('calcbtn');
    // ----------------------------------------------------
    const calculate = function () {
        calcbtn.blur();
        const price = parseFloat(priceinput.value);
        const usd = parseFloat(usdinput.value);
        const amount = Math.round(usd / price * 1000000) / 1000000;
        if (isNaN(amount))
            return console.warn('[Bitfinex extension]: Amount is NaN, some fields are not valid or empty.');
        nativeInputValueSetter.call(amountinput, amount);
        const amountInputEvent = new Event('input', { bubbles: true });
        amountinput.dispatchEvent(amountInputEvent);
    };
    calcbtn.addEventListener('click', calculate);
    usdinput.addEventListener('input', calculate);
    usdinput.addEventListener('change', calculate);
}
function hidePayLessFeesNotice() {
    const link = document.querySelector('.notice [href*="Less-Trading-Fees"]');
    if (!link)
        return;
    const notice = link.closest('.notice');
    notice.style.display = 'none';
}
//# sourceMappingURL=contentScript.js.map