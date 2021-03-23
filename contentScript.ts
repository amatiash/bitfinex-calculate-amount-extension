async function ready(): Promise<HTMLInputElement | null>{
    return new Promise((resolve, reject) => {
        let attempt    = 0
        const interval = setInterval(() => {
            const amountinput2 = document.getElementById('amountinput2')

            if(amountinput2){
                resolve(amountinput2 as HTMLInputElement)
                clearInterval(interval)
            }

            // ----------------------------------------------------

            attempt++

            if(attempt === 12){
                resolve(null)
                clearInterval(interval)
                return
            }

            // ----------------------------------------------------

        }, 300)
    })
}

const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!.set!;

// ----------------------------------------------------

(async () => {
    const amountinput2 = await ready()
    const priceinput1  = document.getElementById('priceinput1') as (HTMLInputElement | null)

    if(!amountinput2 || !priceinput1)
        return console.log('[Bitfinex extension]: #priceinput1 or #amountinput2 not found')

    priceinput1.insertAdjacentHTML('afterend',
        '<input type="number" autocomplete="off" id="usdinput3" min="1" value="100" style="margin-top: 10px;">')

    amountinput2.insertAdjacentHTML('afterend',
        '<button type="button" id="calcbtn" class="ui-button" style="margin-top: 10px;width: calc(100% - 1px);">Calculate️</button>')

    const usdinput3 = document.getElementById('usdinput3') as HTMLInputElement
    const calcbtn   = document.getElementById('calcbtn') as HTMLButtonElement

    // ----------------------------------------------------

    const calculate = function(){
        calcbtn.blur()
        const price  = parseFloat(priceinput1.value)
        const usd    = parseFloat(usdinput3.value)
        const amount = Math.round(usd / price * 1000000) / 1000000

        if(isNaN(amount))
            return console.warn('[Bitfinex extension]: Amount is NaN, some fields are not valid or empty.')

        nativeInputValueSetter.call(amountinput2, amount)
        const amountInputEvent = new Event('input', {bubbles: true})
        amountinput2.dispatchEvent(amountInputEvent)
    }

    calcbtn.addEventListener('click', calculate)
    usdinput3.addEventListener('input', calculate)
    usdinput3.addEventListener('change', calculate)

})()
