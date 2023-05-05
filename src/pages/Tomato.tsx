import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export function Tomato() {

  const [seconds, setSeconds] = useState<number>(25 * 60);

  const [isActive, setIsActive] = useState<boolean>(false);
  const intervalRef = React.useRef<number | null>(null);

  useEffect(() => {
    if (isActive && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current!);
  }, [isActive, seconds]);

  /**
   * 开始或者暂停
   */
  const handleStartStop = () => {
    setIsActive((isActive) => !isActive);
  };

  /**
   * 重新启动
   */
  const handleReset = () => {
    setSeconds(25 * 60);
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

  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity
        onPress={handleReset}
        style={{ backgroundColor: "red", padding: 10, borderRadius: 5, marginTop: 20, alignItems: "flex-start" }}
      >
        <Text style={{ color: "white", fontSize: 24 }}>Reset</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 50, fontWeight: "bold", marginVertical: 20 }}>
        {formatTime(seconds)}
      </Text>
      <TouchableOpacity
        onPress={handleStartStop}
        style={{ backgroundColor: "green", padding: 10, borderRadius: 5 }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>
          {isActive ? "Stop" : "Start"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

