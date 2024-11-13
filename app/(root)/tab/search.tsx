import Loader from "@/components/Loader";

import ProdCard from "@/components/ProdCard";
import Search from "@/components/Search";

import { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLocalSearchParams } from "expo-router";
import { useGetProductsQuery } from "@/redux/product/productApiSlice";
const Searches = () => {
    const { searched } = useLocalSearchParams();
    const { data: products } = useGetProductsQuery();
    const [search, setSearch] = useState(searched);
    const [allSearched, setAllSearched] = useState([]);
    useEffect(() => {
        setSearch(searched);
        const getSearched = () => {
            const res = products.documents.filter(f => {
                return (
                    f.title.toLowerCase().includes(searched.toLowerCase()) ||
                    f.desc.toLowerCase().includes(searched.toLowerCase()) ||
                    f.shortdesc.toLowerCase().includes(searched.toLowerCase())
                );
            });
            setAllSearched(res || []);
        };
        if (products && products !== undefined) {
            getSearched();
        }
        return () => [];
    }, [searched,products]);
    if (!allSearched?.length)
        return <Loader text={`No Search result for ${searched}`} />;
    return (
        <SafeAreaView className="flex-1 h-full bg-white">
            <View className="h-16">
                <Search
                    placeholder="search here..."
                    search={search}
                    setSearch={setSearch}
                />
            </View>

            <View className="flex-1 bg-background-1">
                <FlatList
                    className=""
                    data={allSearched}
                    renderItem={({ item: s }) => (
                        <ProdCard key={s.id} item={s} width="w-1/2" />
                    )}
                    numColumns={2}
                    keyExtractor={s => s.$id}
                />
            </View>
        </SafeAreaView>
    );
};
export default Searches;
