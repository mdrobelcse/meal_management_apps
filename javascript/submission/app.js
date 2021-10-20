// open modal
let show_modal = document.getElementById("show_modal")
let modal = document.getElementById("modal")
show_modal.addEventListener("click", function () {
    modal.classList.add("open-modal")
})

//close modal
let modalClose = document.getElementById("modal-close")
modalClose.addEventListener("click", function () {

    let modal_form = document.querySelector("#submission_form")
    modal_form.reset()
    modal.classList.remove("open-modal")

})

 
