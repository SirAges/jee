import Loader from "@/components/Loader";
import TopIcons from "@/components/TopIcons";
import NewArrivals from "@/components/NewArrivals";
import RecentView from "@/components/RecentView";
import BestSelling from "@/components/BestSelling";
import Search from "@/components/Search";
import Hero from "@/components/Hero";
import { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { useGetProductsQuery } from "@/redux/product/productApiSlice";
import { useGetHerosQuery } from "@/redux/hero/heroApiSlice";
const Index = () => {
    const [search, setSearch] = useState("");
    const { data,  } = useGetProductsQuery();

    const { data: hero } = useGetHerosQuery();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        if (data && data.documents) {
            const res = [...data.documents].sort(
                (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)
            );

            setProducts(res);
        }
    }, [data]);

    if (!products?.length || hero === undefined) {
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
            <View>
                <TopIcons classes="absolute top-24 right-2 z-20 items-end px-4" />

                <ScrollView>
                    <Hero data={hero} />
                    <Search
                        placeholder="search for products..."
                        search={search}
                        setSearch={setSearch}
                    />

                    <NewArrivals products={products} />
                    <BestSelling products={products} />
                    <RecentView products={products} />
                </ScrollView>
            </View>
        </>
    );
};

export default Index;
