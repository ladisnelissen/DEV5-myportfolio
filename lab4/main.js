import './style.css'
//import three
import * as THREE from 'three'
//import OrbitControls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import font loader
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'


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

      //texture for walls
      const textureLoader = new THREE.TextureLoader();
      const wallTexture = textureLoader.load('/textures/bricks.jpg');
      const wallMaterial = new THREE.MeshBasicMaterial({map: wallTexture});
      
      //walls
      const walls = new THREE.Mesh(
        new THREE.BoxGeometry(4,2.5,4),
        wallMaterial
      );
      walls.position.y = 1.25;
      house.add(walls);

      //texture for roof
      const roofTexture = textureLoader.load('/textures/roof.jpg');
      const roofMaterial = new THREE.MeshBasicMaterial({map: roofTexture});
      roofTexture.wrapS = THREE.RepeatWrapping;
      roofTexture.wrapT = THREE.RepeatWrapping;
      roofTexture.repeat.set( 2, 2 );

      //roof
      const roof = new THREE.Mesh(
        new THREE.ConeGeometry(3.5,1,4),
        //import roof texture
        roofMaterial
      );
      roof.position.y = 2.5 + 0.5;
      roof.rotation.y = Math.PI * 0.25;
      house.add(roof);

      //door
      const door = new THREE.Mesh(
        new THREE.PlaneGeometry(0.5,1),
        new THREE.MeshBasicMaterial({color: 0x884422})
      );
      door.position.y = 0.5;
      door.position.z = 2 + 0.01;
      house.add(door);

      //add plane with name on top of door
      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(1,0.5),
        new THREE.MeshBasicMaterial({color: 0x000000})
      );
      plane.position.y = 1.3;
      plane.position.z = 2 + 0.02;
      house.add(plane);

      //add text to plane
      const fontLoader = new FontLoader();
      fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
        const textGeometry = new THREE.TextGeometry(
          'Home',
          {
            font: font,
            size: 0.2,
            height: 0.05,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.05,
            bevelSize: 0.03,
            bevelOffset: 0,
            bevelSegments: 5
          }
        );
          
        const textMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
        const text = new THREE.Mesh(textGeometry, textMaterial);
        text.position.y = 1.3;
        text.position.z = 2 + 0.03;
        text.position.x = -0.25;
        house.add(text);
      });
      


			function animate() {
				requestAnimationFrame( animate );

				
				renderer.render( scene, camera );
			};

			animate();