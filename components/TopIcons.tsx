import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { topIcons } from "@/lib/data";
import { useSelector } from "react-redux";
import { selectCurrentWish } from "@/redux/wish/wishSlice";
import { selectCurrentCart } from "@/redux/cart/cartSlice";
const TopIcons = ({ classes }) => {
    const wishBadge = useSelector(selectCurrentWish);
    const cartBadge = useSelector(selectCurrentCart);
    return (
        <View className={` ${classes}`}>
            {topIcons.map(({ id, icon, action, badge }) => (
                <TouchableWithoutFeedback key={id} onPress={action}>
                    <View className="relative mx-2 my-2">
                        {badge ? (
                            <View className="bg-card-1 z-10 rounded-full h-4 w-4 absolute justify-center items-center">
                                <Text className="text-xs">
                                    {badge === "wish"
                                        ? wishBadge?.length
                                        : badge === "cart"
                                        ? cartBadge?.length
                                        : null}
                                </Text>
                            </View>
                        ) : null}
                        <Ionicons name={icon} color="#4ee17b" size={24} />
                    </View>
                </TouchableWithoutFeedback>
            ))}
        </View>
    );
};

export default TopIcons;
