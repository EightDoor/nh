import React from 'react';
import * as THREE from 'three';
import {TWEEN} from 'three/examples/jsm/libs/tween.module.min';
import {TrackballControls} from "three/examples/jsm/controls/TrackballControls"
import {CSS3DRenderer, CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
// import State from 'stats.js';
import Barrage from 'barrage-ui';
import example from 'barrage-ui/example.json'; // 组件提供的示例数据


import './sign-in.scss'
import {useMount} from "ahooks";

interface ContentType  {
    title: string;
    url: string
}
// 签到
const SignIn = ()=>{
    const cutomWidth = 2
    const url = "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3582194852,1481557220&fm=26&gp=0.jpg"
    const table: ContentType[]  = [
        {
            title: "H",
            url
        },
        {
            title: "H",
            url
        },
        {
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },{
            title: "H",
            url
        },
    ];

    let camera: THREE.Camera, scene: THREE.Scene, renderer: CSS3DRenderer;
    let controls: TrackballControls;
    let controllRs: OrbitControls

    const objects: any[] = [];
    const targets: any  = { table: [], sphere: [], helix: [] };
    // 设置state面板
    // const stats: any = new State()
    // stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    // document.body.appendChild( stats.dom );

    useMount(()=>{
        init();
        animate();
        let index = 0
        setInterval(()=>{
            if(index === 0) {
                transform( targets.table, 2000 );
            }
            if(index === 1) {
                transform( targets.sphere, 2000 );
            }
            if(index === 2) {
                transform( targets.helix, 2000 );
            }
            index += 1;
            if(index >= 3) {
                index = 0
            }
        }, 4000)
        InitBarrage()
    })
    const InitBarrage = ()=>{
        // 加载弹幕
        const barrage = new Barrage({
            container: document.getElementById('container'), // 父级容器
            data: [
                {
                    "key": "n8alq5l22d8qqbuhgst68g",
                    "time": 1200,
                    "text": "我膨胀了",
                    "fontFamily": "SimSun",
                    "fontSize": 32,
                    "color": "yellow",
                    "createdAt": "2019-01-13T13:34:47.126Z",
                    "avatar": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3582194852,1481557220&fm=26&gp=0.jpg",
                    "avatarSize": 32,
                    "avatarMarginRight": 8
                },
                {
                    "key": "n8alq5l22d8qqbuhgst68g",
                    "time": 1000,
                    "text": "我膨胀了123",
                    "fontFamily": "SimSun",
                    "fontSize": 32,
                    "color": "yellow",
                    "createdAt": "2019-01-13T13:34:47.126Z",
                    "avatar": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3582194852,1481557220&fm=26&gp=0.jpg",
                    "avatarSize": 32,
                    "avatarMarginRight": 8
                },
            ], // 弹幕数据
            config: {
                // 全局配置项
                duration: 20000, // 弹幕循环周期(单位：毫秒)
                defaultColor: '#fff', // 弹幕默认颜色
                fontSize: 24,
                textShadowBlur: 1.0, // 字体阴影扩散，有效值 >= 0
                opacity: 1.0, // 透明度，有效值 0-1
            },
        });
        // 新增一条弹幕
        barrage.add({
            key: 'fctc651a9pm2j20bia8j', // 弹幕的唯一标识
            time: 1000, // 弹幕出现的时间(单位：毫秒)
            text: '这是新增的一条弹幕', // 弹幕文本内容
            fontSize: 24, // 该条弹幕的字号大小(单位：像素)，会覆盖全局设置
            color: '#0ff', // 该条弹幕的颜色，会覆盖全局设置
        });
        // 播放弹幕
        barrage.play();
    }

    function init() {

        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 3000;

        scene = new THREE.Scene();
        // table

        for ( let i = 0; i < table.length; i ++ ) {

            const element = document.createElement( 'div' );
            element.className = 'element';
            // element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';
            element.style.background = `url(${table[i].url})`
            const number: any = document.createElement( 'div' );
            number.className = 'number';
            number.textContent = ( i / 5 ) + 1;
            element.appendChild( number );

            const symbol: any  = document.createElement( 'div' );
            symbol.className = 'symbol';
            symbol.textContent = table[i].title;
            element.appendChild( symbol );

            // const details = document.createElement( 'div' );
            // details.className = 'details';
            // details.innerHTML = table[ i + 1 ] + '<br>' + table[ i + 2 ];
            // element.appendChild( details );

            const objectCSS = new CSS3DObject( element );
            objectCSS.position.x = Math.random() * 4000 - 2000;
            objectCSS.position.y = Math.random() * 4000 - 2000;
            objectCSS.position.z = Math.random() * 4000 - 2000;
            scene.add( objectCSS );

            objects.push( objectCSS );

            const object: any  = new THREE.Object3D();
            object.position.x = ( Math.random() * 2000 ) - 900;
            object.position.y = - ( Math.random() * 2000 ) + 1100;

            targets.table.push( object );

        }

        // sphere

        const vector = new THREE.Vector3();

        for ( let i = 0, l = objects.length; i < l; i ++ ) {

            const phi = Math.acos( - 1 + ( 2 * i ) / l );
            const theta = Math.sqrt( l * Math.PI ) * phi;

            const object = new THREE.Object3D();

            object.position.setFromSphericalCoords( 800, phi, theta );

            vector.copy( object.position ).multiplyScalar( 2 );

            object.lookAt( vector );

            targets.sphere.push( object );

        }

        // helix

        for ( let i = 0, l = objects.length; i < l; i ++ ) {

            const theta = i * 0.175 + Math.PI;
            const y = - ( i * 8 ) + 500;

            const object = new THREE.Object3D();

            object.position.setFromCylindricalCoords( 1700, theta, y );

            vector.x = object.position.x * 2;
            vector.y = object.position.y;
            vector.z = object.position.z * 2;

            object.lookAt( vector );

            targets.helix.push( object );

        }

        // grid

        // for ( let i = 0; i < objects.length; i ++ ) {
        //
        //     const object = new THREE.Object3D();
        //
        //     object.position.x = ( ( i % 5 ) * 400 ) - 800;
        //     object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
        //     object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;
        //
        //     targets.grid.push( object );
        //
        // }

        //

        renderer = new CSS3DRenderer();
        renderer.setSize( window.innerWidth - cutomWidth, window.innerHeight- cutomWidth );
        // @ts-ignore
        document.getElementById( 'container' ).appendChild( renderer.domElement );

        // 自动旋转
        controllRs = new OrbitControls(camera, renderer.domElement)
        controllRs.autoRotate = true

        controls = new TrackballControls( camera, renderer.domElement );
        controls.minDistance = 500;
        controls.maxDistance = 6000;
        controls.addEventListener( 'change', render );

        const buttonTable: any  = document.getElementById( 'table' );
        buttonTable.addEventListener( 'click', function () {

            transform( targets.table, 2000 );

        }, false );

        const buttonSphere: any  = document.getElementById( 'sphere' );
        buttonSphere.addEventListener( 'click', function () {

            transform( targets.sphere, 2000 );

        }, false );

        const buttonHelix: any  = document.getElementById( 'helix' );
        buttonHelix.addEventListener( 'click', function () {

            transform( targets.helix, 2000 );

        }, false );

        transform( targets.table, 2000 );

        //

        window.addEventListener( 'resize', onWindowResize, false );

    }

    function transform( targets: any[], duration: number ) {

        TWEEN.removeAll();

        for ( let i = 0; i < objects.length; i ++ ) {

            const object = objects[ i ];
            const target = targets[ i ];

            new TWEEN.Tween( object.position )
                .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
                .easing( TWEEN.Easing.Exponential.InOut )
                .start();

            new TWEEN.Tween( object.rotation )
                .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
                .easing( TWEEN.Easing.Exponential.InOut )
                .start();

        }

        new TWEEN.Tween( transform )
            .to( {}, duration * 2 )
            .onUpdate( render )
            .start();

    }

    function onWindowResize() {

        // @ts-ignore
        camera.aspect = window.innerWidth / window.innerHeight;
        // @ts-ignore
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth - cutomWidth, window.innerHeight - cutomWidth );

        render();

    }

    function animate() {
        // stats.begin();
        TWEEN.update();
        controls.update();
        controllRs.update()
        // stats.end();
        requestAnimationFrame( animate );
    }

    function render() {

        renderer.render( scene, camera );

    }
    return (
        <>
            <div id="container">
            </div>
            <div id="menu">
                <button id="table">TABLE</button>
                <button id="sphere">SPHERE</button>
                <button id="helix">HELIX</button>
            </div>
        </>
    )
}
export default SignIn
