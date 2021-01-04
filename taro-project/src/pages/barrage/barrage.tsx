import React, {useMemo, useRef, useState} from 'react';
import {useWebSocket, useUnmount, useMount} from 'ahooks';
import Taro from '@tarojs/taro';
import {ScrollView, View, Input, Button, Text} from '@tarojs/components';
import {AtNavBar, AtAvatar} from 'taro-ui';
import "./barrage.less"
import config from "../../config/config";


interface ListItem {
  name: string;
  avatar: string;
  msg: string
}
// 只读属性 readyState 表示连接状态，可以是以下值：
// 0 - 表示连接尚未建立。
// 1 - 表示连接已建立，可以进行通信。
// 2 - 表示连接正在进行关闭。
// 3 - 表示连接已经关闭或者连接不能打开。
enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

const Barrage = ()=>{
  const scrollTop = 0;
  const Threshold = 20;
  const [value, setValue] = useState<string>();
  const messageHistory = useRef([]);
  const [list, setList] = useState<ListItem[]>([
    {
      name: "zk",
      avatar: "http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png",
      msg: "测试"
    },
    {
      name: "zk",
      avatar: "http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png",
      msg: "测试"
    }
  ]);
  const {readyState, sendMessage, latestMessage, disconnect, connect} = useWebSocket(config.websocketUrl + "/123")
  messageHistory.current = useMemo(() => messageHistory.current.concat(latestMessage), [
    latestMessage,
  ]);
  const ClickLeftIcon = ()=>{
    console.log(123)
    Taro.navigateBack().then(r => console.log(r))
  }
  const TextChange = (e: any)=>{
    setValue(e.target.value)
  }
  const Send = ()=>{
    if (sendMessage) {
      sendMessage(value || "")
    }
    Taro.showToast({title: "发送成功", icon: "success"}).then(r=>console.log(r))
    setValue("")
  }
  useUnmount(()=>{
    if (disconnect) {
      disconnect();
    }
  })
  return (
    <View>
      <AtNavBar  onClickLeftIcon={ClickLeftIcon} title='弹幕' leftText='返回' />
      <ScrollView
        scrollY
        scrollWithAnimation
        scrollTop={scrollTop}
        style={{height: "calc(100vh - 100px)"}}
        lowerThreshold={Threshold}
        upperThreshold={Threshold}
      >
        <View className='barrage-container-view'>
          {messageHistory.current.map((message, index)=>{
            return (
              <div key={index}>
                {message?.data}
              </div>
            )
          })}
          {
            list.map((item, index: number)=>{
              return (
                <View className='barrage' key={index}>
                  <View className='barrage-container'>
                    <AtAvatar circle size='small' image={item.avatar} />
                    <Text className='barrage-container-text'>{item.name}</Text>
                  </View>
                  <Text className='barrage-content'>{item.msg}</Text>
                </View>
              )
            })
          }
        </View>
        <Input className='textInput' type='text' placeholder='请输入内容' focus value={value} onInput={TextChange} />
        <Button className='textButton'  size='mini' plain type='primary' onClick={()=>Send()}>发送</Button>
      </ScrollView>
    </View>
  )
}
export default Barrage
