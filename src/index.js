import {init, animate, doodle, setPivotPosition} from "./rubiks.js"


init("holder");
animate();

const params = new URLSearchParams(window.location.search)

let top = window.screen.availHeight/2;
let left = window.screen.availWidth/2;
let rightPadding = false;
let loop = false;
let animationOffset = 3000;

// get query parameters
// if they exist

setTimeout(()=>
{
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

},30);


// set the initial position
setPivotPosition(parseInt(left), parseInt(top));

let currentPosition = parseInt(left);

updatePosition();

// we want the rubiks cube to go left when we resize
window.addEventListener("resize", (e) =>{
    updatePosition();
});



runDoodle();


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
    if(rightPadding == false)
        return;

    if(window.innerWidth <(parseInt(left)+parseInt(rightPadding)))
       {
            currentPosition = parseInt(window.innerWidth)-parseInt(rightPadding);
       } 
    else if(window.innerWidth> parseInt(left)+parseInt(rightPadding) && currentPosition < parseInt(left))
       {
            currentPosition = parseInt(left);
       }
    setPivotPosition(currentPosition, parseInt(top));
}



