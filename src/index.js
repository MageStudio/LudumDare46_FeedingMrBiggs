import { Router, store } from 'mage-engine';
import Scene from './first/Scene';
import reducers from './ui/reducers';

store.createStore(reducers, {}, true);

const assets = {
    Audio: {
        'collected': 'assets/audio/collected.mp3',
        'feeding': 'assets/audio/feeding.mp3',
        'movement': 'assets/audio/movement.mp3'
    },

    Video: {},

    Images: {},

    Scripts: {},

    Textures: {
        'corn.crate': 'assets/textures/corn_crate.jpg'
    },

    Models: {
        'block': 'assets/models/block.gltf',
        'player': 'assets/models/player.gltf'
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
    Router.start(config, assets, '#gameContainer');
});
