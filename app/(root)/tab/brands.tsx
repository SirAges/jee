import Search from "@/components/Search";
import { brands } from "@/lib/data";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableWithoutFeedback
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Brands = () => {
    const [search, setSearch] = useState("");
    const [allSearched, setAllSearched] = useState([]);
    useEffect(() => {
        const getSearched = () => {
            const filtered = brands.filter(f => {
                const brand = f?.name?.toLowerCase();
                return brand.includes(search.toLowerCase());
            });
            setAllSearched(filtered);
        };
        getSearched();
        return () => [];
    }, [search]);
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="h-16">
                <Search
                    placeholder="search for brands..."
                    search={search}
                    setSearch={setSearch}
                />
            </View>
            <View className="flex-1 bg-background-1 w-full">
                <FlatList
                    data={allSearched}
                    renderItem={({ item: s }) => (
                        <TouchableWithoutFeedback
                            onPress={() =>
                                router.push(
                                    `tab/search?searched=${s.name.toLowerCase()}`
                                )
                            }
                        >
                            <View className="w-1/2 p-1 rounded-md">
                                <View className=" rounded-md bg-white p-1">
                                    <View>
                                        <Image
                                            className="w-full h-44"
                                            style={{ resizeMode: "cover" }}
                                            source={{ uri: s.image }}
                                        />
                                    </View>
                                    <Text className="px-2 py-2 font-semibold text-primary-2">
                                        {s.name}
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                    numColumns={2}
                    keyExtractor={s => s.name}
                />
            </View>
        </SafeAreaView>
    );
};

export default Brands;
