"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function ready() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let attempt = 0;
            const interval = setInterval(() => {
                const amountinput2 = document.getElementById('amountinput2');
                if (amountinput2) {
                    resolve(amountinput2);
                    clearInterval(interval);
                }
                // ----------------------------------------------------
                attempt++;
                if (attempt === 12) {
                    resolve(null);
                    clearInterval(interval);
                    return;
                }
                // ----------------------------------------------------
            }, 300);
        });
    });
}
const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
// ----------------------------------------------------
(() => __awaiter(void 0, void 0, void 0, function* () {
    const amountinput2 = yield ready();
    const priceinput1 = document.getElementById('priceinput1');
    if (!amountinput2 || !priceinput1)
        return console.log('[Bitfinex extension]: #priceinput1 or #amountinput2 not found');
    priceinput1.insertAdjacentHTML('afterend', '<input type="number" autocomplete="off" id="usdinput3" min="1" value="100" style="margin-top: 10px;">');
    amountinput2.insertAdjacentHTML('afterend', '<button type="button" id="calcbtn" class="ui-button" style="margin-top: 10px;width: calc(100% - 1px);">Calculate️</button>');
    const usdinput3 = document.getElementById('usdinput3');
    const calcbtn = document.getElementById('calcbtn');
    // ----------------------------------------------------
    const calculate = function () {
        calcbtn.blur();
        const price = parseFloat(priceinput1.value);
        const usd = parseFloat(usdinput3.value);
        const amount = Math.round(usd / price * 1000000) / 1000000;
        if (isNaN(amount))
            return console.warn('[Bitfinex extension]: Amount is NaN, some fields are not valid or empty.');
        nativeInputValueSetter.call(amountinput2, amount);
        const amountInputEvent = new Event('input', { bubbles: true });
        amountinput2.dispatchEvent(amountInputEvent);
    };
    calcbtn.addEventListener('click', calculate);
    usdinput3.addEventListener('input', calculate);
    usdinput3.addEventListener('change', calculate);
}))();
//# sourceMappingURL=contentScript.js.map