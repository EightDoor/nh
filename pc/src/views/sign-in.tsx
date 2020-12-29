import React from 'react';
import * as THREE from 'three';
import {TWEEN} from 'three/examples/jsm/libs/tween.module.min';
import

import './sign-in.scss'

// 签到
const SignIn = ()=>{
    return (
        <>
            <div id="info"><a href="https://threejs.org" target="_blank" rel="noopener">three.js</a> css3d - periodic table.</div>
            <div id="container"></div>
            <div id="menu">
                <button id="table">TABLE</button>
                <button id="sphere">SPHERE</button>
                <button id="helix">HELIX</button>
                <button id="grid">GRID</button>
            </div>
        </>
    )
}
export default SignIn
