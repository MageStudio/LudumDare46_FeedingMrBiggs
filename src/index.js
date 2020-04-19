import { Router, store } from 'mage-engine';
import Scene from './first/Scene';
import reducers from './ui/reducers';

store.createStore(reducers, {}, false);

const assets = {
    Audio: {
        'collected': 'assets/audio/collected.mp3',
        'feeding': 'assets/audio/feeding.mp3',
        'movement': 'assets/audio/movement.mp3',
        'lose': 'assets/audio/lose.mp3',
        'win': 'assets/audio/win.mp3'
    },

    Video: {},

    Images: {},

    Scripts: {},

    Textures: {
        'corn.crate': 'assets/textures/corn_crate.jpg',
        'apple.crate': 'assets/textures/apple_crate.jpg',
        'pizza.crate': 'assets/textures/pizza_crate.jpg',
        'pasta.crate': 'assets/textures/pasta_crate.jpg',
        'burger.crate': 'assets/textures/burger_crate.jpg',
        'orange.crate': 'assets/textures/orange_crate.jpg'
    },

    Models: {
        'block': 'assets/models/block.gltf',
        'player': 'assets/models/player.gltf',
        'target': 'assets/models/target.gltf',
        'mrbiggs': 'assets/models/mrBiggs.gltf',
        'bench': 'assets/models/bench.gltf',
        'crate1': 'assets/models/crate1.gltf',
        'crate2': 'assets/models/crate2.gltf',
        'crate3': 'assets/models/crate3.gltf',
        'grass1': 'assets/models/grass1.gltf',
        'grass2': 'assets/models/grass2.gltf',
        'grass3': 'assets/models/grass3.gltf',
        'pebble1': 'assets/models/pebble1.gltf',
        'pebble2': 'assets/models/pebble2.gltf'
    },

    General: {}
};

const config = {

    screen: {
        h : window ? window.innerHeight : 800,
        w : window ? window.innerWidth : 600,
        ratio : window ? (window.innerWidth/window.innerHeight) : (600/800),
        frameRate : 60,
        alpha: true
    },

    lights: {
        shadows: true
    },

    physics: {
        enabled: false,
        path: 'http://localhost:8085/js/mage.physics.js'
    },

    tween: {
        enabled: false
    },

    camera : {
        fov : 75,
        near : 0.1,
        far : 3000000
    }
};

window.addEventListener('load', function() {
    Router.on('/', Scene);
    Router.on('/1', Scene);
    Router.on('/2', Scene);
    Router.on('/3', Scene);
    Router.start(config, assets, '#gameContainer');
});
