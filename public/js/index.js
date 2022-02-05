

const Temp = async () => {
    const request = await fetch('https://app-back-end-coder.herokuapp.com/api/auth/isauth')
    const res = await request.json()

    console.log(res)
    if (res) {
        window.location.href = "https://app-back-end-coder.herokuapp.com/home"
    } else {
        html = `
        <div class="session-display-content">
            <button id="button-login">
                Iniciar Sesion
            </button>

        </div>`
        document.getElementById('session-display').innerHTML = html
        const botonLogIn = document.getElementById("button-login")
        botonLogIn.addEventListener('click', async () => {
            window.location.href = "https://app-back-end-coder.herokuapp.com/login";
        })
    }
}

Temp()

