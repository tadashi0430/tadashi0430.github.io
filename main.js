import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xf6eedc)
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

camera.position.z = 100
camera.rotation.x = 300
camera.rotation.y = 30
camera.rotation.z = 30

const controls = new OrbitControls(camera, renderer.domElement)

function animate() {
    requestAnimationFrame(animate)

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update()

    renderer.render(scene, camera)
}

// GLTF
const loader = new GLTFLoader()

loader.load(
    'public/fishs.gltf',
    gltf => {
        console.log(gltf)
        scene.add(gltf.scene)

        animate()
    },
    xhr => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    error => {
        console.log('An error happened')
    }
)
