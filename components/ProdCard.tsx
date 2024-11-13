import ActionIcon from "./ActionIcon";
import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

import { getRating, formatAmount, formatText } from "@/lib/utils";
import { useSelector, useDispatch } from "react-redux";
import {
    selectCurrentWish,
    addToWish,
    removeFromWish
} from "@/redux/wish/wishSlice";
import { useGetProductReviewQuery } from "@/redux/review/reviewApiSlice";
const ProdCard = ({ item, width }) => {
    const { $id, title, desc, images, category, price, colors, sizes } = item;
    const { data } = useGetProductReviewQuery($id);
    const [reviews, setReviews] = useState([]);
    const totalReviews = reviews?.length || 0;
    const avgReview = getRating(reviews);
    const dispatch = useDispatch();
    const wishes = useSelector(selectCurrentWish);

    const wished = wishes?.some(s => s.$id === $id);
    const router = useRouter();

    const toggleWish = () => {
        if (wished) {
            dispatch(removeFromWish($id));
        } else {
            dispatch(
                addToWish({
                    $id,
                    title,
                    images,
                    desc,
                    price,
                    qty: 1,
                    variant: {
                        size: sizes.split(",")[0],
                        color: colors.split(",")[0]
                    }
                })
            );
        }
    };

    useEffect(() => {
        if (data && data !== undefined) {
            const res = [...data.documents]
                .sort((a, b) => {
                    const dateA = new Date(a.$createdAt);
                    const dateB = new Date(b.$createdAt);
                    return dateB - dateA;
                })
                .filter(f => f.productId === $id);

            setReviews(res);
        }
        return () => [];
    }, [data,$id]);

    return (item&&
        <TouchableWithoutFeedback
            key={$id}
            onPress={() => router.push(`/tab/${$id}`)}
        >
            <View className={` ${width} p-1`}>
                <View className="bg-white p-1 rounded-md relative">
                    <ActionIcon
                        classes="absolute top-4 z-50 right-4 "
                        icon="heart"
                        action={toggleWish}
                        cond={wished}
                    />

                    <Image
                        className="w-full h-44"
                        style={{ resizeMode: "cover" }}
                        source={{ uri: images[0] }}
                    />
                    <View>
                        <Text className="text-dark-2 capitalize font-medium">
                            {category}
                        </Text>
                        <Text className="text-dark-1 capitalize font-medium text-sm">
                            {formatText(40, title)}
                        </Text>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-dark-2 text-xs capitalize font-medium">
                                <Ionicons
                                    name="star"
                                    size={10}
                                    color="#4ee17b"
                                />
                                {`${avgReview} | ${totalReviews}`}
                            </Text>
                            <Text className="text-lg text-primary-1 font-bold">
                                {formatAmount(price)}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};
export default ProdCard;
