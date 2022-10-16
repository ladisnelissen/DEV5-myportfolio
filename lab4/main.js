import './style.css'
//import three
import * as THREE from 'three'
//import OrbitControls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );



			camera.position.z = 5;

      //add orbit controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;

      //build a house using planes
      const house = new THREE.Group();
      scene.add(house);

      //walls
      const walls = new THREE.Mesh(
        new THREE.BoxGeometry(4,2.5,4),
        new THREE.MeshBasicMaterial({color: 0x88aa88})
      );
      walls.position.y = 1.25;
      house.add(walls);


			function animate() {
				requestAnimationFrame( animate );

				
				renderer.render( scene, camera );
			};

			animate();