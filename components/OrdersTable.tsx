import { useState, useEffect } from "react";
import { useUpdateOrderMutation } from "@/redux/order/orderApiSlice";
import {
    View,
    Text,
    ScrollView,
    Modal,
    TouchableWithoutFeedback
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { formatAmount, formatDateTime } from "@/lib/utils";
const OrdersTable = ({ days, data, isFetching, refetch }) => {
    const [orders, setOrders] = useState([]);
    const [modal, setModal] = useState(false);
    const [idx, setIdx] = useState(null);
    const [updateOrder] = useUpdateOrderMutation();

    useEffect(() => {
        if (data && data !== undefined) {
            const filtered = data.documents.filter(({ $createdAt }) => {
                const date = new Date();
                const orderDate = new Date($createdAt);
                const diffMill = date - orderDate;
                const trimDay = days.split(" ");

                const res =
                    trimDay[1] === "days"
                        ? diffMill / (1000 * 60 * 60 * 24) <= Number(trimDay[0])
                        : diffMill / (1000 * 60 * 60 * 24 * 30) <=
                          Number(trimDay[0]);

                return res;
            });

            setOrders(filtered);
        }
        return () => [];
    }, [days, data]);
    const update = async (field, value) => {
        console.log(field, value);
        const vals = {
            orderId: idx,
            value: {
                data: { [field]: value }
            }
        };
        await updateOrder(vals);
        setModal(false);
    };
    return (
        <View className="flex-1">
            <Text onPress={refetch} className=" py-2 font-semibold capitalize ">
                {isFetching ? "fetching" : "reload table"}
            </Text>
            <ScrollView className="flex-1" horizontal>
                <View className="space-y-2 bg-white ">
                    <View className="flex-row items-center px-2 space-x-2 border-b-2 border-dark-3 ">
                        <Text className="w-7"></Text>
                        <Text className="w-24">order date</Text>
                        <Text className="w-44">order Id</Text>
                        <Text className="w-24">order total</Text>
                        <Text className="w-44">order products</Text>
                        <Text className="w-24">order status</Text>
                    </View>
                    <ScrollView nestedScrollEnabled>
                        {orders.map(
                            ({
                                $createdAt,
                                $id,
                                totalAmount,
                                products,
                                status
                            }) => (
                                <View className="flex-row items-start py-2 px-2 space-x-2 border-b border-dark-3">
                                    <View
                                        style={{ backgroundColor: "#1eec2735" }}
                                        className="px-2 py-2 items-center justify-center h-fit"
                                    >
                                        <Ionicons
                                            onPress={() => {
                                                setIdx($id);
                                                setModal(true);
                                            }}
                                            name="menu"
                                            size={16}
                                        />
                                    </View>
                                    <Text className="w-24">
                                        {formatDateTime($createdAt).dateOnly}
                                    </Text>
                                    <Text className="w-44">{$id}</Text>
                                    <Text className="font-semibold w-24">
                                        {formatAmount(totalAmount)}
                                    </Text>
                                    <View className=" space-x-2 w-44 px-2 max-h-44">
                                        <ScrollView nestedScrollEnabled>
                                            {products.map(p => {
                                                const arr = p.split("=");
                                                const productId = arr[0];
                                                const qty = arr[1];
                                                const price = arr[2];
                                                const title = arr[3];
                                                // const image = arr[4];
                                                const size = arr[5];
                                                const color = arr[6];
                                                return (
                                                    <View
                                                        className="space-y-2"
                                                        key={productId}
                                                    >
                                                        <Text className="tracking-wider font-light">
                                                            {productId}
                                                        </Text>
                                                        <View className="flex-row items-center justify-between space-x-2">
                                                            <Text className="font-semibold">
                                                                {title}
                                                            </Text>
                                                            <Text>
                                                                {formatAmount(
                                                                    price
                                                                )}
                                                            </Text>
                                                        </View>
                                                        <Text>
                                                            quantity: {qty}
                                                        </Text>
                                                        <View className="flex-row space-x-2">
                                                            <Text className="">
                                                                size:
                                                            </Text>
                                                            <Text className="uppercase font-semibold">
                                                                {size}
                                                            </Text>
                                                        </View>
                                                        <View className="flex-row space-x-2">
                                                            <Text className="">
                                                                color:
                                                            </Text>
                                                            <Text
                                                                style={{
                                                                    backgroundColor:
                                                                        color
                                                                }}
                                                                className="rounded-full border-2 border-dark-3 font-semibold h-5 w-5"
                                                            ></Text>
                                                        </View>
                                                        <View className="flex-row space-x-2">
                                                            <Text className="">
                                                                total:
                                                            </Text>
                                                            <Text className="font-semibold">
                                                                {formatAmount(
                                                                    qty * price
                                                                )}
                                                            </Text>
                                                        </View>
                                                        <View className="h-[1px] w-full bg-dark-3 my-2" />
                                                    </View>
                                                );
                                            })}
                                        </ScrollView>
                                    </View>
                                    <Text
                                        className={`uppercase font-semibold w-24 h-5 text-center rounded-sm ${
                                            status === "pending"
                                                ? "bg-amber-400"
                                                : status === "ongoing"
                                                ? "bg-blue-400"
                                                : status === "fulfilled"
                                                ? "bg-green-400"
                                                : null
                                        }`}
                                    >
                                        {status}
                                    </Text>
                                </View>
                            )
                        )}
                    </ScrollView>
                </View>
                <Modal
                    animationType="slide"
                    onRequestClose={() => setModal(false)}
                    transparent
                    visible={modal}
                >
                    <View className=" bg-black/50 h-full w-full">
                        <TouchableWithoutFeedback
                            onPress={() => setModal(false)}
                        >
                            <View className="justify-end flex-1">
                                <View
                                    onStartShouldSetResponder={() => true} // Enable responder
                                    onResponderRelease={e =>
                                        e.stopPropagation()
                                    }
                                    onTouchStart={e => e.stopPropagation()}
                                    className="bg-white rounded-t-md h-56"
                                >
                                    <Text className="font-semibold  text-md py-4 px-2 bg-dark-3 text-center rounded-t-md">
                                        Order Options
                                    </Text>
                                    <View
                                        className=" flex-row space-x-2 items-center
                                py-2 px-2"
                                    >
                                        {[
                                            "pending",
                                            "ongoing",
                                            "fulfilled"
                                        ].map(o => (
                                            <Text
                                                onPress={() =>
                                                    update("status", o)
                                                }
                                                className={`font-semibold  text-md py-2 px-2 flex-1 rounded-md  ${
                                                    o === "pending"
                                                        ? "bg-amber-400"
                                                        : o === "ongoing"
                                                        ? "bg-blue-400"
                                                        : o === "fulfilled"
                                                        ? "bg-green-400"
                                                        : null
                                                }`}
                                            >
                                                Set to {o}
                                            </Text>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>
            </ScrollView>
        </View>
    );
};

export default OrdersTable;
