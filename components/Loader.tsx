import React from "react";
import { View, Text, Image } from "react-native";
// tab from
const Loader = ({ text, refetch }) => {
    // tab run next
    return (
        <View className="h-full justify-center items-center bg-white">
            <Image
                className="object-center h-10 w-10 rounded-full"
                style={{ resizeMode: "cover" }}
                source={require("@/assets/icons/Logo.png")}
            />
            <Text className="py-2 px-2  text-xs">{text}</Text>
            {refetch && <Text onPress={()=>refetch() }className="py-2 px-2  text-xs">refetch</Text>}
        </View>
    );
};

export default Loader;
