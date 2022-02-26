import  * as THREE  from 'three';
import Rubiks from './rubiks_obj'


let camera, scene, renderer, light


let boxStorage;

let groupEverything = new THREE.Group();

let pivot = new THREE.Group();

export let k = new Rubiks(0,0,0,3);

window.k = k;
export function init() {

	console.log(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0).normalize(), Math.PI/2))

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 1000 );
	camera.position.z = 30;
	scene = new THREE.Scene();

	light = new THREE.PointLight( 0xff0000, 1, 100 );
	light.position.set( 50, 50, 50 );
	scene.add( light );


	

	k.init(groupEverything);

	scene.add(groupEverything)

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	
	document.body.appendChild( renderer.domElement );
}


export function animate()
{
		requestAnimationFrame( animate );
		k.update();
		groupEverything.rotation.x +=0.01;
		groupEverything.rotation.y +=0.01;
		renderer.render( scene, camera );
}



export function doodle()
{
	let stack = [];

	let map = [(e)=>k.rotateFront(e), (e)=>k.rotateBack(e),(e)=>k.rotateLeft(e),(e)=>k.rotateRight(e),(e)=>k.rotateTop(e),(e)=>k.rotateBottom(e)]
	let numberMoves = 24;

	// go forward
	for(let i = 0; i<numberMoves; i++)
	{
		let index = Math.floor(Math.random() * map.length);
		let rot= Math.floor(Math.random()*2)==0?true:false;
		stack.push(()=> map[index](!rot)); // put it in the stack
		map[index](rot);	// call it;
	}

	// go backward
	for(let i = numberMoves-1; i>-1; i--)
		stack[i]();
}





