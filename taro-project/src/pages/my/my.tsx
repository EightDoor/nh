import React from 'react';
import {View, Text} from '@tarojs/components';
import {AtAvatar} from 'taro-ui';
import "./my.less"

const My = ()=>{
  return (
    <View className='at-row at-row__justify--center container'>
      <View>
        <AtAvatar circle size='large' image='https://jdc.jd.com/img/200' />
        <Text className='title'>名称</Text>
      </View>
    </View>
  )
}
export default My
