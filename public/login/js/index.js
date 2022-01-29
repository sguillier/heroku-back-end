

// const formLogin = document.getElementById('form-login')
// formLogin.addEventListener('submit', async e => {
//     e.preventDefault()


//     const data = {
//         nombre: document.getElementById('login-nombre').value,
//     }


//     const urlApi = 'http://localhost/api/session/login/'
//     fetch(urlApi, {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: { 'Content-Type': 'application/json' }
//     }).then(res => res.json())
//         .catch(error => console.error('Error:', error))
//         .then(response => {
//             console.log('Success:', response)
//             window.location.href = "http://localhost";
//         });


// })


const botonLogIn = document.getElementById("button-register")
botonLogIn.addEventListener('click', async () => {
    window.location.href = "http://localhost/register";
})