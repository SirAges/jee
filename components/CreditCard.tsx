import React from "react";
import { View, Text, Image } from "react-native";
// tab from
const CreditCard = ({ u }) => {
    // tab run next
    return (
        <View className="relative bg-primary-1 h-56 w-full justify-center items-center rounded-md">
            <Image
                className="h-full w-full rounded-md opacity-60"
                style={{ resizeMode: "cover" }}
                source={require("@/assets/icons/lines.png")}
            />
            <Text className="absolute font-semibold capitalize top-4 right-4 capitalize text-primary-2">
                Filto bank
            </Text>
            <Text className="absolute text-3xl px-4 font-extrabold text-primary-2 tracking-widest uppercase">
                **** **** **** 4533
            </Text>
            <View className="absolute space-x-4 items-center flex-row bottom-4 left-4">
                <Text className=" font-semibold capitalize">
                    {u.lastName} {u.firstName}
                </Text>
                <Text className=" font-extrabold tracking-widest capitalize">
                    04/28
                </Text>
            </View>
            <Text className="absolute right-4 bottom-4 font-extrabold text-blue-600 tracking-widest uppercase">
                Visa
            </Text>
        </View>
    );
};

export default CreditCard;
