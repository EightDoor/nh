import React, {useEffect} from 'react';
import {AtButton, AtToast} from 'taro-ui';
import Taro from '@tarojs/taro';

import {Text} from '@tarojs/components';
import config from "../../config/config";
import {USERINFO} from "../../utils/constant";

const Home = ()=>{
  useEffect(()=>{
    // getWxCode()
  }, [])
  const getWxCode =() =>{
    const redirectPath = encodeURI("http://localhost:10086/#/pages/index/index")
    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.appid}&redirect_uri=${redirectPath}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
    window.location.href = url;
    console.log(url, 'url')
  }
  const SignIn = async ()=>{
    Taro.setStorageSync(USERINFO, "123")
    try {
      const userInfo = await Taro.getStorage({key: USERINFO})
      console.log(userInfo.data, 'info')
      await Taro.showToast({
        title: "已经签到了",
        icon: "success"
      })
    }catch (err){
      console.log(err, 'err')
    }
  }
  const GoGame = ()=>{
    Taro.navigateTo({
      url: "/pages/game/game"
    })
  }
  return (
    <Text>
      <AtButton onClick={()=>SignIn()}>签到</AtButton>
      <AtButton onClick={()=>GoGame()}>游戏</AtButton>
    </Text>
  )
}
export default Home
