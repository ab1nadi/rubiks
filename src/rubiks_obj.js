import  * as THREE  from 'three';
import { TetrahedronGeometry } from 'three';
import { Group } from 'three.js';
import {rotateTop, rotateBottom as rB, rotateLeft as rL, rotateRight as rR, rotateBack as rBack, rotateFront as rF} from './rotating3dArray'

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

		

		// so we have a place to store this stuff
		this.everything = [[[0,0,0], [0,0,0], [0,0,0]], [[0,0,0], [0,0,0], [0,0,0]], [[0,0,0], [0,0,0], [0,0,0]]]
		
		this.scene = null;


		this.holder = new THREE.Group();
		this.tempHolder = new THREE.Group();
		this.tempHolder.name ="tempHolder";
		
		this.holder.add(this.tempHolder);




		this.localx;
		this.localy;
		this.localz;

		// animation stuff
		this.animation = "";
		this.clockwise = true; // true is clockwise, false is opposite
		this.animationMaxSteps = 60; //hypothetically this means our animations will take 1 second
		this.animationStep = 0; // this will update every frame;
		this.animationStepAmount = Math.PI/2/this.animationMaxSteps; // the amount to step everyframe
		this.animationQueue = [];  // allows animation functions to be called relatively fast
	}

	// ADDS IT TO THE SCENE
	init(scene)
	{


		this.scene = scene;
		

		this.localx = -1*((this.col-1)*this.gap + this.col*this.size)/2 + this.size/2;
		this.localz = -1*((this.col-1)*this.gap + (this.col)*this.size)/2 
		this.localy = (this.col-1)*this.gap/2 + (this.col)*this.size/2 -this.size/2;





			let id = 0;
	

			for(let y = 0; y<this.col; y++)
			{
				for(let z = 0; z<this.col; z++)
				{
					for(let x = 0; x<this.col; x++)
					{
						let x_ = this.localx+(this.size*x)+(this.gap*x);
						let y_ = this.localy-(this.size*y)-(this.gap*y);
						let z_ = this.localz+(this.size*z)+(this.gap*z);
						let cube = this.createCube(x_,y_,z_,this.size);
						this.holder.add(cube);
						scene.add(this.holder);


						this.everything[y][z][x] = {obj: cube, id: id++};

           
					}
				}
			}
		
			// setup the infinite loop that will check if the animation stack
			// has an animation we want to run 
			setInterval(()=>{
				// lets do this forever pretty much
				if(this.animation=="" && this.animationQueue.length>0)
				{
					let f = this.animationQueue.shift(); // pop it off the back
					f(); // call the animation function
				}
			},0)
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
		
			// create the meshes from the materials and gemoetriesv  
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

	// this function gets called every
	// frame 
	update()
	{
		if(this.animation==="y")
		{
			// animating
			if(this.animationStep < this.animationMaxSteps)
			{
				if(!this.clockwise)
					this.tempHolder.rotation.y+=this.animationStepAmount;
				else 
					this.tempHolder.rotation.y-=this.animationStepAmount;

					this.animationStep++;
			}
			// done animating
			else 
				this.animationDone();
		
		}
		else if(this.animation==="x")
		{
			// animating
			if(this.animationStep < this.animationMaxSteps)
			{
				if(this.clockwise)
					this.tempHolder.rotation.x+=this.animationStepAmount;
				else
					this.tempHolder.rotation.x-=this.animationStepAmount;

					this.animationStep++;
			}
			// done animating
			else 
				this.animationDone();	
		}

		else if(this.animation==="z")
		{
			// animating
			if(this.animationStep < this.animationMaxSteps)
			{
				if(!this.clockwise)
					this.tempHolder.rotation.z+=this.animationStepAmount;
				else
					this.tempHolder.rotation.z-=this.animationStepAmount;

					this.animationStep++;
			}
			// done animating
			else 
				this.animationDone();	
		}
		
	}


	rotateTop(clockwise)
	{
			// means that we can animate 
			if(this.animation == "")
			{
				this.clockwise = clockwise;
				for(let z = 0; z<3; z++)
					for(let x = 0; x<3; x++)
						this.tempHolder.attach(this.everything[0][z][x].obj);
				
				// rotate the everything holder
				rotateTop(this.everything, clockwise);

				this.animation="y";; // this will start the animation in the update loop

			}
			else 
			{
				this.animationQueue.push(()=>this.rotateTop(clockwise))
			}
	}

	rotateBottom(clockwise)
	{

		// means that we can animate 
		if(this.animation == "")
		{
			this.clockwise = clockwise;
			for(let z = 0; z<3; z++)
				for(let x = 0; x<3; x++)
					this.tempHolder.attach(this.everything[2][z][x].obj);
			
			// rotate the everything holder
			rB(this.everything, clockwise);

			this.animation="y";; // this will start the animation in the update loop

		}
		else 
			{
				this.animationQueue.push(()=>this.rotateBottom(clockwise))
			}
	}

	rotateLeft(clockwise)
	{
		// means that we can animate 
		if(this.animation == "")
		{
			this.clockwise = clockwise
			for(let y = 0; y<this.col; y++)
				for(let z = 0; z<this.col; z++)
				     this.tempHolder.attach(this.everything[y][z][0].obj);
			
			
			// rotate the everything holder
			rL(this.everything, clockwise);

			this.animation="x";; // this will start the animation in the update loop

		}
		else 
			{
				this.animationQueue.push(()=>this.rotateLeft(clockwise))
			}
	}

	rotateRight(clockwise)
	{    
	

		// means that we can animate 
		if(this.animation == "")
		{
		
			this.clockwise = !clockwise
			for(let y = 0; y<this.col; y++)
				for(let z = 0; z<this.col; z++)
					{
						this.tempHolder.attach(this.everything[y][z][this.col-1].obj);
					}
			
			// rotate the everything holder
			rR(this.everything, !clockwise);


			this.animation="x";; // this will start the animation in the update loop

		}
		else 
			{
				this.animationQueue.push(()=>this.rotateRight(clockwise))
			}
	}


	rotateBack(clockwise)
	{    
		// means that we can animate 
		if(this.animation == "")
		{
			this.clockwise = clockwise
			for(let y = 0; y<this.col; y++)
				for(let x = 0; x<this.col; x++)
					this.tempHolder.attach(this.everything[y][0][x].obj);
			
			// rotate the everything holder
			rBack(this.everything, clockwise);

			this.animation="z";; // this will start the animation in the update loop

		}
		else 
			{
				this.animationQueue.push(()=>this.rotateBack(clockwise))
			}
	}

	rotateFront(clockwise)
	{    
		// means that we can animate 
		if(this.animation == "")
		{
			this.clockwise = clockwise
			for(let y = 0; y<this.col; y++)
				for(let x = 0; x<this.col; x++)
					this.tempHolder.attach(this.everything[y][this.col-1][x].obj);
			
			// rotate the everything holder
			rF(this.everything, clockwise);

			this.animation="z";; // this will start the animation in the update loop

		}
		else 
			{
				this.animationQueue.push(()=>this.rotateFront(clockwise))
			}
	}

	animationDone()
	{
		this.animation="";
		this.animationStep = 0;

		// save the current position data 
		// so moving them into the holder doesnt 
		// screw them up 

		let chil = [...this.tempHolder.children]
		for(let i = 0; i<chil.length; i++)
		{	
			let current = chil[i];
			this.holder.attach(current);
			this.tempHolder.remove(current);
		}


		this.holder.remove(this.tempHolder);
		this.tempHolder = new THREE.Group();

		this.holder.add(this.tempHolder);

	}


	printEverything()
	{
		console.log("[")
		for(let y=0; y<this.col; y++)
		{	
			console.log("[")
			for(let z=0; z<this.col; z++)
			{

				let printed = "[";
				for(let x=0; x<this.col; x++)
				{
						printed += this.everything[y][z][x].id+", ";
				}

				console.log(printed + "],");

			}
			console.log("],")
		}
		console.log("]")
	}


}




