
let compteur = 0; 
let timer, elements, slides, slideWidth, speed, transition;

window.onload = () => {
   
    const diapo = document.querySelector(".diapo");
    
    speed = diapo.dataset.speed;
    transition = diapo.dataset.transition;

    elements = document.querySelector(".elements");

    
    let firstImage = elements.firstElementChild.cloneNode(true);

   
    elements.appendChild(firstImage);

    slides = Array.from(elements.children);

    
    slideWidth = diapo.getBoundingClientRect().width;

    
    let next = document.querySelector("#nav-droite");
    let prev = document.querySelector("#nav-gauche");

    
    next.addEventListener("click", slideNext);
    prev.addEventListener("click", slidePrev);

  
    timer = setInterval(slideNext, speed);

    
    diapo.addEventListener("mouseover", stopTimer);
    diapo.addEventListener("mouseout", startTimer);
}


function slideNext(){
  
    compteur++;
    elements.style.transition = transition+"ms linear";

    let decal = -slideWidth * compteur;
    elements.style.transform = `translateX(${decal}px)`;

   
    setTimeout(function(){
        if(compteur >= slides.length - 1){
            compteur = 0;
            elements.style.transition = "unset";
            elements.style.transform = "translateX(0)";
        }
    }, transition);
}


 
function slidePrev(){
   
    compteur--;
    elements.style.transition = transition+"ms linear";

    if(compteur < 0){
        compteur = slides.length - 1;
        let decal = -slideWidth * compteur;
        elements.style.transition = "unset";
        elements.style.transform = `translateX(${decal}px)`;
        setTimeout(slidePrev, 1);
    }

    let decal = -slideWidth * compteur;
    elements.style.transform = `translateX(${decal}px)`;
    
}

function stopTimer(){
    clearInterval(timer);
}


function startTimer(){
    timer = setInterval(slideNext, speed);
}
