import ProdCard from "./ProdCard";
import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableWithoutFeedback } from "react-native";
import { selectRecent, removeFromRecent } from "@/redux/product/productSlice";
import { useSelector, useDispatch } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
const RecentView = ({ products }) => {
    const [allProducts, setAllProducts] = useState([]);
    const recents = useSelector(selectRecent);
    const dispatch = useDispatch();
    useEffect(() => {
        const getBest = () => {
            const now = new Date();

            const filtered = recents
                .map(({ date, productId }) => {
                    const prod = products.find(({ $id }) => productId === $id);

                    if (prod) {
                        const createdAt = new Date(date);
                        const diffDays =
                            (now - createdAt) / (1000 * 60 * 60 * 24);
                        const valid = diffDays <3;
                        if (!valid) {
                            dispatch(removeFromRecent(productId));
                        }
                        return valid ? prod : null;
                    }

                    return null;
                })
                .filter(Boolean);

            setAllProducts(filtered.length ? filtered : []);
        };

        getBest();
    }, [recents, products,dispatch]);
    return allProducts?.length ? (
        <View className="w-full px-2 py-1">
            <View className="flex-row items-center justify-between">
                <Text className="font-medium  text-lg capitalize">
                    Recently viewed
                </Text>
                <TouchableWithoutFeedback
                    onPress={() => router.push("tab/shop")}
                >
                    <View className="flex-row items-center space-x-2">
                        <Text className="font-medium text-primary-1  text-xs">
                            show more
                        </Text>
                        <Text className="font-medium text-primary-1  text-xs">
                            <Ionicons name="arrow-forward" color="#4ee17b" />
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <ScrollView horizontal>
                <View className="w-full flex-row items-center">
                    {allProducts.slice(0, 10).map(item => (
                        <ProdCard key={item.$id} item={item} width="w-44" />
                    ))}
                </View>
            </ScrollView>
        </View>
    ) : null;
};

export default RecentView;
