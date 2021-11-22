const formulario = document.getElementById('formulario')
const resultadoCards = document.getElementById('resultadoCards')
const templateCard = document.getElementById('templateCard').content
let arrayCard = []

document.addEventListener("DOMContentLoaded", e => {
    if (localStorage.getItem('superCard')) {
        arrayCard = JSON.parse(localStorage.getItem('superCard'))
        pintarCardArray()
    }
})


formulario.addEventListener('submit', e => {
    e.preventDefault()
    const data = new FormData(formulario)
    const objetoData = Object.fromEntries([...data.entries()])
    objetoData.id = `id-${Date.now()}`
    arrayCard.push(objetoData)
    // pintarCard(objetoData)
    pintarCardArray()
})

// ejemplo para una card
const pintarCard = objetoData => {
    const clone = templateCard.cloneNode(true)
    clone.querySelector('h5').textContent = objetoData.titulo
    clone.querySelector('p').textContent = objetoData.descripcion

    clone.querySelector('article button').dataset.bsTarget = `#${objetoData.id}`
    clone.querySelector('section').id = objetoData.id
    clone.querySelector('.modal-body h5').textContent = objetoData.titulo

    clone.querySelector('article .btn-danger').dataset.id = objetoData.id

    resultadoCards.appendChild(clone)
}

const pintarCardArray = () => {
    resultadoCards.textContent = ''
    const fragment = document.createDocumentFragment()
    arrayCard.forEach(item => {
        const clone = templateCard.cloneNode(true)
        clone.querySelector('h5').textContent = item.titulo
        clone.querySelector('p').textContent = item.descripcion

        clone.querySelector('article button').dataset.bsTarget = `#${item.id}`
        clone.querySelector('section').id = item.id
        clone.querySelector('.modal-body h5').textContent = item.titulo

        clone.querySelector('article .btn-danger').dataset.id = item.id
        fragment.appendChild(clone)
    })
    resultadoCards.appendChild(fragment)
    localStorage.setItem('superCard', JSON.stringify(arrayCard))
}

resultadoCards.addEventListener('click', e => {
    if (e.target.matches('.btn-danger')) {
        console.log(e.target.dataset.id)
        arrayCard = arrayCard.filter(item => item.id !== e.target.dataset.id)
        pintarCardArray()
    }
})