import React from "react";
import { Pressable, Text, View } from "react-native";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "outline";
  icon?: React.ReactNode;
}

const Button = ({ title, onPress, variant = "primary", icon }: ButtonProps) => {
  const variants = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    outline: "border border-secondary text-secondary",
  };

  return (
    <Pressable
      onPress={() => onPress?.()}
      className={`m-2 px-4 py-3 rounded-2xl flex-row items-center justify-center ${variants[variant]} active:opacity-70 `}
    >
      {icon && <View className="mr-2">{icon}</View>}

      <Text className="text-white font-semibold">{title}</Text>
    </Pressable>
  );
};

export default Button;
