import ProdCard from "./ProdCard";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableWithoutFeedback } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
const NewArrivals = ({ products }) => {
    const [allProducts, setAllProducts] = useState([]);
    useEffect(() => {
        const getBest = () => {
            const filtered = products.filter(({ $createdAt }) => {
                const date = new Date();
                const createdAt = new Date($createdAt);
                const diffmill = date - createdAt;
                const days = diffmill / (1000 * 60 * 60 * 24);
                return days < 10;
            });

            if (filtered?.length) {
                setAllProducts(filtered);
            }
        };
        getBest();
        return () => [];
    }, [products]);

    return allProducts?.length ? (
        <View className="w-full px-2 py-1">
            <View className="flex-row items-center justify-between">
                <Text className="font-medium  text-lg capitalize">
                    New Arrivals
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

export default NewArrivals;
