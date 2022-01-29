const socket = io();


// update-productos
const formProducto = document.getElementById('form-producto')
formProducto.addEventListener('submit', e => {
    e.preventDefault()

    const producto = {
        nombre: document.getElementById('producto-nombre').value,
        precio: document.getElementById('producto-precio').value,
        url: document.getElementById('producto-url').value
    }

    socket.emit('update-productos', producto);
    formProducto.reset()
})


// render-productos
socket.on('productos', manejarEventoProductos);
async function manejarEventoProductos(productos) {

    const recursoRemoto = await fetch('hbs/productos.hbs')
    const textoPlantilla = await recursoRemoto.text()
    const functionTemplate = Handlebars.compile(textoPlantilla)

    const html = functionTemplate({ productos })
    document.getElementById('productos').innerHTML = html
}


// update-chat
const formChat = document.getElementById('form-chat')
formChat.addEventListener('submit', e => {
    e.preventDefault()

    const hora = new Date()
    const mensaje = {
        text: document.getElementById('chat-msg').value,
        hora: '[' + hora.toLocaleString() + ']'
    }

    socket.emit('update-chat', mensaje);
    document.getElementById('chat-msg').value = ''
})

// render-chat
socket.on('chat', manejarEventoChat);
async function manejarEventoChat(chat) {
    
    // const chatNormalized = chat
    // const chatDenormalized = await denormalizeChat(chatNormalized)
    // chat = chatDenormalized ? (await chatDenormalized.originalMensajes) : []
    // const compresion = Math.round(100 * JSON.stringify(chatNormalized).length / JSON.stringify(chat).length)
    // document.getElementById('chat-title').innerText = 'El porcentaje de compresion es ' + compresion + '%'


    const recursoRemoto = await fetch('hbs/chat.hbs')
    const textoPlantilla = await recursoRemoto.text()
    const functionTemplate = Handlebars.compile(textoPlantilla)

    const html = functionTemplate({ chat })
    document.getElementById('chat').innerHTML = html

}


const Temp = async () => {
    const request = await fetch('http://localhost/api/auth/isauth')
    const res = await request.json()

    console.log(res)
    if (res) {
        html = `
        <div class="session-display-content">
            <h2> Bienvenido ${res.firstname} </h2>
            <button id="logout-button">
                Cerrar Session
            </button>

        </div>`
        document.getElementById('session-display').innerHTML = html
        const botonLogOut = document.getElementById("logout-button")
        botonLogOut.addEventListener('click', async () => {
            const request = await fetch('http://localhost/api/auth/logout')
            html = `
            <div class="session-display-content">
                <h2> Adios!! </h2>
            </div>`
            document.getElementById('session-display').innerHTML = html
            setTimeout(
                () => { window.location.href = "http://localhost" }, 1000
            )
        })
    } else {
        window.location.href = "http://localhost/login";
    }
}

Temp()

