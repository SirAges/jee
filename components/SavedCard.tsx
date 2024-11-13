import { View, Text, Image } from "react-native";

import { formatAmount, formatText } from "@/lib/utils";

import {  useDispatch } from "react-redux";
import {
  
    removeFromWish,
    updateWish
} from "@/redux/wish/wishSlice";

import {

    removeFromCart,
    updateCart
} from "@/redux/cart/cartSlice";
import Ionicons from "@expo/vector-icons/Ionicons";
const SavedCard = ({ item, saved }) => {
    const dispatch = useDispatch();

    const wishScreen = saved === "wish";
    const cartScreen = saved === "cart";
    const { $id, title, desc, images, price, qty, variant } = item;
    return (
        <>
            <View className="bg-white py-2 px-2 flex-row items-center justify-between">
                <View>
                    <Image
                        className="object-center h-14 w-14 rounded-md"
                        style={{ resizeMode: "cover" }}
                        source={{ uri: images[0] }}
                    />
                </View>
                <View className="flex-1 px-2">
                    <Text className="font-semibold text-xs">
                        {formatText(24, title)}
                    </Text>
                    <Text className="text-xs text-dark-2">
                        {formatText(15, desc)}
                    </Text>
                    <Text className="font-bold text-lg">
                        {formatAmount(price * qty)}
                    </Text>
                </View>
                <View className="px-2 space-y-4 justify-between">
                    <View className="flex-row items-center space-x-3 justify-between">
                        <Text
                            style={{ backgroundColor: variant.color }}
                            className="h-5 w-5 rounded-full border border-dark-2"
                        ></Text>
                        <Text className=" uppercase font-semibold text-sm">
                            {variant.size}
                        </Text>
                    </View>
                    <View>
                        {cartScreen && (
                            <View className="flex-row items-center">
                                <Ionicons
                                    onPress={() =>
                                        dispatch(
                                            wishScreen
                                                ? updateWish({
                                                      $id,
                                                      update: "minus"
                                                  })
                                                : cartScreen
                                                ? updateCart({
                                                      $id,
                                                      update: "minus"
                                                  })
                                                : null
                                        )
                                    }
                                    name={
                                        qty > 1
                                            ? "remove-circle"
                                            : "remove-circle-outline"
                                    }
                                    color="#ba1717"
                                    size={24}
                                />
                                <Text className="text-primary-2 px-3 font-semibold">
                                    {qty}
                                </Text>

                                <Ionicons
                                    onPress={() =>
                                        dispatch(
                                            wishScreen
                                                ? updateWish({
                                                      $id,
                                                      update: "add"
                                                  })
                                                : cartScreen
                                                ? updateCart({
                                                      $id,
                                                      update: "add"
                                                  })
                                                : null
                                        )
                                    }
                                    name={
                                        qty > 1
                                            ? "add-circle"
                                            : "add-circle-outline"
                                    }
                                    color="#4ee17b"
                                    size={24}
                                />
                            </View>
                        )}
                    </View>
                </View>
                <View className="items-center ">
                    <View className="h-10 w-10 rounded-full justify-between items-center bg-destructive-2/10 py-2.5">
                        <Ionicons
                            onPress={() =>
                                dispatch(
                                    wishScreen
                                        ? removeFromWish($id)
                                        : cartScreen
                                        ? removeFromCart($id)
                                        : null
                                )
                            }
                            name={"trash"}
                            color="#ba1717"
                            size={20}
                        />
                    </View>
                </View>
            </View>
            <View className="w-full bg-dark-3 h-[1px]" />
        </>
    );
};

export default SavedCard;
