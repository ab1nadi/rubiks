import  * as THREE  from 'three';
import Rubiks from './rubiks_obj'


let camera, scene, renderer, light


let boxStorage;

let groupEverything = new THREE.Group();

let pivot = new THREE.Group();

let k = new Rubiks(6,6,6,3);

window.rotateTop =()=> k.rotateTop();
export function init() {

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
		renderer.render( scene, camera );
}





