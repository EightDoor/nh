import React, {useState} from 'react'
import { View } from '@tarojs/components'
import { AtTabBar} from 'taro-ui';
import { TabItem} from "taro-ui/types/tab-bar";
import './index.less'


import Home from '../home/home';
// import Game from "../game/game";
import My from "../my/my";

interface  TabBarType {
  current: number;
  tabList: TabItem[]
}
const Index = ()=>{
  const [tabBar, setTabBar] = useState<TabBarType>({
    current: 0,
    tabList: [
      {
        title: '首页',
        iconType: 'home'
      },
      // {
      //   title: '游戏',
      //   iconType: 'play'
      // },
      {
        title: '我的',
        iconType: 'user'
      }
    ],
  });
  const ChangeBar = (index: number)=>{
    setTabBar({...tabBar, current: index})
  }
  return (
      <View>
        <AtTabBar fixed current={tabBar.current} tabList={tabBar.tabList} onClick={ChangeBar} />
        {
          tabBar.current === 0?
            <Home />:null
        }
        {/*{*/}
        {/*  tabBar.current === 1?*/}
        {/*    <Game />:null*/}
        {/*}*/}
        {
          tabBar.current === 1?
            <My />:null
        }
      </View>
  )
}
export default Index

