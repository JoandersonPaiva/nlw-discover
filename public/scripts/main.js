import  Modal  from './modal.js'

const modal = Modal()

const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

const cancelButton =  document.querySelector(".button.cancel")
const checkButtons = document.querySelectorAll(".actions a.check")
const deleteButton = document.querySelectorAll(".actions a.delete")

// Abre modal (botão marcar como lido)
checkButtons.forEach(button => {

    button.addEventListener('click', handleClick)
})
// Fecha Modal (botão cancelar)
cancelButton.addEventListener('click', modal.close)

//Abre modal(botão excluir)
deleteButton.forEach(button => {
    button.addEventListener('click',(event) =>  handleClick(event , false))
})

function handleClick(event, check = true) {
    event.preventDefault()
    const text = check ? 'Marcar como lida' : 'Excluir'
    const slug = check ? 'check' : 'delete'
    const roomId = document.querySelector("#room-id").dataset.id
    const questionId = event.target.dataset.id

    const form = document.querySelector(".modal form")
    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`)
    
    modalTitle.innerHTML = `${text} esta pergunta`
    modalDescription.innerHTML = `Tem certeza que deseja ${text.toLocaleLowerCase()} esta pergunta?`
    modalButton.innerHTML = `Sim , ${text.toLocaleLowerCase()}`
    check? modalButton.classList.remove("red") : modalButton.classList.add("red")
    modal.open()
}

