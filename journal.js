import { cardData, navData } from "./data.js"

const viewMoreBtn = document.getElementById("view-more-btn")

let sixCards = true
let numberOfCards = 6

viewMoreBtn.addEventListener('click', chooseNumberOfCards)

function chooseNumberOfCards(){
    sixCards? sixCards = false: sixCards = true

    if (sixCards){
        numberOfCards = 6
        viewMoreBtn.textContent = "view more"
    }
    else{
        numberOfCards = cardData.length
        viewMoreBtn.textContent = "view less"
    }
    renderCards()
    numberOfCards = 6
}

function renderCards(){
    let cardHTML = ``

    for(let i = 0; i < numberOfCards; i++){
        cardHTML += `
            <div class="card">
                <img class="card-img" alt="${cardData[i].alt}" src="${cardData[i].img}">
                <p class="date card-date">${cardData[i].date}</p>
                <h3>${cardData[i].heading}</h3>
                <p class="card-text">${cardData[i].text}</p>
            </div>`
    }
    document.getElementById("card-container").innerHTML = cardHTML
}

function renderHeader(){
    let navElements = ``

    navData.forEach(function(item){
        let thisPage = false
        let link = ""

        if(window.location.href.indexOf(`${item.id}`) != -1){
            thisPage = true
        }

        if(thisPage){
            link = "javascript:void(0);"
        }
        else{
            link = item.link
        }

        navElements += `
        <li><a href="${link}">${item.text}</a></li>`
    })

    document.getElementById("header-container").innerHTML = `
        <img class="blog-logo" src="images/blog.png" alt="blog logo">
        <h1>My learning journal</h1>
        <nav>
            <p class="menu-icon" id="menu-icon"><span class="hamburger-icon" id="hamburger-icon"><i class="fa-solid fa-bars"></i></span> <span class="close-icon" id="close-icon"><i class="fa-solid fa-xmark"></i></span></p>
            <ul id="nav-ul">
                ${navElements}
            </ul>
        </nav>`
}

function renderFooter(){
    document.querySelector("footer").innerHTML = `
        <h5>My Learning Journal</h5>
        <p class="copyright">Copyright &#169 2022</p>`
}

renderHeader()

renderCards()

// The following code is positioned at the end of the file as it references elements which are rendered using previous JavaScript

const navUl = document.getElementById("nav-ul")
const smallScreen = window.matchMedia("(max-width: 479px)")
const menuIcon = document.getElementById("menu-icon")

showHideNavUl(smallScreen) 
smallScreen.addListener(showHideNavUl) 

menuIcon.addEventListener('click', toggleDropdownMenu)

// Hide menu on small screens, and show menu / close icon as appropriate (ref. W3Schools How TO - Media Queries with JavaScript)
function showHideNavUl(smallScreen) {
    if (smallScreen.matches) { 
        navUl.style.display = "none"
        document.getElementById("close-icon").classList.add("hidden")
        document.getElementById("hamburger-icon").classList.remove("hidden")
    } else {
        navUl.style.display = "block"
    }
  }
 
// toggle menu / close icons and dropdown menu display
function toggleDropdownMenu() {
    document.getElementById("close-icon").classList.toggle("hidden")
    document.getElementById("hamburger-icon").classList.toggle("hidden")

    navUl.style.display === "none"? navUl.style.display = "block": navUl.style.display = "none"
}
