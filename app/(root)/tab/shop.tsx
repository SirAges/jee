import FilterModal from "@/components/FilterModal";
import Loader from "@/components/Loader";
import Filter from "@/components/Filter";
import ProdCard from "@/components/ProdCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import Search from "@/components/Search";
import { useEffect, useState } from "react";

import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useGetProductsQuery } from "@/redux/product/productApiSlice";
const Shop = () => {
    const [allProducts, setAllProducts] = useState([]);
    const { data, isFetching, refetch } = useGetProductsQuery();
    const [filter, setFilter] = useState({ size: "", price: "", shipping: "" });
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    useEffect(() => {
        if (data && data.documents) {
            const res = [...data.documents]
                .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt))
                .filter(f => {
                    const isPriceMatch =
                        f?.price?.length === filter?.price?.length;
                    const isSizeMatch = f.sizes
                        ?.toLowerCase()
                        .includes(filter.size.toLowerCase());
                    const isShippingMatch =
                        f?.shipping?.toLowerCase() ===
                        filter?.shipping?.toLowerCase();

                    // Count how many conditions are met
                    const conditionsMet = [
                        isPriceMatch,
                        isSizeMatch,
                        isShippingMatch
                    ].filter(Boolean).length;

                    // Return true if exactly two or more conditions are met
                    return conditionsMet >= 1;
                });

            setAllProducts(res);
        }
    }, [data, filter]);
    if (isFetching) {
        return <Loader text="please wait... fetching products" />;
    }
    if (data === undefined) {
        return (
            <Loader
                refetch={refetch}
                text="unable to fetch products check your internet connection"
            />
        );
    }

    return (
        <>
            <FilterModal
                filter={filter}
                setFilter={setFilter}
                open={open}
                setOpen={setOpen}
            />

            <SafeAreaView className="flex-1 bg-white">
                <View className="bg-white">
                    <View className="flex-row items-center px-2">
                        <Ionicons
                            onPress={() => router.back()}
                            name="arrow-back"
                            color="#4ee17b"
                            size={24}
                        />
                        <Search
                            placeholder="search for products..."
                            search={search}
                            setSearch={setSearch}
                        />
                    </View>
                    <Filter
                        open={open}
                        setOpen={setOpen}
                        filter={filter}
                        setFilter={setFilter}
                    />
                </View>
                <ScrollView className="flex-1 bg-background-1">
                    <View className="w-full flex-row flex-wrap items-center">
                        {allProducts.slice(0, 10).map(item => (
                            <ProdCard key={item.id} item={item} width="w-1/2" />
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default Shop;
