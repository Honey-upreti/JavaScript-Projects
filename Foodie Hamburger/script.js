const hamburgericon = document.querySelector('.hamburger-menu')
const headercontent = document.querySelector('.header-content')
const closeicon = document.querySelector('.close-icon')
const nav = document.querySelector('nav')

hamburgericon.addEventListener('click',(evt)=>{
    evt.stopPropagation()
headercontent.classList.add('menu-open')
})
nav.addEventListener('click',(evt)=>{
    evt.stopPropagation()
})

headercontent.addEventListener('click',(evt)=>{
    // evt.stopPropagation()
})

closeicon.addEventListener('click',()=>{
    headercontent.classList.remove('menu-open')
})

const goTo = document.querySelector('.go-to-top')

goTo.addEventListener('click',()=>{
    document.querySelector('.main-content').scrollTo(0,0)
})

window.addEventListener('click',()=>{
    headercontent.classList.remove('menu-open')
})
