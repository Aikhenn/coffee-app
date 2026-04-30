import React from "react";
import { Pressable, Text, View } from "react-native";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  textColor?: string;
  textSize?: string;
  icon?: React.ReactNode;
}

const Button = ({ title, onPress, variant = "primary", textColor, icon, textSize }: ButtonProps) => {
  const variants = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    outline: "border border-secondary text-secondary",
    ghost: "",
  };

  return (
    <Pressable
      onPress={() => onPress?.()}
      className={`px-10 py-4 rounded-full flex-row items-center justify-center ${variants[variant]} active:opacity-70 `}
    >
      {icon && <View className="mr-2">{icon}</View>}

      <Text className={`${textColor} font-semibold ${textSize}`}>
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;
