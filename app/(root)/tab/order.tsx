import Loader from "@/components/Loader";
import { useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    Alert,
    TouchableWithoutFeedback
} from "react-native";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatAmount, formatDateTime } from "@/lib/utils";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useSelector } from "react-redux";
import { selectCurrentSession } from "@/redux/auth/authSlice";
import { useGetOrdersQuery } from "@/redux/order/orderApiSlice";
const Order = () => {
    const session = useSelector(selectCurrentSession);
    const userId = session?.userId;

    const [openDate, setOpenDate] = useState(false);
    const { data: orders, isFetching } = useGetOrdersQuery();

    const [filter, setFilter] = useState(false);
    const [allOrders, setAllOrders] = useState([]);
    const [clk, setClk] = useState(false);
    const [status, setStatus] = useState("");
    const [value, setValue] = useState({ start: "", end: "" });

    const start = value.start;
    const end = value.end;
    const onClickDate = clicked => {
        setClk(clicked);
        setOpenDate(true);
    };

    const onChange = date => {
        if (clk === "end" && date < start) {
            setOpenDate(false);
            Alert.alert("Error", "your end date is before start date");
            return;
        }

        setValue(prev => ({ ...prev, [clk]: date }));
        setOpenDate(false);
    };
    useEffect(() => {
        const setAllFilters = () => {
            if (orders && orders !== undefined) {
                const { documents } = orders;
                const myOrders = documents.filter(f => f.userId === userId);

                const filtered = myOrders.filter(f => {
                    const createdAt = new Date(f.$createdAt);
                    const vStart = new Date(start);
                    const vEnd = new Date(end);
                    const res =
                        (createdAt > vStart && createdAt < vEnd) ||
                        f.status === status;

                    return res;
                });

                if (filtered?.length) {
                    setAllOrders(filtered);
                }
            }
        };
        setAllFilters();
        return () => false;
    }, [status, value,end,orders,start,userId]);
    useEffect(() => {
        const setAllFilters = () => {
            if (orders && orders !== undefined) {
                const { documents } = orders;
                const myOrders = documents.filter(f => f.userId === userId);

                setAllOrders(myOrders);
            }
        };
        setAllFilters();
        return () => false;
    }, [orders,userId]);

    if (!allOrders?.length) {
        return <Loader text="your order is empty" />;
    }
    if (isFetching) {
        return <Loader text="please wait... fetching orders" />;
    }
    if (orders === undefined) {
        return (
            <Loader
                refetch={refetch}
                text="unable to fetch products check your internet connection"
            />
        );
    }
    return (
        <SafeAreaView className="flex-1 bg-white">
            {filter && (
                <View className="absolute  h-full w-full z-10">
                    <TouchableWithoutFeedback onPress={() => setFilter(false)}>
                        <View className="flex-1 relative">
                            <View
                                onStartShouldSetResponder={() => true} // Enable responder
                                onResponderRelease={e => e.stopPropagation()}
                                onTouchStart={e => e.stopPropagation()}
                                className="absolute right-4 top-10 bg-white rounded-md shadow shadow-lg shadow-black/30 w-52"
                            >
                                <Text
                                    style={{ backgroundColor: "#ffc41035" }}
                                    className="uppercase font-semibold text-md py-3 px-4"
                                    onPress={() => {
                                        setStatus("pending");
                                        setFilter(false);
                                    }}
                                >
                                    pending
                                </Text>
                                <Text
                                    onPress={() => {
                                        setStatus("ongoing");
                                        setFilter(false);
                                    }}
                                    style={{ backgroundColor: "#10a3ff35" }}
                                    className="uppercase font-semibold text-md py-3 px-4"
                                >
                                    ongoing
                                </Text>
                                <Text
                                    onPress={() => {
                                        setStatus("fulfilled");
                                        setFilter(false);
                                    }}
                                    style={{ backgroundColor: "#10ff1d35" }}
                                    className="uppercase font-semibold text-md py-3 px-4"
                                >
                                    fulfilled
                                </Text>
                                <Text
                                    onPress={() => {
                                        setStatus("");
                                        setValue({ start: "", end: "" });
                                        setFilter(false);
                                    }}
                                    style={{ backgroundColor: "#ff2d1035" }}
                                    className="uppercase font-semibold text-md py-3 px-4"
                                >
                                    clear filter
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )}
            <DateTimePickerModal
                isVisible={openDate}
                mode={"date"}
                onChange={onChange}
                onConfirm={onChange}
                onCancel={() => setOpenDate(false)}
            />
            <View className="flex-row items-center justify-between py-2 px-4">
                <Ionicons
                    onPress={() => router.back()}
                    name="arrow-back"
                    size={24}
                    color=""
                />

                <Text className="font-semibold text-lg capitalize">
                    My orders
                </Text>
                <Ionicons
                    onPress={() => setFilter(prev => !prev)}
                    name="filter"
                    size={24}
                    color=""
                />
            </View>

            <View className="flex-row items-center justify-center">
                <Text className="text-center flex-1 text-dark-2">from</Text>
                <Text className="text-center flex-1 text-dark-2">to</Text>
            </View>
            <View className="flex-row items-center py-2 justify-center">
                <Text
                    onPress={() => onClickDate("start")}
                    className="text-center flex-1 text-dark-1 font-semibold capitalize"
                >
                    {start ? formatDateTime(start).dateOnly : "from when"}
                </Text>
                <Text
                    onPress={() => onClickDate("end")}
                    className="text-center flex-1 text-dark-1 font-semibold capitalize"
                >
                    {end ? formatDateTime(end).dateOnly : "to when"}
                </Text>
            </View>
            <View className="bg-dark-3 h-[1px]" />
            <View className="flex-1 py-2 px-2">
                <View className="flex-row items-center justify-between px-2">
                    <Text className=" text-start flex-1 text-dark-2">
                        total
                    </Text>
                    <Text className="flex-1 text-start flex-1 text-dark-2">
                        date
                    </Text>
                    <Text className=" text-end text-dark-2">satus</Text>
                </View>
                {allOrders ? (
                    <FlatList
                        className=""
                        data={allOrders}
                        renderItem={({ item: o }) => (
                            <View
                                style={{
                                    backgroundColor:
                                        o.status === "pending"
                                            ? "#ffc41035"
                                            : o.status === "ongoing"
                                            ? "#10a3ff35"
                                            : o.status === "fulfilled"
                                            ? "#10ff1d35"
                                            : null
                                }}
                                className="flex-row items-center justify-between px-2 py-3 rounded-md mt-1 "
                            >
                                <Text className="font-extrabold text-lg flex-1">
                                    {formatAmount(o.totalAmount)}
                                </Text>
                                <Text className="flex-1  text-start capitalize font-semibold">
                                    {formatDateTime(o.$createdAt).dateOnly}
                                </Text>
                                <Text className="font-medium bg-white/30 p-0.5 rounded-sm tracking-wide">
                                    {o.status}
                                </Text>
                            </View>
                        )}
                        keyExtractor={s => s.id}
                    />
                ) : (
                    <Loader text="Your order is empty" />
                )}
            </View>
        </SafeAreaView>
    );
};

export default Order;
