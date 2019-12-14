
var hasScreenAdress = false

var screenAdressData = null

var formdata = null

function search() {

    const cep = $('#cep')[0].value
    const validator = /^[0-9]{8}$/;

    if (validator.test(cep)) {
        const script = document.createElement('script');
        script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=callback';
        document.body.appendChild(script);
    }
}

function callback(c) {
    hasScreenAdress = true
    screenAdressData = c
    $('#response').html(
        `<div class="adress"> Endereço: </div>
        <div class="res"> 
            Logradouro: ${c.logradouro} <br> 
            Bairro: ${c.bairro} <br> 
            Localidade: ${c.localidade} <br> 
            UF: ${c.uf}
        </div>`
    )

    if (formdata) {
        doRequest()
    }
}

function register() {

    let inputs = $('input')

    let form = []

    let date = null

    for (let input of inputs) {
        if (input.name === 'gender') {
            if (input.checked) form.push({ placeholder: 'gênero*', name: 'gender', value: input.value })
        } else {
            if (!input.value) {
                alert(`Preencha o campo ${input.placeholder}`)
                return
            }
            if (input.name === 'age') {
                date = input
            }
            form.push({ placeholder: input.placeholder, name: input.name, value: input.value })
        }
    }

    if (form.length < 9) {
        alert("Preencha o campo gênero")
        return
    }

    if (date) {

        const t = new Date()
        const d = new Date(date.value);

        const today = t.getFullYear()
        const value = d.getFullYear()

        if (value > today) {
            alert('Data é maior que o ano atual')
            return
        } else if (value > today - 5) {
            alert('Muito novinho, não acha?')
            return
        } else if (value < today - 120) {
            alert('Idosos não podem se registrar')
            return
        }

    }

    formdata = form

    if (!screenAdressData) {
        search()
    } else {
        doRequest()
    }

}

function doRequest() {

    let dataObject = {}

    for (let d of formdata) {
        dataObject[d.name] = d.value
    }

    const t = new Date().getFullYear()
    const d = new Date(dataObject.age).getFullYear()
    const age = t - d

    $.ajax({
        type: "POST",
        url: "http://localhost:8080",
        data: {
            "login": dataObject.username,
            "senha": dataObject.pass,
            "pessoa": {
                "nome": dataObject.name,
                "idade": age,
                "dtNasciment": dataObject.age,
                "sexo": dataObject.gender,
                "endereco": {
                    "uf": screenAdressData.uf,
                    "cidade": screenAdressData.localidade,
                    "complemento": dataObject.complement,
                    "numero": dataObject.number,
                    "logradouro": screenAdressData.logradouro,
                    "cep": dataObject.cep
                }
            }, "roles": [{ "nomeRole": "ADMIN" }]
        },
        success: function (data) {
            window.location.href = './products.html'
        },
        error: function (error) {

            alert(error.message)

        }
    });

    // window.location.href = './products.html'

}