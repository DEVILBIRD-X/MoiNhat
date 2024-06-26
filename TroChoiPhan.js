// TroChoiPhan.js

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.137.5/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.137.5/examples/jsm/controls/OrbitControls.js';
import nipplejs from 'https://cdn.jsdelivr.net/npm/nipplejs@0.9.0/dist/nipplejs.min.js';

let scene, camera, renderer, controls;
let player, joystick;
let velocity = new THREE.Vector3();
const speed = 0.1;

function init() {
    // Tạo cảnh
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);

    // Tạo camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);

    // Tạo renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Tạo controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.update();

    // Thêm ánh sáng
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    scene.add(light);

    // Tạo mặt đất
    const geometry = new THREE.PlaneGeometry(200, 200);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const ground = new THREE.Mesh(geometry, material);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Tạo nhân vật
    const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
    const playerMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    player = new THREE.Mesh(playerGeometry, playerMaterial);
    player.position.y = 0.5;
    scene.add(player);

    // Tạo joystick
    createJoystick();

    // Bắt đầu vòng lặp render
    animate();
}

function createJoystick() {
    const joystickContainer = document.createElement('div');
    joystickContainer.id = 'joystick';
    document.getElementById('game-container').appendChild(joystickContainer);

    joystick = nipplejs.create({
        zone: document.getElementById('joystick'),
        mode: 'static',
        position: { left: '50%', top: '50%' },
        color: 'blue'
    });

    joystick.on('move', (evt, data) => {
        const angle = data.angle.radian;
        velocity.x = Math.cos(angle) * speed;
        velocity.z = Math.sin(angle) * speed;
    });

    joystick.on('end', () => {
        velocity.set(0, 0, 0);
    });
}

function animate() {
    requestAnimationFrame(animate);

    // Cập nhật vị trí nhân vật
    player.position.add(velocity);

    // Cập nhật vị trí camera để theo dõi nhân vật
    camera.position.x = player.position.x + 10;
    camera.position.z = player.position.z + 10;
    camera.lookAt(player.position);

    renderer.render(scene, camera);
}

// Khởi động game
init();