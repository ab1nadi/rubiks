/*
This file just houses some exported functions
for managing the rubiks cube.
*/

import * as THREE from 'three';
import Rubiks from './rubiks_obj'

// some things that need to be initialized
let camera, scene, renderer
let rubiksGroup = new THREE.Group();
let starGroup = new THREE.Group();
let pivot = new THREE.Group();


// the rubiks cube
export let k = new Rubiks(0, 0, 0, 3, 25);




// setVisibility
// sets the visibility 
// of the rubiks cube
export function setVisibility(v)
{
	if(v === true)
		rubiksGroup.visible=true;
	else 
		rubiksGroup.visible=false;
}	

// init
// sets up the scene
// and creates the rubiks cube
export function init(domElementClass, appendedClass,) {


	// create the camera
	camera = new THREE.PerspectiveCamera(45, window.screen.width / window.screen.height, 1, 1000);
	camera.position.z = 500;
	scene = new THREE.Scene();
	scene.add(camera);

	// create an ambient light
	const light = new THREE.AmbientLight(0x404040); // soft white light
	scene.add(light);

	// create a point light
	const pointLight = new THREE.PointLight(0xffffff, 200, 700, 2);
	pointLight.position.set(-300, 300, 500);

	// generate 200 inner stars
	for (let i = 0; i < 100; i++) {
		let x_ = Math.floor(Math.random() * (500 + 500 + 1)) - 500;
		let y_ = Math.floor(Math.random() * (500 + 500 + 1)) - 500;
		let z_ = Math.floor(Math.random() * (500 + 500 + 1)) - 500;

		let geometry = Math.random() > 5 ? new THREE.BoxGeometry(.5, .5, .5) : new THREE.BoxGeometry(2, 2, 2);
		let material = new THREE.MeshBasicMaterial({
			color: 0xffffff
		});
		let cube = new THREE.Mesh(geometry, material);

		cube.position.set(x_, y_, z_);
		starGroup.add(cube);
	}

	// create the rubiks cube 
	k.init(rubiksGroup);


	// add the rubiks cube, starGroup, and pointLIght
	// to the pivot group so we can move everything
	// around this pivot
	pivot.add(rubiksGroup, starGroup, pointLight)

	// add the pivot to the scene
	scene.add(pivot)

	// create the renderer
	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setSize(window.screen.width, window.screen.height);

	const canvas = renderer.domElement;
	canvas.width= window.screen.width;
	canvas.height=window.screen.height;

	// add whatever class the user wanted to it
	canvas.classList.add(appendedClass)
	
	// append it to whatever element the user wanted
	// and return it;
	return document.getElementsByClassName(domElementClass)[0].appendChild(canvas);
}



// animate
// renders the scene
// and does all the animations
export function animate() {
	requestAnimationFrame(animate);
	k.update();

	starGroup.rotation.x += 0.0001;
	starGroup.rotation.y += 0.0001;
	starGroup.rotation.z += 0.0002;

	rubiksGroup.rotation.x -= 0.001;
	rubiksGroup.rotation.y += 0.002;
	renderer.render(scene, camera);
}


// setPivotPosition
// moves the rubiks cube, the light, and all
// the stars around the scene. in relation 
// to x,y pixel coordinates on the screen
export function setPivotPosition(x, y) {
	var planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

	// the screen position
	var mv = new THREE.Vector3(
		(x / window.screen.width) * 2 - 1,
		-(y / window.screen.height) * 2 + 1,
		0);

	// cast a ray to the plane
	// that the rubiks cube is on 
	var raycaster = new THREE.Raycaster()

	raycaster.setFromCamera(mv, camera);

	var pos = new THREE.Vector3();
	raycaster.ray.intersectPlane(planeZ, pos);

	// set the position to the intersection of that ray
	pivot.position.x = pos.x;
	pivot.position.y = pos.y;
}

// doodle
// does a mixing and solving
// animation for the rubiks cube
export function doodle() {
	let stack = [];

	let map = [(e) => k.rotateFront(e), (e) => k.rotateBack(e), (e) => k.rotateLeft(e), (e) => k.rotateRight(e), (e) => k.rotateTop(e), (e) => k.rotateBottom(e)]
	let numberMoves = 100;

	let last = 0;
	// go forward
	for (let i = 0; i < numberMoves; i++) {
		let index = Math.floor(Math.random() * map.length);
		if (index == last)
			index = Math.floor(Math.random() * map.length);

		last = index;

		let rot = Math.floor(Math.random() * 2) == 0 ? true : false;
		stack.push(() => map[index](!rot)); // put it in the stack
		map[index](rot); // call it;
	}

	// go backward
	for (let i = numberMoves - 1; i > -1; i--)
		stack[i]();
}