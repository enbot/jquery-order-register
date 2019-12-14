var objects = [
    {
        user: 'Nathanzinho',
        date: '01/01/1970',
        product: 'Caneta Azul',
        amount: 20,
        price: 2.5
    },
    {
        user: 'Paulozada',
        date: '01/01/1970',
        product: 'Azul Caneta',
        amount: 10,
        price: 2.5
    },
]

var totalPrice = 0

$(document).ready(function () {
    for (let obj of objects) {
        $('#tbody').append(getRowTemplate(obj))
        const rowPrice = obj.amount * obj.price
        totalPrice += rowPrice
    }
    attTotalPrice()
})

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
        <td> ${obj.user} </td>
        <td> ${obj.date} </td>
        <td> ${obj.product} </td>
        <td> ${obj.amount} </td>
        <td> ${obj.price * obj.amount} </td>
    `
}

function getUniqueId(id) {
    return `obj-${id}`
}