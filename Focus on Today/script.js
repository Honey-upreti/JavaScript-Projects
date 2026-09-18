const checkbox = document.querySelectorAll('.custom-checkbox')
// const goalContainer = document.querySelectorAll('.goal-container')
const inputfield = document.querySelectorAll('.goal-input')
const errorLabel = document.querySelector('.error-label')
const progressBar = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.progress-value')
const progresslabel = document.querySelector('.progress-label')

const allquotes = ['Raise the bar by completing your goal!', 'Halfway done!', 'Just a step away, keep going!', 'Whoa! you just completed your all goals, Rest now king!']

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}
let completedgoalscount = Object.values(allGoals).filter((goals) => goals.completed).length
progressValue.style.width = `${completedgoalscount / inputfield.length * 100}%`
progressValue.firstElementChild.innerText = `${completedgoalscount}/${inputfield.length} completed`

progresslabel.innerText = allquotes[completedgoalscount]


checkbox.forEach((checkbox) => {
    checkbox.addEventListener('click', (e) => {
        const allgoalsadded = [...inputfield].every(function (input) {
            // console.log(input.value);
            return input.value
        })
        if (allgoalsadded) {
            checkbox.parentElement.classList.toggle('completed');
            const inputId = checkbox.nextElementSibling.id
            // console.log(allGoals[inputId]);
            allGoals[inputId].completed = !allGoals[inputId].completed
            completedgoalscount = Object.values(allGoals).filter((goals) => goals.completed).length
            progressValue.style.width = `${completedgoalscount / inputfield.length * 100}%`
            progressValue.firstElementChild.innerText = `${completedgoalscount}/${inputfield.length} completed`
            progresslabel.innerText = allquotes[completedgoalscount]
            localStorage.setItem('allGoals', JSON.stringify(allGoals))
        } else {
            progressBar.classList.add('show-error')
        }
    })
})

inputfield.forEach((input) => {
    // console.log(allGoals[input.id]);
    if (allGoals[input.id]) {
        input.value = allGoals[input.id].name
        if (allGoals[input.id].completed) {
            input.parentElement.classList.add('completed')
        }
    }

    input.addEventListener('focus', () => {
        progressBar.classList.remove('show-error')
    })
    input.addEventListener('input', (e) => {
        if (allGoals[input.id] && allGoals[input.id].completed) {
            input.value = allGoals[input.id].name
            return
        }
        if (allGoals[input.id]) {
            allGoals[input.id].name = input.value
        } else {
            allGoals[input.id] = {
                name: input.value,
                completed: false
            }
        }
        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })
})