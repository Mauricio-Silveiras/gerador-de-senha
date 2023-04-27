
    const inputEl = document.querySelector('#password')
    const upperCaseEl = document.querySelector('#uppercase-check')
    const numberEl = document.querySelector('#number-check')
    const symbolEl = document.querySelector('#symbol-check')
    const securityIndicatorBarEl = document.querySelector("#security-indicator-bar")

    let passwordLenght = 16


    function gerarSenha (){
        let chars = "abcdefghijklmnopqrstuvwxyz"

        const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const numberChars = "1234567890"
        const symbolsChars = "?!@#$%¨&*()"

        if(upperCaseEl.checked){
            chars += upperCaseChars
        }
        if (numberEl.checked){
            chars += numberChars
        }
        if (symbolEl.checked){
            chars += symbolsChars
        }
        
        let password = ""

        for (let i = 0; i < passwordLenght; i++){
            const randomNumber = Math.floor(Math.random() * chars.length)
            password += chars.substring(randomNumber, randomNumber + 1)
        }
        inputEl.value = password

        calcularQualidade()
        calcularFonte()

    }

    function calcularQualidade () {

        const percent = Math.round(
            (passwordLenght / 64) * 25 +
            (upperCaseEl.checked ? 15 : 0) +
            (numberEl.checked ? 25 : 0) +
            (symbolEl.checked ? 35 : 0)
        )

        securityIndicatorBarEl.style.width = `${percent}%`

        if(percent > 69){
            securityIndicatorBarEl.classList.remove('critical')
            securityIndicatorBarEl.classList.remove('warning')
            securityIndicatorBarEl.classList.add('safe')
        }else if (percent > 50) {
            securityIndicatorBarEl.classList.remove('critical')
            securityIndicatorBarEl.classList.add('warning')
            securityIndicatorBarEl.classList.remove('safe')

        }else {
            securityIndicatorBarEl.classList.add('critical')
            securityIndicatorBarEl.classList.remove('warning')
            securityIndicatorBarEl.classList.remove('safe')
        }

        if(percent >= 100){
            securityIndicatorBarEl.classList.add("completed")
        }else{
            securityIndicatorBarEl.classList.remove("completed")
        }
    }

    function calcularFonte () {
        if(passwordLenght > 45) {
            inputEl.classList.remove("font-font-sm")
            inputEl.classList.remove("font-xs")
            inputEl.classList.add("font-xxs")
        }else if(passwordLenght > 32){
            inputEl.classList.remove("font-sm")
            inputEl.classList.add("font-xs")
            inputEl.classList.remove("font-xxs")
        }else if(passwordLenght > 22){
            inputEl.classList.add("font-sm")
            inputEl.classList.remove("font-xs")
            inputEl.classList.remove("font-xxs")
        }else {
            inputEl.classList.remove("sm")
            inputEl.classList.remove("xs")
            inputEl.classList.remove("xxs")
        }
    }

    function copy(){
        navigator.clipboard.writeText(inputEl.value)
    }

    const passwordLenghtEl = document.querySelector('#password-lenght')
        passwordLenghtEl.addEventListener('input', function() {
            passwordLenght = passwordLenghtEl.value
            document.querySelector('#password-length-text').innerText = passwordLenght
            gerarSenha()
        })

    upperCaseEl.addEventListener('click', gerarSenha)
    numberEl.addEventListener('click', gerarSenha) 
    symbolEl.addEventListener('click', gerarSenha)  
    
    document.querySelector('#btn').addEventListener('click', copy)
    document.querySelector('#copy').addEventListener('click', copy)
    document.querySelector('#renew').addEventListener('click', gerarSenha)

    gerarSenha()

