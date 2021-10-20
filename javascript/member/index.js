//import members from './data.js'

//member class
class Member {
    //constructor method
    constructor() {

        this.member_form = this.select_element("#member-form")
        this.member_name = this.select_element("#member_name")
        this.member_email = this.select_element("#member_email")
        this.member_phone = this.select_element("#member_phone")
        this.member_address = this.select_element("#member_address")
        this.status = this.select_element("#status")
        this.modal = this.select_element("#modal")
        this.item_list = this.select_element(".item-list")
        //member list 
        this.member_list = this.get_data_from_localstorage()
        this.member_id = this.get_data_from_localstorage().length - 1 < 0 ? 1 : this.member_list[this.get_data_from_localstorage().length - 1].id + 1

        this.editable_id = 0
        this.show_member()

    }


    //selector
    select_element(selector) {
        let selected_element = document.querySelector(selector)
        return selected_element
    }

    //show member in dom by traversing member_list array
    show_member() {

        let members = this.member_list
        var self = this;
        members.forEach(function (member) {
            self.add_member(member)
        })

        // console.log(members)
    }

    //submit member form
    submit_member_form() {

        let submit_type = this.member_form.lastElementChild.firstElementChild.textContent

        if (submit_type == "save") {
            let select_element = this.select_element

            let name = select_element("#member_name").value
            let email = select_element("#member_email").value
            let phone = select_element("#member_phone").value
            let address = select_element("#member_address").value
            let status = select_element("#status").value

            let member = {
                id: parseInt(this.member_id),
                name: name,
                email: email,
                phone: phone,
                address: address,
                status: status
            }
            this.member_list.push(member)
            this.member_id++
            this.member_form.reset()
            this.set_data_to_localstorage(this.member_list)
            this.update_dom()
            this.modal.classList.remove("open-modal")
            //console.log(this.member_list)


        } else if (submit_type == "update") {

            let select_element = this.select_element
            let member_list = this.member_list

            let name = select_element("#member_name").value
            let email = select_element("#member_email").value
            let phone = select_element("#member_phone").value
            let address = select_element("#member_address").value
            let status = select_element("#status").value


            let member_index = member_list.findIndex((obj => obj.id == this.editable_id));
            member_list[member_index].name = name
            member_list[member_index].email = email
            member_list[member_index].phone = phone
            member_list[member_index].address = address
            member_list[member_index].status = status

            this.modal.classList.remove("open-modal")
            this.editable_id = 0
            this.set_data_to_localstorage(this.member_list)
            this.member_form.reset()
            this.update_dom()
            //console.log(member_list) 

        }

    }

    //set data to localstorage
    set_data_to_localstorage(members) {
        localStorage.setItem('members', JSON.stringify(members));
    }

    //get data from localstorage
    get_data_from_localstorage() {
        let members = JSON.parse(localStorage.getItem('members'))
        return members || []
    }


    //add member to dom
    add_member(member) {

        const tr = document.createElement("tr")
        tr.innerHTML = `<td>${member.id}</td>
         <td>${member.name}</td>
         <td>${member.email}</td>
         <td>${member.phone}</td>
         <td><span id="${member.status == 1 ? 'status-success' : 'status-danger'}">${member.status == 1 ? 'Active' : 'In-Active'}</span></td>
         <td>
             <a href="#" data-id="${member.id}"><i class="fa fa-edit"></i></a>
             <a href="#" data-id="${member.id}"><i class="fa fa-eye"></i></a>
             <a href="#" data-id="${member.id}"><i class="fa fa-trash"></i></a>
         </td>`

        this.item_list.firstElementChild.lastElementChild.appendChild(tr)

    }


    //update dom
    update_dom() {

        this.item_list.firstElementChild.lastElementChild.textContent = ''
        let members = this.member_list
        var self = this;
        members.forEach(function (member) {
            self.add_member(member)
        })

        this.select_element(".form-submit-button").firstElementChild.textContent = "save"

    }

    //edit member
    edit_member(element) {

        let select_element = this.select_element

        //get member data by id
        let member_id = element.dataset.id
        let single_member = this.get_member_by_id(member_id)

        let { id, name, email, phone, address, status } = single_member
        this.editable_id = id
        //open modal
        this.modal.classList.add("open-modal")
        select_element(".modal-header h3").textContent = 'Edit Member'

        //view member data   
        select_element("#member_name").value = name
        select_element("#member_email").value = email
        select_element("#member_phone").value = phone
        select_element("#member_address").value = address

        //select specifix status
        let all_status = select_element("#status").children
        for (var i = 0; i < all_status.length; i++) {
            if (status == all_status[i].value) {
                all_status[i].setAttribute('selected', 'selected')
            }
        }

        //set update content to form submit button
        select_element(".form-submit-button").firstElementChild.textContent = "update"

    }


    //view member from member list
    view_member(element) {


        // let select_element = this.select_element
        // //get member data by id
        // let member_id = element.dataset.id
        // let single_member = this.get_member_by_id(member_id)

        // let { id, name, email, phone, address, status } = single_member

        // //open modal
        // this.modal.classList.add("open-modal")
        // select_element(".modal-header h3").textContent = 'Member Details'

        // //view member data   
        // select_element("#member_name").value = name
        // select_element("#member_email").value = email
        // select_element("#member_phone").value = phone
        // select_element("#member_address").value = address


        // //select specifix status
        // let all_status = select_element("#status").children
        // for (var i = 0; i < all_status.length; i++) {
        //     if (status == all_status[i].value) {
        //         all_status[i].setAttribute('selected', 'selected')
        //     }
        // }




        // //create text file to show total submission of single member
        // let btn = select_element(".form-submit-button")

        // //hide submit button
        // btn.style.display = 'none'


        // //total submission 
        // //total meal
        // //total cost
        // //total Balance


        //show and hide modal for view data
        document.querySelector("#view-modal").classList.add("open-modal")
        let view_modal_close = document.querySelector("#view-modal-close")
        view_modal_close.addEventListener("click", function (event) {
            document.querySelector("#view-modal").classList.remove("open-modal")
        })

        //get outuer function data
        let total_submission = this.total_submission(element.dataset.id)
        let total_meal = this.total_meal(element.dataset.id)
        let total_cost = this.total_cost(total_meal)
        let total_balance = this.total_balance(total_submission, total_cost)

        //show data in view form
        document.getElementById("total_sub").value = total_submission
        document.getElementById("total_meal").value = total_meal
        document.getElementById("total_cost").value = total_cost
        document.getElementById("total_balance").value = total_balance > 0 ? "+"+total_balance: total_balance


    }




    //total submission
    total_submission(member_id) {
        // console.log("member id:", member_id)
        let totalSub = JSON.parse(localStorage.getItem('submissions'))
        var sum = 0
        totalSub.forEach(function (item) {
            if (item.member_id === member_id) {
                sum += parseInt(item.amount)
            }
        })
        //console.log("total submission:",sum)
        return sum
    }

    //total meal
    total_meal(member_id) {

        let meals = JSON.parse(localStorage.getItem("meals"))

        var sum = 0
        meals.forEach(function (meal, index) {
            // console.log(index, meal)
            if (meal.member_id == member_id) {
                //    console.log(index, meal.meals)
                let all_meal = meal.meals
                all_meal.forEach(function (item) {

                    sum += parseInt(item.amount)
                })
            }
        })

        // console.log(sum)
        return sum


    }
    //total cost
    total_cost(total_meal) {
        // console.log("member id:",member_id)
        // console.log("total_submission:",total_submission)
        // console.log("total_meal:",total_meal)

       let totalCost =  this.allCost()
       let totalMeal =  this.allMeal()
       //calculate meal rate
       let mealRate = totalCost/totalMeal
    
       let total_meal_cost_of_single_member = mealRate.toFixed(2)*total_meal
       //console.log(total_meal_cost_of_single_member.toFixed(2))
       return parseFloat(total_meal_cost_of_single_member.toFixed(2))
    }


   
        //total cost method
        allCost() {

            let costs = JSON.parse(localStorage.getItem("costs"))
            var sum = 0
            costs.forEach(element => {
                sum += parseInt(element.amount)
            })
            this.total_cost.innerHTML = sum+" tk"
    
            return sum
        }
    
        //total meal method
        allMeal() {
    
            let meals = JSON.parse(localStorage.getItem("meals"))
    
            var total_meal = 0
            for(var i = 0; i < meals.length; i++){
              var sum = 0
               meals[i].meals.forEach(function(item){
                   sum += item.amount
               })
               total_meal +=sum
            }
            this.total_meal.innerHTML = total_meal
    
            return total_meal
        }


    //total balance
    total_balance(total_submission, total_cost) {
        
        let balance = total_submission - total_cost
        //console.log(balance.toFixed(2))
        return balance.toFixed(2)
    }



    //get single-member by-id
    get_member_by_id(member_id) {

        let member_list = this.member_list
        //get member from member_list array by index
        let member_index = member_list.findIndex((member => member.id == member_id))
        //return single member  
        let single_member = member_list[member_index]
        return single_member
    }


    //delete member
    delete_member(element) {

        let id = element.dataset.id
        let parent = element.parentElement.parentElement
        this.item_list.firstElementChild.lastElementChild.removeChild(parent)
        let members = this.member_list.filter(function (member) {
            return member.id != id
        })
        this.member_list = members
        this.set_data_to_localstorage(this.member_list)
        //console.log(this.member_list)
    }

}//end member class


//dom-content-loaded
document.addEventListener("DOMContentLoaded", function () {

    //create instance of Member class
    const member = new Member()

    //select member form
    let member_form = document.getElementById("member-form")
    member_form.addEventListener("submit", function (event) {
        event.preventDefault()
        member.submit_member_form()
    })

    //edit and delte member
    let item_list = document.querySelector(".item-list")
    item_list.addEventListener("click", function (event) {

        if (event.target.classList.contains('fa-edit')) {
            member.edit_member(event.target.parentElement);
        } else if (event.target.classList.contains('fa-eye')) {
            member.view_member(event.target.parentElement);
        } else if (event.target.classList.contains('fa-trash')) {
            member.delete_member(event.target.parentElement);
        }
    })

})//end dom-content-loader