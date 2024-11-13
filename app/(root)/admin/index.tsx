import Loader from "@/components/Loader";
import UsersTable from "@/components/UsersTable";
import ReviewsTable from "@/components/ReviewsTable";
import ProductsTable from "@/components/ProductsTable";
import OrdersTable from "@/components/OrdersTable";
import AdminCard from "@/components/AdminCard";
import SelectDropdown from "react-native-select-dropdown";
import { router } from "expo-router";

import { useState } from "react";
import { View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetCurrentQuery } from "@/redux/auth/authApiSlice";
import { useGetProductsQuery } from "@/redux/product/productApiSlice";
import { useGetReviewsQuery } from "@/redux/review/reviewApiSlice";
import { useGetOrdersQuery } from "@/redux/order/orderApiSlice";
import { useGetUsersQuery } from "@/redux/user/userApiSlice";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useDispatch, useSelector } from "react-redux";
import { setAdmin, selectCurrentAdmin } from "@/redux/auth/authSlice";
const Index = () => {
    const { data: user } = useGetCurrentQuery();
    const admin = useSelector(selectCurrentAdmin);
    const dispatch = useDispatch();
    const {
        data: products,
        refetch: pRefetch,
        isFetching: pFetching
    } = useGetProductsQuery();
    const {
        data: orders,
        refetch: oRefetch,
        isFetching: oFetching
    } = useGetOrdersQuery();
    const {
        data: reviews,
        refetch: rRefetch,
        isFetching: rFetching
    } = useGetReviewsQuery();
    const {
        data: users,
        refetch: uRefetch,
        isFetching: uFetching
    } = useGetUsersQuery();

    const [selected, setSelected] = useState("order");
    const [days, setDays] = useState("3 days");
    const options = [
        "3 days",
        "7 days",
        "1 month",
        "3 months",
        "6 months",
        "1 year"
    ];

    if (oFetching || rFetching || pFetching || uFetching) {
        return <Loader text="please wait... initializing dashboard" />;
    }
    if (
        (!orders ||
            !orders ||
            !users ||
            !reviews ||
            !products ||
            user ||
            user === undefined ||
            reviews === undefined ||
            orders === undefined ||
            products === undefined ||
            users === undefined) &&
        (oFetching || rFetching || pFetching || uFetching)
    ) {
        return (
            <Loader
                refetch={null}
                text="unable to fetch products check your internet connection"
            />
        );
    }

    const oTotal = orders?.total;
    const rTotal = reviews?.total;
    const pTotal = products?.total;
    const uTotal = users?.total;
    const oPrev =
        oTotal > 1
            ? orders?.documents[oTotal - 2]?.totalAmount
            : products?.documents[0].totalAmount;
    const rPrev =
        rTotal > 1
            ? reviews?.documents[rTotal - 2]?.rate
            : reviews?.documents[0].rate;
    const pPrev =
        pTotal > 1
            ? products?.documents[pTotal - 2]?.price
            : products?.documents[0].price;
    const oCurr =
        oTotal > 1
            ? orders?.documents[oTotal - 1]?.totalAmount
            : products?.documents[0].totalAmount;
    const rCurr =
        rTotal > 1
            ? reviews?.documents[rTotal - 1]?.rate
            : reviews?.documents[0].rate;
    const pCurr =
        pTotal > 1
            ? products?.documents[pTotal - 1]?.price
            : products?.documents[0].price;
    const logoutAdmin = () => {
        Alert.alert(
            "Hold on!",
            "Are you sure you want to leave the admin dashboard?",
            [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                {
                    text: "YES",
                    onPress: () => {
                        dispatch(setAdmin());
                    
                          //  router.replace("tab");
                        
                    }
                }
            ]
        );
    };
    return (
        <View className="bg-white flex-1">
            <SafeAreaView className="">
                <View className="px-4 flex-row items-center justify-between">
                    <View>
                        <Text className="font-semibold capitalize text-dark-2">
                            Welcome
                        </Text>
                        <Text className="text-xl font-semibold capitalize">
                            {user?.name}
                        </Text>
                    </View>
                    <Ionicons onPress={logoutAdmin} name="power" size={24} />
                </View>
                <View className="px-2 py-2 bg-white shadow shadow-md shadow-black/40 rounded-sm my-2 mx-2 w-3/5">
                    <View>
                        <SelectDropdown
                            dropdownStyle={{
                                backgroundColor: "#185132",
                                borderRadius: 5
                            }}
                            statusBarTranslucent
                            data={options}
                            onSelect={setDays}
                            renderButton={(selectedItem, isOpened) => {
                                return (
                                    <View className="w-full">
                                        <Text className="font-semibold ">
                                            {selected}s from {days} ago
                                        </Text>
                                    </View>
                                );
                            }}
                            renderItem={(item, index, isSelected) => {
                                return (
                                    <View
                                        style={{
                                            backgroundColor: isSelected
                                                ? "#052f1841"
                                                : ""
                                        }}
                                    >
                                        <Text className="py-4 px-2 text-white bg-transparent capitalize">
                                            {item}
                                        </Text>
                                    </View>
                                );
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
                <View className="flex flex-row flex-wrap px-2">
                    <View className="w-1/2 h-24  bg-white p-1 ">
                        <AdminCard
                            color="#1eec2735"
                            total={oTotal}
                            current={oCurr}
                            previous={oPrev}
                            setSelected={setSelected}
                            selected={selected}
                            name="order"
                            icon="sack-dollar"
                        />
                    </View>
                    <View className="w-1/2 h-24  bg-white p-1">
                        <AdminCard
                            color="#ecd61e35"
                            total={pTotal}
                            current={pCurr}
                            previous={pPrev}
                            setSelected={setSelected}
                            selected={selected}
                            name="product"
                            icon="shop"
                        />
                    </View>
                    <View className="w-1/2 h-24  bg-white p-1">
                        <AdminCard
                            color="#1e34ec35"
                            total={rTotal}
                            current={rCurr}
                            previous={rPrev}
                            setSelected={setSelected}
                            selected={selected}
                            name="review"
                            icon="star-half-alt"
                        />
                    </View>
                    <View className="w-1/2 h-24  bg-white p-1">
                        <AdminCard
                            color="#ec1e4035"
                            total={uTotal}
                            current={100}
                            setSelected={setSelected}
                            selected={selected}
                            previous={3}
                            name="user"
                            icon="people-group"
                        />
                    </View>
                </View>
            </SafeAreaView>

            <View className="px-2 flex-1">
                {selected === "order" && (
                    <OrdersTable
                        days={days}
                        data={orders}
                        isFetching={oFetching}
                        refetch={oRefetch}
                    />
                )}
                {selected === "product" && (
                    <ProductsTable
                        days={days}
                        data={products}
                        isFetching={pFetching}
                        refetch={pRefetch}
                    />
                )}

                {selected === "user" && (
                    <UsersTable
                        days={days}
                        data={users}
                        isFetching={uFetching}
                        refetch={uRefetch}
                    />
                )}
                {selected === "review" && (
                    <ReviewsTable
                        days={days}
                        data={reviews}
                        isFetching={rFetching}
                        refetch={rRefetch}
                    />
                )}
            </View>
        </View>
    );
};

export default Index;
