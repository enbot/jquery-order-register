function login() {

    const inputs = $('input')

    let name = ''
    let pass = ''

    for (let input of inputs) {
        if (input.name === 'username') {
            name = input.value
        } else if (input.name === 'pass') {
            pass = input.value
        }
    }

    if (!name) {
        alert('Insira um usuário')
    } else if (!pass) {
        alert('Insira uma senha')
    } else {

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/login",
            data: {
                nome: name,
                senha: pass
            },
            success: function (data) {
                window.location.href = './products.html'
            },
            error: function (error) {
                alert('Usuário ou senha inválidos')
            }
        });

    }

}

function clean() {
    const inputs = $('input')
    for (let input of inputs) {
        input.value = ''
    }
}