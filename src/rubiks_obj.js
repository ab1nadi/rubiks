import  * as THREE  from 'three';
import { Group } from 'three.js';


export default class Rubiks 
{
	constructor(x,y,z,col)
	{
		this.x = x;
		this.y = y;
		this.z = z;
		this.col = col;
		this.gap = 0.02;
		this.size = 4;

		
		this.animationSteps = 100;

		// generate the x,y,z
		// vectors for rotating around
		// the axis

		this.top = [];
		this.left = [];
		this.right = [];
		this.front = [];
		this.back = [];
		this.bottom = [];
		
		this.scene = null;


		this.rotation=null;

		this.holder = null;

		this.tempHolder = null;

		this.localx;
		this.localy;
		this.localz;
	
	}

	// ADDS IT TO THE SCENE
	init(scene)
	{
		this.holder = new THREE.Group();

		this.holder.position.x = this.x;
		this.holder.position.y = this.y;
		this.holder.position.z = this.z;


		this.scene = scene;


		this.localx = -1* ((this.col-1)*this.gap + (this.col-1)*this.size)/2;
		this.localz = -1 * ((this.col-1)*this.gap + (this.col-1)*this.size)/2  -this.size/2;
		this.localy = (this.col-1)*this.gap/2 + (this.col-1)*this.size/2 + this.size/2;;

		console.log(this.localx,this.localz,this.localy)




		scene.add(this.holder)

			for(let x = 0; x<this.col; x++)
			{
				for(let y = 0; y<this.col; y++)
				{
					for(let z = 0; z<this.col; z++)
					{
						let x_ = this.localx+(this.size*x)+(this.gap*x);
						let y_ = this.localy-(this.size*y)-(this.gap*y);
						let z_ = this.localz+(this.size*z)+(this.gap*z);
						let cube = this.createCube(x_,y_,z_,this.size);

						console.log(cube.position)

						this.holder.add(cube);


						
						if(x==0)
						this.left.push(cube);
					if(x==this.col-1)
						this.right.push(cube);
					if(y==0)
						this.top.push(cube);
					if(y==this.col-1)
						this.bottom.push(cube);
					if(z==0)
						this.front.push(cube);
					 if(z==this.col-1)
						this.back.push(cube);

           
					}
				}
			}

	}

	// creates one cube with the correct 
	// colors
	createCube(x,y,z,size){
		
			// 4 planes for 1 group
			let group = new THREE.Group();
		
			// create all the materials and geometries
			let one = new THREE.PlaneGeometry( size,size, );
			let mone = new THREE.MeshBasicMaterial( {color: 0x00f704, side: THREE.DoubleSide} );
			let two = new THREE.PlaneGeometry( size,size);
			let mtwo = new THREE.MeshBasicMaterial( {color:0x0008f7, side: THREE.DoubleSide} );
			let three = new THREE.PlaneGeometry( size,size);
			let mthree = new THREE.MeshBasicMaterial( {color: 0xf76700, side: THREE.DoubleSide} );
			let four = new THREE.PlaneGeometry( size,size);
			let mfour = new THREE.MeshBasicMaterial( {color: 0xff0000, side: THREE.DoubleSide} );
			let five = new THREE.PlaneGeometry( size,size);
			let mfive = new THREE.MeshBasicMaterial( {color:0xFFFFFF, side: THREE.DoubleSide} );
			let six = new THREE.PlaneGeometry( size,size);
			let msix = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
		
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


	rotateTop(multiplier)
	{
			// stuff to be initilized for
			// the rotation
			if(this.tempHolder == null)
			{
				this.tempHolder = new THREE.Group();

				for(let i = 0; i<this.top.length; i++)
					this.tempHolder.add(this.top[i]);
				this.holder.add(this.tempHolder);
			}
		
			let times = [0, 1];
			let values = [0, 1 * Math.PI/2];

			
			let rotationKeyFrame = new THREE.NumberKeyframeTrack('.rotationy', times, values);


			let rotateClip = new THREE.AnimationClip('.rotation', -1, [
				rotationKeyFrame
			  ]);

			let mixer = new THREE.AnimationMixer(this.tempHolder);

			let action = mixer.clipAction(rotateClip);


			action.play();
	}


}
