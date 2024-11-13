import ProdCard from "./ProdCard";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getRating } from "@/lib/utils";
import { useGetReviewsQuery } from "@/redux/review/reviewApiSlice";
const BestSelling = ({ products }) => {
    const [allProducts, setAllProducts] = useState([]);
    const { data: reviews } = useGetReviewsQuery();

    useEffect(() => {
        const getBest = () => {
            const filtered = products.filter(({ $id }) => {
                const reviewArr = reviews.documents;
                const productReview = reviewArr.filter(
                    ({ productId }) => productId === $id
                );
            
                return getRating(productReview) > 3;
            });

            if (filtered?.length) {
                setAllProducts(filtered);
            }
        };
        if (reviews && reviews !== undefined) {
            getBest();
        }
        return () => [];
    }, [products, reviews]);

    return allProducts?.length ? (
        <View className="w-full px-2 py-1">
            <View className="flex-row items-center justify-between">
                <Text className="font-medium  text-lg capitalize">
                    Best selling products
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

            <View className="w-full flex-row flex-wrap items-center">
                {allProducts.slice(0, 10).map(item => (
                    <ProdCard key={item.$id} item={item} width="w-1/2" />
                ))}
            </View>
        </View>
    ) : null;
};

export default BestSelling;
