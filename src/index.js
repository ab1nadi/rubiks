import {init, animate, doodle, setPivotPosition} from "./rubiks.js"


init("holder");
animate();


let top = window.screen.height/2;
let left = window.screen.width/2;
let rightPadding = false;
let loop = false;
let animationOffset = 3000;
let center = false;
let currentPosition = left;
// get query parameters
// if they exist

window.addEventListener("load", (event) => {

    const params = new URLSearchParams(window.location.search)

    if(params.has('top'))
    top = params.get('top');

    if(params.has('left'))
        left = params.get('left');

    if(params.has('rightpadding'))
        rightPadding = params.get('rightpadding');

    if(params.has('loop'))
        loop = params.get('loop');

    if(params.has('animationOffset'))
        animationOffset = parseInt(params.get('animationOffset'));
    if(params.has('center'))
        center = params.get('center');



    // set the initial position
    setPivotPosition(parseInt(left), parseInt(top));

    currentPosition = parseInt(left);

    updatePosition();

    runDoodle();


});




// we want the rubiks cube to go left when we resize
window.addEventListener("resize", (e) =>{
    updatePosition();
});





// runDoodle
// essentially this function
// runs the animation that
// generates a rubiks puzzle
// then solves it
function runDoodle()
{
    setTimeout(() => {
        doodle();
        if(loop)
            runDoodle();
    }, animationOffset);
}

// updatePosition
// updates the position of
// the cube given a right padding
// if nothing was passed it won't update the position
function updatePosition()
{
    console.log(center);
    if(center)
    {
        console.log("made it here")
        currentPosition = window.innerWidth/2;
    }
    // in this case lets just center it
    else if(!rightPadding)
        return;

    else if(window.innerWidth <(parseInt(left)+parseInt(rightPadding)))
       {
            currentPosition = parseInt(window.innerWidth)-parseInt(rightPadding);
       } 
    else if(window.innerWidth> parseInt(left)+parseInt(rightPadding) && currentPosition < parseInt(left))
       {
            currentPosition = parseInt(left);
       }
    setPivotPosition(currentPosition, parseInt(top));
}



