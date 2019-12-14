var objects = []

var totalPrice = 0

$(document).ready(function () {

    for (let i = 0; i < 10; i++) {

        objects.push(
            {
                id: i,
                img: 'https://img.kalunga.com.br/FotosdeProdutos/174903d.jpg',
                name: 'Caneta azul',
                amount: '1 unid.',
                price: 2.50,
                available: 100,
                added: 0
            },
        )
    }


    for (let obj of objects) {
        $('#tbody').append(getRowTemplate(obj))
    }
})

function add(id) {
    let index = objects.map(obj => obj.id).indexOf(id);
    totalPrice += objects[index].price
    objects[index].available--
    objects[index].added++
    $(`#${getUniqueId(id)}`).html(`
        ${getRowContent(objects[index])}
    `)
    attTotalPrice()
}

function remove(id) {
    let index = objects.map(obj => obj.id).indexOf(id);
    totalPrice -= objects[index].price
    objects[index].available++
    objects[index].added--
    $(`#${getUniqueId(id)}`).html(`
        ${getRowContent(objects[index])}
    `)
    attTotalPrice()
}

function attTotalPrice() {
    $('#total').html(`Total: ${totalPrice} R$`)
}

function getRowTemplate(obj) {
    return `<tr id="${getUniqueId(obj.id)}">
                ${getRowContent(obj)}
            </tr>`
}

function getRowContent(obj) {
    return `
        <td class="img">
            <div>
                <img src="${obj.img}">
            </div>
        </td>
        <td> ${obj.name} </td>
        <td> ${obj.amount} </td>
        <td> ${obj.price} R$ </td> 
        <td> ${obj.available} </td>
        <td>
            ${
        obj.available < 1 ? '' :
            `<button class="add" onclick="add(${obj.id})">
                    <i class="fas fa-plus"></i>
                </button>`
        }
            ${
        obj.added < 1 ? '' :
            ` <button class="remove" onclick="remove(${obj.id})">
                    <i class="fas fa-minus-circle"></i>
                </button>`
        }
        </td>
        <td>
            <div class="added"> ${obj.added} </div>
        </td>`
}

function getUniqueId(id) {
    return `obj-${id}`
}

function cancel() {
    for (let obj of objects) {
        obj.available += obj.added
        obj.added = 0
        $(`#${getUniqueId(obj.id)}`).html(`${getRowContent(obj)}`)
    }
}

function send() {

    let added = objects.map(obj => obj.added).reduce((p, c) => p + c)
    if (added < 1) {

        alert('Carrinho vazio')

    } else {

        let data = []

        for (let obj of objects) {
            if (obj.added > 0) {
                data.push({ "produto": { "id": obj.id }, "qtd": obj.added })
            }
        }

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/produtos",
            data: data,
            success: function (data) {
                window.location.href = './products.html'
            },
            error: function (error) {
                alert('Usuário ou senha inválidos')
            }
        });

    }

}