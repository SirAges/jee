import React from "react";
import { View, Text,  } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatAmount } from "@/lib/utils";

const ProfileHero = ({ carts, wishes, orders }) => {
    const totalOrderPrice = orders.reduce(
        (acc, cur) => acc + Number(cur.totalAmount),
        0
    );

    const totalWishPrice = wishes?.reduce(
        (acc, cur) => acc + Number(cur.price),
        0
    );
    const totalCartPrice = carts?.reduce(
        (acc, cur) => acc + Number(cur.price),
        0
    );

    return (
        <View className="w-full py-2 bg-primary-2">
            <SafeAreaView className="px-2 flex-row items-center space-x-2">
                <View className="bg-white rounded-md grow py-2 px-2">
                    <Text className="text-primary-2 text-lg capitalize">
                        orders
                    </Text>
                    <View className="flex-row justify-between">
                        <Text className="text-lg font-semibold text-primary-2">
                            {orders?.length}
                        </Text>
                        <Text className="text-lg font-semibold text-primary-2">
                            {formatAmount(totalOrderPrice)}
                        </Text>
                    </View>
                </View>
                <View className="bg-white rounded-md grow py-2 px-2">
                    <Text className="text-primary-2 text-lg capitalize">
                        carts
                    </Text>
                    <View className="flex-row justify-between">
                        <Text className="text-lg font-semibold text-primary-2">
                            {carts?.length}
                        </Text>
                        <Text className="text-lg font-semibold text-primary-2">
                            {formatAmount(totalCartPrice)}
                        </Text>
                    </View>
                </View>
                <View className="bg-white rounded-md grow py-2 px-2">
                    <Text className="text-primary-2 text-lg capitalize">
                        wishes
                    </Text>

                    <View className="flex-row justify-between">
                        <Text className="text-lg font-semibold text-primary-2">
                            {wishes?.length}
                        </Text>
                        <Text className="text-lg font-semibold text-primary-2">
                            {formatAmount(totalWishPrice)}
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};

export default ProfileHero;
