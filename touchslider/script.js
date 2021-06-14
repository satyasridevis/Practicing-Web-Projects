const slider = document.querySelector(".slider-container"),
slides = Array.from(document.querySelectorAll(".slide"))

let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID = 0,
    currentIndex = 0

// prevent default when dragging image slide

slides.forEach((slide,index)=>{
  
     const slideImage = slide.querySelector("img");
     slideImage.addEventListener("dragstart", (e) => e.preventDefault())

    // TOUCH EVENTS
    slide.addEventListener("touchstart", touchStart(index))
    slide.addEventListener("touchend", touchEnd)
    slide.addEventListener("touchmove", touchMove)

    // MOUSE EVENTS 
    slide.addEventListener("mousedown",touchStart(index));// when press the mouse right click
    slide.addEventListener("mouseup",touchEnd);//when hand off from mouse
    slide.addEventListener("mouseleave",touchEnd);// mouse cursor out of browers or screen
    slide.addEventListener("mousemove",touchMove);

    // to stop right click menu event during slide dragging( Disable context menu)

    window.oncontextmenu = function(event)
    {
        event.preventDefault()
        event.stopPropagation()
        return false;
    }



})

function touchStart(index){
    return function(event)
    {
        
        currentIndex = index;
        startPos = getPositionX(event)
        console.log(startPos)
        isDragging = true;

        animationID = requestAnimationFrame(animation)// animation is function , requestAnimationFrame is method

        slider.classList.add('grabbing');
    }
}

function touchEnd(){
    isDragging = false;
   cancelAnimationFrame(animationID)

   const movedBy = currentTranslate - prevTranslate;
   if(movedBy < - 100 && currentIndex < slides.length - 1)
   currentIndex += 1;

   if(movedBy > 100 && currentIndex > 0)
   currentIndex -= 1;
   setPositionByIndex()

   slider.classList.remove('grabbing')
   
}

function touchMove(event){
    if(isDragging)
    {
    const currentPosition = getPositionX(event)
    currentTranslate = prevTranslate + currentPosition - startPos
    }
}

function getPositionX(event){
    return event.type.includes('mouse') ? event.pageX
    :event.touches[0].clientX
}

function animation(){
    setSliderPosition()
    if(isDragging) requestAnimationFrame(animation)
}

function setSliderPosition()
{
slider.style.transform = `translateX(${currentTranslate}px)`
}

function setPositionByIndex()
{
    currentTranslate = currentIndex * -window.innerWidth;
    prevTranslate = currentTranslate
    setSliderPosition()
}