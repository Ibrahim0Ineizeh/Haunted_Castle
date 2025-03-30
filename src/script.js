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
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

// Floor 
const floorAlphaTexture = textureLoader.load("./floor/alpha.jpg")
const floorColorTexture = textureLoader.load("./floorTwo/brown_mud_diff.jpg")
const floorARMTexture = textureLoader.load("./floorTwo/brown_mud_arm.jpg")
const floorDispTexture = textureLoader.load("./floorTwo/brown_mud_disp.jpg")
const floorNormalTexture = textureLoader.load("./floorTwo/brown_mud_nor_gl.jpg")

floorColorTexture.colorSpace = THREE.SRGBColorSpace

floorColorTexture.repeat.set(8, 8)
floorColorTexture.wrapS = THREE.RepeatWrapping
floorColorTexture.wrapT = THREE.RepeatWrapping

floorARMTexture.repeat.set(8, 8)
floorARMTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping

floorDispTexture.repeat.set(8, 8)
floorDispTexture.wrapS = THREE.RepeatWrapping
floorDispTexture.wrapT = THREE.RepeatWrapping

floorNormalTexture.repeat.set(8, 8)
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping

// Walls
const wallColorTexture = textureLoader.load("./walls/seaworn_diff.jpg")
const wallARMTexture = textureLoader.load("./walls/seaworn_arm.jpg")
const wallNormalTexture = textureLoader.load("./walls/seaworn_nor_gl.jpg")

wallColorTexture.colorSpace = THREE.SRGBColorSpace

wallColorTexture.repeat.set(3, 1.75)
wallColorTexture.wrapS = THREE.RepeatWrapping
wallColorTexture.wrapT = THREE.RepeatWrapping

wallARMTexture.repeat.set(3, 1.75)
wallARMTexture.wrapS = THREE.RepeatWrapping
wallARMTexture.wrapT = THREE.RepeatWrapping

wallNormalTexture.repeat.set(3, 1.75)
wallNormalTexture.wrapS = THREE.RepeatWrapping
wallNormalTexture.wrapT = THREE.RepeatWrapping

// Wood
const woodColorTexture = textureLoader.load("./wood/bark_diff.jpg")
const woodARMTexture = textureLoader.load("./wood/brak_arm.jpg")
const woodNormalTexture = textureLoader.load("./wood/bark_nor_gl.jpg")

woodColorTexture.colorSpace = THREE.SRGBColorSpace

woodColorTexture.repeat.set(1, 2)
woodColorTexture.wrapS = THREE.RepeatWrapping
woodColorTexture.wrapT = THREE.RepeatWrapping

woodARMTexture.repeat.set(1, 2)
woodARMTexture.wrapS = THREE.RepeatWrapping
woodARMTexture.wrapT = THREE.RepeatWrapping

woodNormalTexture.repeat.set(1, 2)
woodNormalTexture.wrapS = THREE.RepeatWrapping
woodNormalTexture.wrapT = THREE.RepeatWrapping

// Bush
const bushColorTexture = textureLoader.load("./bush/bush_diff.jpg")
const bushRoughTexture = textureLoader.load("./bush/bush_rough.jpg")
const bushNormalTexture = textureLoader.load("./bush/bush_nor.jpg")
const bushDispTexture = textureLoader.load("./bush/bush_disp.jpg")

bushColorTexture.colorSpace = THREE.SRGBColorSpace

bushColorTexture.repeat.set(1, 1)
bushColorTexture.wrapS = THREE.RepeatWrapping
bushColorTexture.wrapT = THREE.RepeatWrapping

bushRoughTexture.repeat.set(1, 1)
bushRoughTexture.wrapS = THREE.RepeatWrapping
bushRoughTexture.wrapT = THREE.RepeatWrapping

bushNormalTexture.repeat.set(1, 1)
bushNormalTexture.wrapS = THREE.RepeatWrapping
bushNormalTexture.wrapT = THREE.RepeatWrapping

bushDispTexture.repeat.set(1, 1)
bushDispTexture.wrapS = THREE.RepeatWrapping
bushDispTexture.wrapT = THREE.RepeatWrapping

// Door 
const doorColorTexture = textureLoader.load("./door/woodenDoor_diff.jpg")
const doorARMTexture = textureLoader.load("./door/woodenDoor_arm.jpg")
const doorNormalTexture = textureLoader.load("./door/woodenDoor_normal_gl.jpg")
const doorDispTexture = textureLoader.load("./door/woodenDoor_disp.jpg")
const doorAOTexture = textureLoader.load("./door/woodenDoor_ad.jpg")

doorColorTexture.colorSpace = THREE.SRGBColorSpace
/**
 * House
 */

// Floor 
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40, 200, 200),
    new THREE.MeshStandardMaterial({
        alphaMap : floorAlphaTexture,
        transparent: true,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        displacementMap: floorDispTexture,
        normalMap: floorNormalTexture,
        displacementScale: 0.5,
        displacementBias: -0.08
    })
)
floor.rotation.x= - Math.PI * 0.5
scene.add(floor)

// gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name("DisplacementScale")
// gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name("DisplacementBias")

const castle = new THREE.Group()
scene.add(castle)

const wallMaterial = new THREE.MeshStandardMaterial({
    map: wallColorTexture,
    aoMap: wallARMTexture,
    roughnessMap: wallARMTexture,
    metalnessMap: wallARMTexture,
    normalMap: wallNormalTexture,
})

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(7, 3.5, 7, 30, 30, 30),
    wallMaterial
)
walls.position.y += 1.75
castle.add(walls)

//Towers 
const towerGeometry = new THREE.CylinderGeometry(1, 1, 5, 32);

// Tower Top Right
const towerTR = new THREE.Mesh(
    towerGeometry,
    wallMaterial
);
towerTR.position.x += 3.3;
towerTR.position.y += 2.25; 
towerTR.position.z -= 3.3;
castle.add(towerTR)

const towerTL = new THREE.Mesh(
    towerGeometry,
    wallMaterial
);
towerTL.position.x -= 3.3;
towerTL.position.y += 2.25; 
towerTL.position.z -= 3.3;
castle.add(towerTL)

const towerBR = new THREE.Mesh(
    towerGeometry,
    wallMaterial
);
towerBR.position.x += 3.3;
towerBR.position.y += 2.25; 
towerBR.position.z += 3.3;
castle.add(towerBR)

const towerBL = new THREE.Mesh(
    towerGeometry,
    wallMaterial
);
towerBL.position.x -= 3.3;
towerBL.position.y += 2.25; 
towerBL.position.z += 3.3;
castle.add(towerBL)

// Castle Door 
const castleDoor = new THREE.Mesh(
    new THREE.PlaneGeometry(2.5, 2, 25, 25),
    new THREE.MeshStandardMaterial({
        aoMap: doorAOTexture,
        map: doorColorTexture,
        aoMap: doorARMTexture,
        roughnessMap: doorARMTexture,
        metalnessMap: doorARMTexture,
        displacementMap: doorDispTexture,
        normalMap: doorNormalTexture,
        displacementScale: 0.3,
        displacementBias: -0.1
    })
);
castleDoor.position.y += 0.9;
castleDoor.position.z += 3.51;
castle.add(castleDoor)

// Trees
const treeBaseGeo = new THREE.CylinderGeometry(0.08, 0.15, 1, 6)
const treeBranchOneGeo = new THREE.CylinderGeometry(0.03, 0.05, 0.5, 8)
const treeBranchTwoGeo =  new THREE.CylinderGeometry(0.02, 0.05, 1, 8)
const treeBushGeo = new THREE.SphereGeometry(0.8, 32, 16)
const treeBranchMaterial = new THREE.MeshStandardMaterial({
    map: woodColorTexture,
    aoMap: woodARMTexture,
    roughnessMap: woodARMTexture,
    metalnessMap: woodARMTexture,
    normalMap: woodNormalTexture,
})
const treeBushMaterial = new THREE.MeshStandardMaterial({
    map: bushColorTexture,
    normalMap: bushNormalTexture,
    roughnessMap: bushRoughTexture,
    displacementMap: bushDispTexture,
    displacementScale: 0.8
})

//The Trees Group 
const trees = new THREE.Group()
scene.add(trees)

// Creating all Trees
for (let i = 0; i < 80; i++){
    
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
    treeBranchOne.position.y += 0.35
    treeBranchOne.position.x -= 0.1
    treeBranchOne.rotation.z += Math.PI * 0.2
    
    // Creating a tree branch
    const treeBranchTwo = new THREE.Mesh(
       treeBranchTwoGeo,
       treeBranchMaterial
    )
    treeBranchTwo.position.y += 0.4
    treeBranchTwo.position.z += 0.2
    treeBranchTwo.rotation.z += Math.PI * 0.15
    treeBranchTwo.rotation.y += Math.PI * 0.5
    
    // Create a tree bush
    const treeBush = new THREE.Mesh(
        treeBushGeo,
        treeBushMaterial
    )
    treeBush.position.y += 1.3
    
    // Make a group for the tree components and add them to the Group
    const tree = new THREE.Group()
    tree.add(treeBase, treeBranchOne, treeBranchTwo, treeBush)
    
    // Randomize trees
    tree.position.x = positionX
    tree.position.y += 0.315
    tree.position.y += Math.random() * 0.2
    tree.position.z = positionZ
    tree.rotation.x = (Math.random() - 0.3) * 0.2
    tree.rotation.y = Math.random() * Math.PI * 2;
    tree.rotation.z = (Math.random() - 0.3) * 0.3
    trees.add(tree)
}


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.8)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.2)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

const directionalLight2 = new THREE.DirectionalLight('#ffffff', 0.3)
directionalLight2.position.set(-5, 2, +8)
scene.add(directionalLight2)

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