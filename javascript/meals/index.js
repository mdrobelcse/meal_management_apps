// import meal_list from './data.js'

//meal class

class Meal {


    //constructor method
    constructor() {
        this.all_meal = document.querySelectorAll("#meal")
        this.all_date = document.querySelectorAll("#date")
        this.member_id = document.querySelector("#member_id")
        this.item_list = document.querySelector(".item-list")
        this.modal = document.querySelector("#modal")
        this.meal_list = this.get_data_from_localstorage()
        this.show_member()


    }

    //submit meal form
    submit_meal_form() {
        let all_meal = this.all_meal
        let all_date = this.all_date
        let member_id = this.member_id
        let meal_list = this.meal_list

        let id = document.getElementById("id")

        //check if object exist , if exist then update this object else insert this object
        function updateData(obj) {
            var objFound_bool = false;
            for (var i = 0; i < meal_list.length; i++) {
                if (obj.member_id === meal_list[i].member_id) {
                    objFound_bool = true;
                    meal_list[i] = obj
                    //console.log("data updated")
                }
            }
            if (!objFound_bool) {
                meal_list.push(obj)
                //console.log("data inserted")
            }
        }


        //create a new object
        let meal = {
            id: parseInt(member_id.value),
            member_id: parseInt(member_id.value),
        }

        let meals = []

        //initialize object value after catch from form
        for (var i = 0; i < all_date.length; i++) {
            meals.push({ date: parseInt(all_date[i].innerHTML), amount: parseInt(all_meal[i].value) })
        }

        meal["meals"] = meals
        updateData(meal)
        this.set_data_to_localstorage(meal_list)
        this.update_dom()
        //console.log(meal_list)


    }


    //show meal in dom by traversing meal_list array
    show_member() {

        let all_member = this.get_all_member_from_localstorage()
        var self = this
        all_member.forEach(function (member) {
            self.add_member(member)
        })

        //console.log(all_member)
    }

    //add meal to dom
    add_member(member) {
        let single_meal = this.get_meal_by_id(member.id)
       // console.log(single_meal)
        // count total meal
        let total_meal = 0
        if (single_meal !== 0) {
            single_meal.meals.forEach(function (item) {
                total_meal += item.amount
            })
        }else{
          
            total_meal = 0

        }
        const tr = document.createElement("tr")
        tr.innerHTML = `<td>${member.id}</td>
        <td>${member.id}</td>
         <td>${total_meal}</td>
         <td>
             <a href="#" data-id="${member.id}"><i class="fa fa-edit"></i></a>
         </td>`

        this.item_list.firstElementChild.lastElementChild.appendChild(tr)

    }


    //update dom
    update_dom() {

        this.item_list.firstElementChild.lastElementChild.textContent = ''
        let all_memners = this.get_all_member_from_localstorage()
        var self = this
        all_memners.forEach(function (member) {
            self.add_member(member)
        })

    }

    //edit_meal 

    edit_meal(element) {

        let id = element.dataset.id

        this.modal.classList.add("open-modal")
        //this.get_meal_by_id(id)
        let single_meal = this.get_meal_by_id(id)
        let all_meal = document.querySelectorAll("#meal")

        if (single_meal === 0) {
            document.querySelector("#member_id").value = id
            for (var i = 0; i < all_meal.length; i++) {
                all_meal[i].value = 0
            }
        } else {

            document.querySelector("#member_id").value = single_meal.member_id
            for (var i = 0; i < all_meal.length; i++) {
                all_meal[i].value = single_meal.meals[i].amount
            }
        }

    }

    //get date by-id
    get_meal_by_id(id) {

        //  console.log(id)

        let meal_list = this.meal_list
        //get meal from member_list array by index
        let meal_index = meal_list.findIndex((meal => meal.id == id))
        //return single member  
        if (meal_index < 0) {

            return 0
        }

        let single_meal = meal_list[meal_index]
        return single_meal
    }


    //set data to localstorage
    set_data_to_localstorage(meals) {
        localStorage.setItem('meals', JSON.stringify(meals));
    }

    //get data from localstorage
    get_data_from_localstorage() {
        let meals = JSON.parse(localStorage.getItem('meals'))
        return meals || []
    }

    //get all of the member from local storage

    get_all_member_from_localstorage() {

        let members = JSON.parse(localStorage.getItem('members'))
        return members || []
    }






}//end meal class


window.addEventListener("DOMContentLoaded", function () {



    //create new instance of Meal class
    let meal = new Meal()
    //submit meal form
    let meal_form = document.getElementById("meal_form")
    meal_form.addEventListener("submit", function (event) {
        event.preventDefault()
        meal.submit_meal_form()

    })
    //edit and delte member
    let item_list = document.querySelector(".item-list")
    item_list.addEventListener("click", function (event) {

        if (event.target.classList.contains('fa-edit')) {
            meal.edit_meal(event.target.parentElement);
        }
    })

})

















/*
let meal_list = [

    {
        id: 1,
        member_id: 1,
        meals: [
            { date: 1, amount: 1 },
            { date: 2, amount: 4 },
            { date: 3, amount: 1 },
            { date: 4, amount: 2 },
            { date: 5, amount: 3 }
        ]
    },
    {
        id: 2,
        member_id: 2,
        meals: [
            { date: 1, amount: 1 },
            { date: 2, amount: 4 },
            { date: 3, amount: 1 },
            { date: 4, amount: 2 },
            { date: 5, amount: 3 }
        ]
    },
    // {
    //     id: 3,
    //     member_id: 3,
    //     meals: [
    //         { date: 1, amount: 1 },
    //         { date: 2, amount: 4 },
    //         { date: 3, amount: 1 },
    //         { date: 4, amount: 2 },
    //         { date: 5, amount: 3 }
    //     ]
    // }

]


let meal_form = document.getElementById("meal_form")
meal_form.addEventListener("submit", function (event) {
    event.preventDefault()

    let all_meal = document.querySelectorAll("#meal")
    let all_date = document.querySelectorAll("#date")
    let member_id = document.querySelector("#member_id")

    //check if object exist , if exist then update this object else insert this object
    function updateData(obj) {
        var objFound_bool = false;
        for (var i = 0; i < meal_list.length; i++) {
            if (obj.member_id === meal_list[i].member_id) {
                objFound_bool = true;
                meal_list[i] = obj
                console.log(meal_list[i])
            }
        }
        if (!objFound_bool) {
            meal_list.push(obj)
        }
    }


    //create a new object

    let meal = {
        id: 3,
        member_id: parseInt(member_id.value),
    }

    let meals = []

    //initialize object value after catch from form
    for (var i = 0; i < all_date.length; i++) {
        meals.push({ date: parseInt(all_date[i].innerHTML), amount: parseInt(all_meal[i].value) })
    }

    meal["meals"] = meals

    updateData(meal)
    console.log(meal_list)




})//

*/



