import  * as THREE  from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Rubiks from './rubiks_obj'


let camera, scene, renderer

let controls;


let rubiksGroup = new THREE.Group();
let starGroup = new THREE.Group();

export let k = new Rubiks(0,0,0,3,25);

let pivot = new THREE.Group();


export function init(domElementClass, appendedClass) {


	camera = new THREE.PerspectiveCamera( 50, window.screen.width / window.screen.height, 1, 1000 );
	camera.position.z = 500;
	scene = new THREE.Scene();
	scene.add(camera);

	const light = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( light );

	const pointLight = new THREE.PointLight( 0xffffff, 200, 700, 2);
	pointLight.position.set( -300, 300, 500 );


	// generate 200 outer starts
	for(let i =0; i< 200; i++ )
	{
		let x_ = Math.floor(Math.random() * (1000 + 1000 + 1)) -1000;
		let y_ = Math.floor(Math.random() * (1000 +1000 + 1)) -1000;
		let z_ = Math.floor(Math.random() * (1000 +1000 + 1)) -1000;

		let geometry = new THREE.BoxGeometry( 1, 1, 1 );
		let material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
		let cube = new THREE.Mesh( geometry, material );

		cube.position.set(x_,y_,z_);
		starGroup.add(cube);
	}

	// generate 200 inner stars
	for(let i =0; i< 200; i++ )
	{
		let x_ = Math.floor(Math.random() * (600 + 600 + 1)) -600;
		let y_ = Math.floor(Math.random() * (600 + 600 + 1)) -600;
		let z_ = Math.floor(Math.random() * (600 + 600 + 1)) -600;

		let geometry = new THREE.BoxGeometry( .4, .4, .4 );
		let material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
		let cube = new THREE.Mesh( geometry, material );

		cube.position.set(x_,y_,z_);
		starGroup.add(cube);
	}

	

	k.init(rubiksGroup);




	pivot.add(rubiksGroup, starGroup, pointLight)


	scene.add(pivot)




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


export function setPivotPosition(x,y)
{
	var planeZ = new THREE.Plane(new THREE.Vector3(0,0,1), 0);

	var mv = new THREE.Vector3(
    (x / window.screen.width) * 2 - 1,
    -(y / window.screen.height) * 2 + 1,
    0);
	var raycaster = new THREE.Raycaster()
	
	raycaster.setFromCamera( mv, camera );

	var pos = new THREE.Vector3();
		raycaster.ray.intersectPlane(planeZ, pos);

	pivot.position.x = pos.x;
	pivot.position.y = pos.y;
}


export function doodle()
{
	let stack = [];

	let map = [(e)=>k.rotateFront(e), (e)=>k.rotateBack(e),(e)=>k.rotateLeft(e),(e)=>k.rotateRight(e),(e)=>k.rotateTop(e),(e)=>k.rotateBottom(e)]
	let numberMoves = 100;

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





