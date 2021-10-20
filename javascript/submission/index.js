//submission class
class Submission {
    //constructor method
    constructor() {

        this.submission_form = this.select_element("#submission_form")
        this.member_id = this.select_element("#member_id")
        this.amount = this.select_element("#amount")

        this.modal = this.select_element("#modal")
        this.item_list = this.select_element(".item-list")
        //submission list 
        this.submission_list = this.get_data_from_localstorage()
        this.submission_id = this.get_data_from_localstorage().length - 1 < 0 ? 1 : this.submission_list[this.get_data_from_localstorage().length - 1].id + 1

        this.editable_id = 0
        this.show_submission()

    }


    //selector
    select_element(selector) {
        let selected_element = document.querySelector(selector)
        return selected_element
    }

    //show submission in dom by traversing submission_list array
    show_submission() {

        let submissions = this.submission_list
        var self = this;
        submissions.forEach(function (submission) {
            self.add_submission(submission)
        })

        // console.log(submissions)
    }

    //submit submissions form
    submit_submission_form() {


        let submit_type = this.submission_form.lastElementChild.firstElementChild.textContent
        let select_element = this.select_element
        let submission_list = this.submission_list

        if (submit_type == "save") {

            let member_id = select_element("#member_id").value
            let amount = select_element("#amount").value

            let submission = {
                id: parseInt(this.submission_id),
                member_id: member_id,
                amount: amount
            }

            submission_list.push(submission)
            this.submission_id++
            this.submission_form.reset()
            this.set_data_to_localstorage(submission_list)
            this.update_dom()
            this.modal.classList.remove("open-modal")
           // console.log(submission_list)


        } else if (submit_type == "update") {

            let member_id = select_element("#member_id").value
            let amount = select_element("#amount").value


            let submission_index = submission_list.findIndex((submission => submission.id == this.editable_id));
            submission_list[submission_index].member_id = member_id
            submission_list[submission_index].amount = amount

            this.modal.classList.remove("open-modal")
            this.editable_id = 0
            this.set_data_to_localstorage(submission_list)
            this.submission_form.reset()
            this.update_dom()
            //console.log(submission_list) 

        }

    }

    //set data to localstorage
    set_data_to_localstorage(submissions) {
        localStorage.setItem('submissions', JSON.stringify(submissions));
    }

    //get data from localstorage
    get_data_from_localstorage() {
        let submissions = JSON.parse(localStorage.getItem('submissions'))
        return submissions || []
    }


    //add submission to dom
    add_submission(submission) {

        const tr = document.createElement("tr")
        tr.innerHTML = `<td>${submission.id}</td>
         <td>${submission.member_id}</td>
         <td>${submission.amount}</td>
         <td>
             <a href="#" data-id="${submission.id}"><i class="fa fa-edit"></i></a>
             <a href="#" data-id="${submission.id}"><i class="fa fa-eye"></i></a>
             <a href="#" data-id="${submission.id}"><i class="fa fa-trash"></i></a>
         </td>`

        this.item_list.firstElementChild.lastElementChild.appendChild(tr)

    }


    //update dom
    update_dom() {

        this.item_list.firstElementChild.lastElementChild.textContent = ''
        let submissions = this.submission_list
        var self = this;
        submissions.forEach(function (submission) {
            self.add_submission(submission)
        })

        this.select_element(".form-submit-button").firstElementChild.textContent = "save"

    }

    //edit submission
    edit_submission(element) {

        let select_element = this.select_element

        //get submission data by id
        let submission_id = element.dataset.id
        let single_submission = this.get_submission_by_id(submission_id)

        let { id, member_id, amount } = single_submission
        this.editable_id = id
        //open modal
        this.modal.classList.add("open-modal")
        select_element(".modal-header h3").textContent = 'Edit Submission'

        //view submission data   
        select_element("#member_id").value = member_id
        select_element("#amount").value = amount

        //set update content to form submit button
        select_element(".form-submit-button").firstElementChild.textContent = "update"

    }


    //view submission from submission_list array
    view_submission(element) {

        let select_element = this.select_element
        //get submission data by id
        let submission_id = element.dataset.id
        let single_submission = this.get_submission_by_id(submission_id)
        let { id, member_id, amount } = single_submission

        //open modal
        this.modal.classList.add("open-modal")
        select_element(".modal-header h3").textContent = 'Submission Details'

        // //view submission data   
        select_element("#member_id").value = member_id
        select_element("#amount").value = amount

        //hide submit button
        select_element(".form-submit-button").style.display = 'none'

    }



    //get single-submission by-id
    get_submission_by_id(submission_id) {

        let submission_list = this.submission_list
        //get submission from submission_list array by index
        let submission_index = submission_list.findIndex((submission => submission.id == submission_id))
        //return single submission  
        let single_submission = submission_list[submission_index]
        return single_submission
    }


    //delete submission
    delete_submission(element) {

        let id = element.dataset.id
        let parent = element.parentElement.parentElement
        this.item_list.firstElementChild.lastElementChild.removeChild(parent)
        let submissions = this.submission_list.filter(function (submission) {
            return submission.id != id
        })
        this.submission_list = submissions
        this.set_data_to_localstorage(this.submission_list)
        //console.log(this.submission_list)
    }

}//end submission class


//dom-content-loaded
document.addEventListener("DOMContentLoaded", function () {

    //create instance of SUbmission class
    const submission = new Submission()

    //select submission form
    let submission_form = document.getElementById("submission_form")
    submission_form.addEventListener("submit", function (event) {
        event.preventDefault()
        submission.submit_submission_form()
    })

    //edit and delte submission
    let submission_list = document.querySelector(".item-list")
    submission_list.addEventListener("click", function (event) {

        if (event.target.classList.contains('fa-edit')) {
            submission.edit_submission(event.target.parentElement)
        } else if (event.target.classList.contains('fa-eye')) {
            submission.view_submission(event.target.parentElement)
        } else if (event.target.classList.contains('fa-trash')) {
            submission.delete_submission(event.target.parentElement)
        }
    })

})//end dom-content-loader