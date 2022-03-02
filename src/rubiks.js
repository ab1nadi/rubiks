import  * as THREE  from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Rubiks from './rubiks_obj'


let camera, scene, renderer

let controls;


let rubiksGroup = new THREE.Group();
let starGroup = new THREE.Group();

export let k = new Rubiks(0,0,0,3,15);

let pivot = new THREE.Group();


export function init(domElementClass, appendedClass) {


	camera = new THREE.PerspectiveCamera( 70, window.screen.width / window.screen.height, 0.01, 1000 );
	camera.position.z = 30;
	scene = new THREE.Scene();

	const light = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( light );

	const pointLight = new THREE.PointLight( 0xffffff, 10, 100 );
	pointLight.position.set( -50, 50, 50 );
	scene.add( pointLight );

	// generate random stars
	for(let i =0; i< 400; i++ )
	{
		let x_ = Math.floor(Math.random() *500)-250;
		let y_ = Math.floor(Math.random() *500)-250;
		let z_ = Math.floor(Math.random() *500)-250;

		let geometry = new THREE.BoxGeometry( .2, .2, .2 );
		let material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
		let cube = new THREE.Mesh( geometry, material );

		cube.position.set(x_,y_,z_);
		starGroup.add(cube);
	}

	

	k.init(rubiksGroup);




	pivot.add(rubiksGroup, starGroup)



	scene.add(pivot)



	//controls.update() must be called after any manual changes to the camera's transform
	camera.position.set( -20, 0, 40 );
	

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.screen.width, window.screen.height );

	let d = renderer.domElement;



	d.classList.add(appendedClass)
	return document.getElementsByClassName(domElementClass)[0].appendChild(d);
}



export function animate()
{
		requestAnimationFrame( animate );
		k.update();

		starGroup.rotation.x+=0.0001;
		starGroup.rotation.y+=0.0001;
		starGroup.rotation.z+=0.0002;

		rubiksGroup.rotation.x-=0.001;
		rubiksGroup.rotation.y+=0.002;
		renderer.render( scene, camera );
}


export function setCameraPosition(x,y)
{
	camera.position.x = x;
	camera.position.y = y;
}


export function doodle()
{
	let stack = [];

	let map = [(e)=>k.rotateFront(e), (e)=>k.rotateBack(e),(e)=>k.rotateLeft(e),(e)=>k.rotateRight(e),(e)=>k.rotateTop(e),(e)=>k.rotateBottom(e)]
	let numberMoves = 400;

	let last = 0;
	// go forward
	for(let i = 0; i<numberMoves; i++)
	{
		let index = Math.floor(Math.random() * map.length);
		if(index == last)
		index = Math.floor(Math.random() * map.length);

		last = index;

		let rot= Math.floor(Math.random()*2)==0?true:false;
		stack.push(()=> map[index](!rot)); // put it in the stack
		map[index](rot);	// call it;
	}

	// go backward
	for(let i = numberMoves-1; i>-1; i--)
		stack[i]();
}





