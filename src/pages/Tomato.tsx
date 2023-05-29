import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Sound from 'react-native-sound';

/**
 * 番茄时钟 Pages
 * @constructor
 */
export function Tomato() {
  const workTime: number = 25 * 60;
  const restTime: number = 5 * 60;

  // 时间
  const [seconds, setSeconds] = useState<number>(workTime);
  // 频次
  const [isWork, setIsWork] = useState<boolean>(true);
  // 是否倒计时
  const [isActive, setIsActive] = useState<boolean>(false);
  const intervalRef = React.useRef<number | null>(null);

  const sound = new Sound('test.mp3', Sound.CACHES, error => {
    if (error) {
      console.log('Failed to load sound:', error);
      return;
    }
    // 加载完成后，可以开始播放音乐
    sound.play();
  });


  useEffect(() => {
    if (isActive && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
        if (seconds <= 1) {
          if (isWork) {
            setSeconds(restTime);
            setIsWork(false);
            setIsActive(true);
          } else {
            setSeconds(workTime);
            setIsWork(true);
            setIsActive(false);
          }
        }
      }, 1000);
    }
    return () => clearInterval(intervalRef.current!);
  }, [isActive, seconds]);

  /**
   * 开始或者暂停
   */
  const handleStartStop = () => {
    if (isWork) {
      setSeconds(workTime);
    } else {
      setSeconds(restTime);
    }
    setIsActive((isActive) => !isActive);
  };

  /**
   * 重新启动
   */
  const handleReset = () => {
    setIsActive(false);
  };

  /**
   * 时间格式
   * @param timeInSeconds
   */
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  /**
   * 频次格式
   * @param isWork
   */
  const formatOrder = (isWork: boolean): string => {
    return isActive ? (isWork ? "工作" : "休息") : "划水";
  };

  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity
        onPress={handleReset}
        style={{ backgroundColor: "red", padding: 10, borderRadius: 5, marginTop: 20, alignItems: "flex-start" }}
      >
        <Text style={{ color: "white", fontSize: 24 }}>Reset</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 99, fontWeight: "bold", marginVertical: 20 }}>
        {formatTime(seconds)}
      </Text>

      <Text style={{ fontSize: 10, fontWeight: "bold", marginVertical: 20 }}>
        {formatOrder(isWork)}
      </Text>

      <TouchableOpacity
        onPress={handleStartStop}
        style={{ backgroundColor: "green", padding: 10, borderRadius: 5 }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>
          {isActive ? "放弃" : "开始"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

