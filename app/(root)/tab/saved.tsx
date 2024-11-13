import Checkout from "@/components/Checkout";
import Loader from "@/components/Loader";
import SavedCard from "@/components/SavedCard";
import { useState } from "react";
import Coupons from "@/components/Coupons";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentWish, removeFromWish } from "@/redux/wish/wishSlice";

import { selectCurrentCart, removeFromCart } from "@/redux/cart/cartSlice";
import { View, Text, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { selectCurrentSession } from "@/redux/auth/authSlice";
import { useGetCurrentQuery } from "@/redux/auth/authApiSlice";
import { formatAmount } from "@/lib/utils";
import { coupons } from "@/lib/data";
const Saved = () => {
    const { saved } = useLocalSearchParams();
    const { data: u } = useGetCurrentQuery();
    const session = useSelector(selectCurrentSession);
    const dispatch = useDispatch();
    const wishes = useSelector(selectCurrentWish);
    const carts = useSelector(selectCurrentCart);
    const wishScreen = saved === "wish";
    const cartScreen = saved === "cart";
    const resolvedArray = wishScreen ? wishes : cartScreen ? carts : [];
    const subTotal = resolvedArray?.reduce(
        (acc, cur) => acc + parseFloat(cur.price) * cur.qty,
        0
    );

    const [opt, setOpt] = useState(false);

    const [coupon, setCoupon] = useState("");
    const couponAvailable = coupons.find(
        f => f.coupon.toLowerCase().split("-")[0] === coupon.toLowerCase()
    );

    const couponPerc = couponAvailable?.coupon?.split("-")[1];
    const couponText = couponAvailable?.coupon?.split("-")[0];
    if (!resolvedArray?.length) {
        return <Loader text={`Your ${saved} is empty`} />;
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-row items-center justify-between py-2 px-2">
                <Ionicons
                    onPress={() => router.back()}
                    name="arrow-back"
                    size={24}
                    color=""
                />

                <Text className="font-semibold text-lg capitalize">
                    My {saved}
                </Text>
                <Ionicons
                    onPress={() => setOpt(prev => !prev)}
                    name="ellipsis-vertical"
                    size={24}
                    color=""
                />
            </View>
            {opt && (
                <View className="absolute top-20 z-50 right-4 px-4 py-4 rounded-md  bg-background-1 shadow">
                    <Text
                        onPress={() =>
                            dispatch(
                                wishScreen
                                    ? removeFromWish
                                    : cartScreen
                                    ? removeFromCart
                                    : null
                            )
                        }
                        className="font-semibold"
                    >
                        Clear {saved}
                    </Text>
                </View>
            )}
            <View className="w-full bg-dark-3 h-[1px]" />
            {cartScreen && (
                <>
                    <View
                        className="flex-row items-center justify-between px-2 space-x-2 py-3
            "
                    >
                        <View className="items-center justify-center rounded-full h-7 w-7 bg-card-2 p-1">
                            <Text className="font-black uppercase text-primary-2">
                                {u?.name?.slice(0, 1)}
                            </Text>
                        </View>
                        <Text className="flex-1 text-dark-1 font-semibold text-xs">
                            Deliver to {u?.name}
                        </Text>
                        <Text className="text-primary-1 capitalize font-semibold">
                            {session?.countryName}
                        </Text>
                    </View>
                    <View className="w-full bg-dark-3 h-[1px]" />
                </>
            )}

            <FlatList
                className=""
                data={cartScreen ? carts : wishScreen ? wishes : null}
                renderItem={({ item: s }) => (
                    <SavedCard key={s.id} saved={saved} item={s} />
                )}
                keyExtractor={s => s.$id}
            />

            <View className="">
                <Coupons
                    couponAvailable={couponAvailable}
                    coupon={coupon}
                    setCoupon={setCoupon}
                />
                <View className=" space-y-5 pb-5 ">
                    <View className="w-full bg-dark-3 h-[1px]" />
                    <View className="px-8 flex-row items-center justify-between">
                        <Text className="capitalize font-medium text-dark-1">
                            subtotal:
                        </Text>
                        <Text className="font-extrabold ">
                            {formatAmount(subTotal)}
                        </Text>
                    </View>
                    <View className="px-8 flex-row items-center justify-between">
                        <Text className="capitalize font-medium text-dark-1">
                            delivery fee:
                        </Text>
                        <Text className="font-extrabold ">
                            {formatAmount("5")}
                        </Text>
                    </View>
                    {couponAvailable && (
                        <View className="px-8 flex-row items-center justify-between">
                            <Text className="capitalize font-medium text-dark-1">
                                discount:
                            </Text>
                            <Text className="font-extrabold ">
                                {couponPerc}%
                            </Text>
                        </View>
                    )}
                </View>
            </View>

            <View className="w-full bg-dark-3 h-[1px]" />
            <View className="px-8 flex-row items-center justify-between py-5">
                <Text className="capitalize font-medium text-dark-1">
                    total
                </Text>
                <Text className="font-extrabold ">
                    {formatAmount(
                        couponAvailable
                            ? (subTotal * couponPerc) / 100
                            : subTotal
                    )}
                </Text>
            </View>
            <View className="w-full bg-dark-3 h-[1px]" />
            <View className="px-2 py-2">
                <Checkout
                    products={resolvedArray.map(
                        ({ id, qty, price, title, images, variant }) =>
                            `${id}=${qty}=${price}=${title}=${images[0]}=${variant.size}=${variant.color}`
                    )}
                    amount={
                        couponAvailable
                            ? (subTotal * couponPerc) / 100
                            : subTotal
                    }
                />
            </View>
        </SafeAreaView>
    );
};

export default Saved;
