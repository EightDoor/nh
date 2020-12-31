import React from 'react';
import Taro from '@tarojs/taro';
import {View} from '@tarojs/components';
import {AtNavBar} from 'taro-ui';

const Game = ()=>{
  const ClickLeftIcon = ()=>{
    console.log(123)
    Taro.navigateBack().then(r => console.log(r))
  }
  return (
    <View>
      <AtNavBar  onClickLeftIcon={ClickLeftIcon} title='2048游戏' leftText='返回' />
    </View>
  )
}
export default Game
