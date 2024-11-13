import React from "react";
import { View, Text, TextInput } from "react-native";
// tab from
const Coupons = ({ couponAvailable, coupon, setCoupon }) => {
    // tab run next
    return (
        <View className="py-3 px-3">
            <Text className="text-dark-1 py-2">
                Have a coupon code? enter it here 👇
            </Text>
            <View className=" border-border/20 border-[1px] py-2 px-2 rounded-md bg-card-2 flex-row space-x-2 items-center">
                <TextInput
                    className="text-primary-2 font-semibold capitalize tracking-wider flex-1"
                    value={coupon}
                    onChangeText={text => setCoupon(text.trim())}
                    placeholder={"i have a coupon"}
                    placeholderTextColor="#e9f5ee93"
                    returnKeyType="coupon"
                    maxLength={100}
                    autoCapitalize="uppercase"
                    autoCorrect={false}
                    autoFocus={false}
                    clearButtonMode="while-editing"
                    contextMenuHidden={false}
                    dataDetectorTypes="all"
                    editable={true}
                    enablesReturnKeyAutomatically={true}
                    textAlign="left"
                    textAlignVertical={"center"}
                    selectionColor="#4ee17b"
                />
                {couponAvailable && (
                    <Text className="text-xs text-primary-1">
                        available &#x2713;
                    </Text>
                )}
            </View>
        </View>
    );
};

export default Coupons;
