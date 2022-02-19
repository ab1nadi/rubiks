import  * as THREE  from 'three';
import { TetrahedronGeometry } from 'three.js';


let camera, scene, renderer, light


let groupEverything = new THREE.Group();

let groupTop = new THREE.Group();

let groupFront = new THREE.Group();

export function init() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 1000 );
	camera.position.z = 30;
	scene = new THREE.Scene();

	light = new THREE.PointLight( 0xff0000, 1, 100 );
	light.position.set( 50, 50, 50 );
	scene.add( light );

	scene.add(groupEverything);
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	
	document.body.appendChild( renderer.domElement );
}


export function animate()
{
		requestAnimationFrame( animate );

		groupEverything.rotation.x+=0.01;
		renderer.render( scene, camera );
}



function createBox(x,y,z,size, colorObj){
	
	// 4 planes for 1 group
	let group = new THREE.Group();

	// create all the materials and geometries
	let one = new THREE.PlaneGeometry( size,size, );
	let mone = new THREE.MeshBasicMaterial( {color: colorObj.front, side: THREE.DoubleSide} );
	let two = new THREE.PlaneGeometry( size,size);
	let mtwo = new THREE.MeshBasicMaterial( {color: colorObj.left, side: THREE.DoubleSide} );
	let three = new THREE.PlaneGeometry( size,size);
	let mthree = new THREE.MeshBasicMaterial( {color: colorObj.right, side: THREE.DoubleSide} );
	let four = new THREE.PlaneGeometry( size,size);
	let mfour = new THREE.MeshBasicMaterial( {color: colorObj.back, side: THREE.DoubleSide} );
	let five = new THREE.PlaneGeometry( size,size);
	let mfive = new THREE.MeshBasicMaterial( {color: colorObj.top, side: THREE.DoubleSide} );
	let six = new THREE.PlaneGeometry( size,size);
	let msix = new THREE.MeshBasicMaterial( {color: colorObj.bottom, side: THREE.DoubleSide} );

	// create the meshes from the materials and gemoetries
	//////////////////////////////////////////////////////////
	let mesh1 = new THREE.Mesh( one, mone );     // front
	let mesh2 = new THREE.Mesh( two, mtwo );     // left
	const em2 = new THREE.Euler( 0, Math.PI/2, 0, 'XYZ' );
	mesh2.position.x +=size/2;
	mesh2.position.z +=size/2;
	mesh2.setRotationFromEuler(em2);
	let mesh3 = new THREE.Mesh( three, mthree ); // right
	mesh3.position.x -=size/2;
	mesh3.position.z +=size/2;
	const em3 = new THREE.Euler( 0, -Math.PI/2, 0, 'XYZ' );
	mesh3.setRotationFromEuler(em3);
	let mesh4 = new THREE.Mesh( four, mfour );   // back
	mesh4.position.z += size;
	let mesh5 = new THREE.Mesh( five, mfive );	 // top
	const em5 = new THREE.Euler( Math.PI/2, 0, 0, 'XYZ' );
	mesh5.setRotationFromEuler(em5);
	mesh5.position.z+=size/2;
	mesh5.position.y+=size/2;
	let mesh6 = new THREE.Mesh( six, msix );	 // bottom
	const em6 = new THREE.Euler( Math.PI/2, 0, 0, 'XYZ' );
	mesh6.setRotationFromEuler(em6);
	mesh6.position.z+=size/2;
	mesh6.position.y-=size/2;


	group.add(mesh1, mesh2, mesh3, mesh4, mesh5,mesh6);

	group.position.x=x;
	group.position.y=y;
	group.position.z=z;

	return group;
	
}


export function createBoxArray(x,y)
{
	let colorobj = {front: 0xddddd, left: 0x000ee, right: 0x11111, back: 0xfffff, top: 0x99999, bottom: 0x0ffff}
	
	// top
	let t_one = createBox(0,0,0,4, colorobj);
	let t_two = createBox(4.01,0,0,4, colorobj);
	let t_three = createBox(8.02,0,0,4,colorobj);

	let t_four = createBox(0,0,4.01,4, colorobj);
	let t_five = createBox(4.01,0,4.01,4, colorobj);
	let t_six = createBox(8.02,0,4.01,4,colorobj);

	let t_seven = createBox(0,0,8.02,4, colorobj);
	let t_eight = createBox(4.01,0,8.01,4, colorobj);
	let t_nine = createBox(8.02,0,8.02,4,colorobj);

	groupTop.add(t_one,t_two,t_three,t_four,t_five,t_six,t_seven,t_eight,t_nine);


	// front 
	let f_four = createBox(0,4.01,0,4, colorobj);
	let f_five = createBox(4.01,4.01,0,4, colorobj);
	let f_six = createBox(8.02,4.01,0,4,colorobj);

	let f_seven = createBox(0,8.02,0,4, colorobj);
	let f_eight = createBox(4.01,8.02,0,4, colorobj);
	let f_nine = createBox(8.02,8.02,0,4,colorobj);

	groupFront.add(f_four,f_five,f_six,t_one,t_two,t_three, f_seven, f_eight, f_nine)

	groupEverything.add(groupTop, groupFront);
}


