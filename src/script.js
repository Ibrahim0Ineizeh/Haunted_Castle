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
    new THREE.PlaneGeometry(40, 40),
    new THREE.MeshStandardMaterial()
)
floor.rotation.x= - Math.PI * 0.5
scene.add(floor)

const castle = new THREE.Group()
scene.add(castle)

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(7, 3.5, 7),
    new THREE.MeshStandardMaterial({color: "gray"})
)
walls.position.y += 1.75
castle.add(walls)

//Towers 
const towerGeometry = new THREE.CylinderGeometry(1, 1, 5, 32);
const towerMaterial = new THREE.MeshStandardMaterial({color: "gray"});

// Tower Top Right
const towerTR = new THREE.Mesh(
    towerGeometry,
    towerMaterial
);
towerTR.position.x += 3.3;
towerTR.position.y += 2.25; 
towerTR.position.z -= 3.3;
castle.add(towerTR)

const towerTL = new THREE.Mesh(
    towerGeometry,
    towerMaterial
);
towerTL.position.x -= 3.3;
towerTL.position.y += 2.25; 
towerTL.position.z -= 3.3;
castle.add(towerTL)

const towerBR = new THREE.Mesh(
    towerGeometry,
    towerMaterial
);
towerBR.position.x += 3.3;
towerBR.position.y += 2.25; 
towerBR.position.z += 3.3;
castle.add(towerBR)

const towerBL = new THREE.Mesh(
    towerGeometry,
    towerMaterial
);
towerBL.position.x -= 3.3;
towerBL.position.y += 2.25; 
towerBL.position.z += 3.3;
castle.add(towerBL)

// Castle Door 
const castleDoor = new THREE.Mesh(
    new THREE.PlaneGeometry(2.5, 2),
    new THREE.MeshStandardMaterial({color: "brown"})
);
castleDoor.position.y += 0.7;
castleDoor.position.z += 3.51;
castle.add(castleDoor)

// Trees
const treeBaseGeo = new THREE.CylinderGeometry(0.08, 0.15, 2, 8)
const treeBranchOneGeo = new THREE.CylinderGeometry(0.03, 0.05, 1, 8)
const treeBranchTwoGeo =  new THREE.CylinderGeometry(0.02, 0.05, 2, 8)
const treeBushGeo = new THREE.SphereGeometry(1.1, 16, 8)
const treeBranchMaterial = new THREE.MeshStandardMaterial({color : "brown"})
const treeBushMaterial = new THREE.MeshStandardMaterial({color : "green"})

//The Trees Group 
const trees = new THREE.Group()
scene.add(trees)

// Creating all Trees
for (let i = 0; i < 40; i++){
    
    // Creating an angle for the tree 
    const angle = Math.random() * Math.PI * 2
    const radius = 7 + Math.random() * 12
    const positionX = Math.sin(angle) * radius
    const positionZ = Math.cos(angle) * radius
    
    // Creating the tree Base
    const treeBase = new THREE.Mesh(
        treeBaseGeo,
        treeBranchMaterial
    ) 
    
    // Creating a tree branch
    const treeBranchOne = new THREE.Mesh(
        treeBranchOneGeo,
        treeBranchMaterial
    )
    treeBranchOne.position.y += 0.9
    treeBranchOne.position.x -= 0.3
    treeBranchOne.rotation.z += Math.PI * 0.2
    
    // Creating a tree branch
    const treeBranchTwo = new THREE.Mesh(
       treeBranchTwoGeo,
       treeBranchMaterial
    )
    treeBranchTwo.position.y += 1
    treeBranchTwo.position.z += 0.5
    treeBranchTwo.rotation.z += Math.PI * 0.15
    treeBranchTwo.rotation.y += Math.PI * 0.5
    
    // Create a tree bush
    const treeBush = new THREE.Mesh(
        treeBushGeo,
        treeBushMaterial
    )
    treeBush.position.y += 2
    
    // Make a group for the tree components and add them to the Group
    const tree = new THREE.Group()
    tree.add(treeBase, treeBranchOne, treeBranchTwo, treeBush)
    
    // Randomize trees
    tree.position.x = positionX
    tree.position.y += 0.6
    tree.position.y += Math.random() * 0.3
    tree.position.z = positionZ
    tree.rotation.x = (Math.random() - 0.3) * 0.4 
    tree.rotation.z = (Math.random() - 0.3) * 0.3
    trees.add(tree)
}


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
camera.position.x = 15
camera.position.y = 15
camera.position.z = 25
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