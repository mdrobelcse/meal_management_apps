//Cost class
class Cost {
    //constructor method
    constructor() {

        this.cost_form    = this.select_element("#cost_form")
        this.member_id    = this.select_element("#member_id")
        this.amount       = this.select_element("#amount")
        this.description  = this.select_element("#description")

        this.modal = this.select_element("#modal")
        this.item_list = this.select_element(".item-list")
        //cost list 
        this.cost_list = this.get_data_from_localstorage()
        this.cost_id = this.get_data_from_localstorage().length - 1 < 0 ? 1 : this.cost_list[this.get_data_from_localstorage().length - 1].id + 1

        this.editable_id = 0
        this.show_cost()

    }


    //selector
    select_element(selector) {
        let selected_element = document.querySelector(selector)
        return selected_element
    }

    //show cost in dom by traversing cost_list array
    show_cost() {
        let costs = this.cost_list
        var self = this
        costs.forEach(function (cost) {
            self.add_cost(cost)
        })
        // console.log(costs)
    }

    //submit cost form
    submit_cost_form() {
        let submit_type = this.cost_form.lastElementChild.firstElementChild.textContent
        let select_element = this.select_element
        let cost_list = this.cost_list

        if (submit_type == "save") {

            let member_id   = select_element("#member_id").value
            let amount      = select_element("#amount").value
            let description = select_element("#description").value

            let cost = {
                id: parseInt(this.cost_id),
                member_id: member_id,
                amount: amount,
                description: description
            }

            cost_list.push(cost)
            this.cost_id++
            this.cost_form.reset()
            this.set_data_to_localstorage(cost_list)
            this.update_dom()
            this.modal.classList.remove("open-modal")
            console.log(cost_list)

        } else if (submit_type == "update") {

            let member_id = select_element("#member_id").value
            let amount = select_element("#amount").value
            let description = select_element("#description").value

            let cost_index = cost_list.findIndex((cost => cost.id == this.editable_id));
            cost_list[cost_index].member_id = member_id
            cost_list[cost_index].amount = amount
            cost_list[cost_index].description = description

            this.modal.classList.remove("open-modal")
            this.editable_id = 0
            this.set_data_to_localstorage(cost_list)
            this.cost_form.reset()
            this.update_dom()
            console.log(cost_list) 

        }

    }

    //set data to localstorage
    set_data_to_localstorage(costs) {
        localStorage.setItem('costs', JSON.stringify(costs));
    }

    //get data from localstorage
    get_data_from_localstorage() {
        let costs = JSON.parse(localStorage.getItem('costs'))
        return costs || []
    }


    //add cost to dom
    add_cost(cost) {

        const tr = document.createElement("tr")
        tr.innerHTML = `<td>${cost.id}</td>
         <td>${cost.member_id}</td>
         <td>${cost.amount}</td>
         <td>${cost.description}</td>
         <td>
             <a href="#" data-id="${cost.id}"><i class="fa fa-edit"></i></a>
             <a href="#" data-id="${cost.id}"><i class="fa fa-eye"></i></a>
             <a href="#" data-id="${cost.id}"><i class="fa fa-trash"></i></a>
         </td>`

        this.item_list.firstElementChild.lastElementChild.appendChild(tr)

    }


    //update dom
    update_dom() {

        this.item_list.firstElementChild.lastElementChild.textContent = ''
        let costs = this.cost_list
        var self = this;
        costs.forEach(function (cost) {
            self.add_cost(cost)
        })

        this.select_element(".form-submit-button").firstElementChild.textContent = "save"

    }

    //edit cost
    edit_cost(element) {

        let select_element = this.select_element
        //get cost data by id
        let cost_id = element.dataset.id
        let single_cost = this.get_cost_by_id(cost_id)

        let { id, member_id, amount, description } = single_cost
        this.editable_id = id
        //open modal
        this.modal.classList.add("open-modal")
        select_element(".modal-header h3").textContent = 'Edit Cost'

        //view cost data   
        select_element("#member_id").value = member_id
        select_element("#amount").value = amount
        select_element("#description").value = description

        //set update content to form submit button
        select_element(".form-submit-button").firstElementChild.textContent = "update"

    }


    //view cost from cost_list array
    view_cost(element) {

        let select_element = this.select_element
        //get cost data by id
        let cost_id = element.dataset.id
        let single_cost = this.get_cost_by_id(cost_id)
        let { id, member_id, amount, description } = single_cost

        //open modal
        this.modal.classList.add("open-modal")
        select_element(".modal-header h3").textContent = 'Cost Details'

        //view cost data   
        select_element("#member_id").value = member_id
        select_element("#amount").value = amount
        select_element("#description").value = description

        //hide submit button
        select_element(".form-submit-button").style.display = 'none'

    }



    //get single-cost by-id
    get_cost_by_id(cost_id) {

        let cost_list = this.cost_list
        //get cost from cost_list array by index
        let cost_index = cost_list.findIndex((cost => cost.id == cost_id))
        //return single cost  
        let single_cost = cost_list[cost_index]
        return single_cost
    }


    //delete cost
    delete_cost(element) {

        let id = element.dataset.id
        let parent = element.parentElement.parentElement
        this.item_list.firstElementChild.lastElementChild.removeChild(parent)
        let costs = this.cost_list.filter(function (cost) {
            return cost.id != id
        })
        this.cost_list = costs
        this.set_data_to_localstorage(this.cost_list)
        //console.log(this.cost_list)
    }

}//end cost class


//dom-content-loaded
document.addEventListener("DOMContentLoaded", function () {

    //create instance of Cost class
    const cost = new Cost()

    //select cost form
    let cost_form = document.getElementById("cost_form")
    cost_form.addEventListener("submit", function (event) {
        event.preventDefault()
        cost.submit_cost_form()
    })

    //edit and delte cost
    let cost_list = document.querySelector(".item-list")
    cost_list.addEventListener("click", function (event) {

        if (event.target.classList.contains('fa-edit')) {
            cost.edit_cost(event.target.parentElement)
        } else if (event.target.classList.contains('fa-eye')) {
            cost.view_cost(event.target.parentElement)
        } else if (event.target.classList.contains('fa-trash')) {
            cost.delete_cost(event.target.parentElement)
        }
    })

})//end dom-content-loader