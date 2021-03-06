import React, {useRef, useState} from 'react';
import * as THREE from 'three';
import {TWEEN} from 'three/examples/jsm/libs/tween.module.min';
import {TrackballControls} from "three/examples/jsm/controls/TrackballControls"
import {CSS3DRenderer, CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
// import State from 'stats.js';
import {useUnmount} from 'ahooks';
import BulletScreen, { StyledBullet } from 'rc-bullets';
import './sign-in.scss'
import {useMount} from "ahooks";
import config from "../config";
const headUrl='https://zerosoul.github.io/rc-bullets/assets/img/heads/girl.jpg';


interface ContentType  {
    title: string;
    url: string
}
// 签到
const SignIn: React.FC = ()=>{
    // 弹幕屏幕
    const containerScreen = useRef<any>(null)
    const [webSocket, setWebSocket] = useState<any>(null)
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
        },
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
        },
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
        InitWebSocket()
    })
    const InitBarrage = ()=>{
        // 给页面中某个元素初始化弹幕屏幕，一般为一个大区块。此处的配置项全局生效
        let s = new BulletScreen(document.querySelector(".barrage"),{duration:20, loopCount: "infinite"});
        // or
        // let s=new BulletScreen(document.querySelector('.screen));
        containerScreen.current = s;
    }
    // 发送弹幕
    const HandleSend = (e: string) => {
        // push 纯文本
        // screen.push(e);
        // or 使用 StyledBullet
        if(containerScreen.current) {
            containerScreen.current.push(
                <StyledBullet
                    head={headUrl}
                    msg={e}
                    backgroundColor={'#fff'}
                    size='large'
                />
            );
        }
        // or 还可以这样使用，效果等同使用 StyledBullet 组件
        // screen.push({msg:e,head:headUrl,color:"#eee", size:"large", backgroundColor:"rgba(2,2,2,.3)"})
    };
    const InitWebSocket = ()=>{
        // webSocket
        const ws = new WebSocket(config.webSocketUrl)
        ws.onmessage = (e)=>{
            //当客户端收到服务端发来的消息时，触发onmessage事件，参数e.data包含server传递过来的数据
            console.log(e.data);
            HandleSend(e.data)
        }
        ws.onopen = ()=>{
            //当WebSocket创建成功时，触发onopen事件
            console.log("open");
        }
        ws.onclose = (e)=>{
            //当客户端收到服务端发送的关闭连接请求时，触发onclose事件
            console.log("close");
        }
        ws.onerror = (e)=>{
            //如果出现连接、处理、接收、发送数据失败的时候触发onerror事件
            console.log(e);
        }
        setWebSocket(ws)
    }

    useUnmount(()=>{
        if(webSocket) {
            webSocket.close()
        }
    })
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

        // const buttonTable: any  = document.getElementById( 'table' );
        // buttonTable.addEventListener( 'click', function () {
        //
        //     transform( targets.table, 2000 );
        //
        // }, false );
        //
        // const buttonSphere: any  = document.getElementById( 'sphere' );
        // buttonSphere.addEventListener( 'click', function () {
        //
        //     transform( targets.sphere, 2000 );
        //
        // }, false );
        //
        // const buttonHelix: any  = document.getElementById( 'helix' );
        // buttonHelix.addEventListener( 'click', function () {
        //
        //     transform( targets.helix, 2000 );
        //
        // }, false );

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
            <div className="barrage"/>
            {/*<div id="menu">*/}
            {/*    <button id="table">TABLE</button>*/}
            {/*    <button id="sphere">SPHERE</button>*/}
            {/*    <button id="helix">HELIX</button>*/}
            {/*</div>*/}
        </>
    )
}
export default SignIn
