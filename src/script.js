import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * House
 */

// Floor 
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.MeshStandardMaterial()
)
floor.rotation.x= - Math.PI * 0.5
scene.add(floor)

const castle = new THREE.Group()
scene.add(castle)

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(5, 2.5, 5),
    new THREE.MeshStandardMaterial({color: "gray"})
)
walls.position.y += 1.25
castle.add(walls)

//Towers 
const towerGeometry = new THREE.CylinderGeometry(0.8, 0.8, 3.4, 32);
const towerMaterial = new THREE.MeshStandardMaterial({color: "gray"});

// Tower Top Right
const towerTR = new THREE.Mesh(
    towerGeometry,
    towerMaterial
);
towerTR.position.x += 2.5;
towerTR.position.y += 1.7; 
towerTR.position.z -= 2.5;
castle.add(towerTR)

const towerTL = new THREE.Mesh(
    towerGeometry,
    towerMaterial
);
towerTL.position.x -= 2.5;
towerTL.position.y += 1.7; 
towerTL.position.z -= 2.5;
castle.add(towerTL)

const towerBR = new THREE.Mesh(
    towerGeometry,
    towerMaterial
);
towerBR.position.x += 2.5;
towerBR.position.y += 1.7; 
towerBR.position.z += 2.5;
castle.add(towerBR)

const towerBL = new THREE.Mesh(
    towerGeometry,
    towerMaterial
);
towerBL.position.x -= 2.5;
towerBL.position.y += 1.7; 
towerBL.position.z += 2.5;
castle.add(towerBL)

// Castle Door 
const castleDoor = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 1.5),
    new THREE.MeshStandardMaterial({color: "brown"})
);
castleDoor.position.y += 0.7;
castleDoor.position.z += 2.51;
castle.add(castleDoor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.7)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 5
camera.position.z = 10
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()