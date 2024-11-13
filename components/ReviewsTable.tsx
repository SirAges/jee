import Reviews from "./Reviews";
import { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text } from "react-native";

const ReviewsTable = ({ days, refetch, isFetching, data }) => {
    const [reviews, setReviews] = useState([]);
    const [opt, setOpt] = useState(false);
    useEffect(() => {
        if (data && data !== undefined) {
            const filtered = data.documents.filter(({ $createdAt }) => {
                const date = new Date();
                const reviewDate = new Date($createdAt);
                const diffMill = date - reviewDate;
                const trimDay = days.split(" ");
                const res =
                    trimDay[1] === "days"
                        ? diffMill / (1000 * 60 * 60 * 24) <= Number(trimDay[0])
                        : diffMill / (1000 * 60 * 60 * 24 * 30) <=
                          Number(trimDay[0]);
                return res;
            });

            setReviews(filtered);
        }
        return () => [];
    }, [days,data]);

    return (
        <View>
            <View className="flex-row items-center justify-between py-2 px-2 relative">
                <Text
                    onPress={refetch}
                    className=" py-2 font-semibold capitalize text-center"
                >
                    {isFetching ? "fetching" : "reload table"}
                </Text>
                <Ionicons
                    onPress={() => setOpt(prev => !prev)}
                    name="ellipsis-vertical"
                    size={20}
                />
            </View>
            <View>
                <Reviews reviews={reviews} />
            </View>
        </View>
    );
};

export default ReviewsTable;
