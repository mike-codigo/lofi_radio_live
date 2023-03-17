import * as THREE from 'three';
import {FBXLoader} from 'FBXLoader';
import { RGBELoader } from 'RGBELoader';
import { OrbitControls } from 'OrbitControls';

export { init };


let camera, controls, scene, renderer, clock, mixer;

init("casual-girl");
//render(); // remove when using next line for animation loop (requestAnimationFrame)
animate();

function init(character_name) {
    
    clock = new THREE.Clock();
    scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

    /* HDRI FRANCA*/
    /*new RGBELoader()
        .setPath( '/static/imgs/' )
        .load( 'franca1.hdr', function ( texture ) {

        texture.mapping = THREE.EquirectangularReflectionMapping;

        scene.background = texture;
        scene.environment = texture;
    });*/

    renderer = new THREE.WebGLRenderer( { alpha: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( 750, 700 );
    renderer.setClearColor( 0x000000, 0 );
    document.querySelector("#character").appendChild( renderer.domElement );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 0, 0, 60 );

    // controls

    controls = new OrbitControls( camera, renderer.domElement );
    controls.listenToKeyEvents( window ); // optional

    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;

    controls.minDistance = 2.3;
    controls.maxDistance = 2.3;

    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 2;

    
    const fbxLoader = new FBXLoader()
    fbxLoader.load(
        `/static/three/objs/${character_name}/${character_name}_walking.fbx`,
        (character_obj) => {
            character_obj.traverse(function (child) {
                if (child .isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            })
            character_obj.scale.set(0.8, 0.8, 0.8)
            character_obj.position.setY(-0.8)
            scene.add(character_obj)

            mixer = new THREE.AnimationMixer( character_obj );
    
            character_obj.animations.forEach( ( clip ) => {
    
                mixer.clipAction( clip ).play();
    
            });
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log(error)
        }
    )

    // lights

    const dirLight1 = new THREE.DirectionalLight( 0x5b90b2, 1 );
    dirLight1.position.set( - 1, - 1, - 1 );
    scene.add( dirLight1 );

    const dirLight2 = new THREE.DirectionalLight( 0xB3DC20, 1 );
    dirLight2.position.set( 1, -1, -1 );
    scene.add( dirLight2 );

    const dirLight3 = new THREE.DirectionalLight( 0xfff, 0.5 );
    dirLight2.position.set( 0, 1, 1 );
    scene.add( dirLight3 );

    const ambientLight = new THREE.AmbientLight( 0x5b90b2, 2 );
    scene.add( ambientLight );

    //

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );

    var delta = clock.getDelta();
    
    if ( mixer ) mixer.update( delta );

    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

    render();

}

function render() {

    renderer.render( scene, camera );

}