// open modal
let show_modal = document.getElementById("show_modal")
let modal = document.getElementById("modal")
show_modal.addEventListener("click", function () {
    modal.classList.add("open-modal")
})

//close modal
let modalClose = document.getElementById("modal-close")
modalClose.addEventListener("click", function () {

    let meal_form = document.querySelector("#meal_form")
    meal_form.reset()
    //console.log(meal_form)
    modal.classList.remove("open-modal")

})

 
