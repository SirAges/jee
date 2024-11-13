import HeroModal from "./HeroModal";
import EditModal from "./EditModal";
import BottomMenu from "./BottomMenu";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/loading/loadingSlice";
import {
    useUpdateProductMutation,
    useDeleteProductMutation
} from "@/redux/product/productApiSlice";
import { View, Text, ScrollView, Image, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { formatAmount, formatDateTime } from "@/lib/utils";
import { router } from "expo-router";
const ProductsTable = ({ days, isFetching, refetch, data }) => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [modal, setModal] = useState(false);
    const [edit, setEdit] = useState(false);
    const [hero, setHero] = useState(false);
    const [item, setItem] = useState({});
    const [opt, setOpt] = useState(false);
    const [idx, setIdx] = useState(null);
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    useEffect(() => {
        if (data && data !== undefined) {
            const filtered = data.documents.filter(({ $createdAt }) => {
                const date = new Date();
                const productDate = new Date($createdAt);
                const diffMill = date - productDate;
                const trimDay = days.split(" ");
                const res =
                    trimDay[1] === "days"
                        ? diffMill / (1000 * 60 * 60 * 24) <= Number(trimDay[0])
                        : trimDay[1].includes("month")
                        ? diffMill / (1000 * 60 * 60 * 24 * 30) <=
                          Number(trimDay[0])
                        : diffMill / (1000 * 60 * 60 * 24 * 365) <=
                          Number(trimDay[0]);
                return res;
            });

            setProducts(filtered?.length ? filtered : []);
        }
        return () => [];
    }, [days, data]);

    const buttons = [
        {
            title: "make product hero banner",
            color: "#b4f0f8",
            action: () => {
                setModal(false);
                setHero(true);
            }
        },
        {
            title: "edit product",
            color: "#f8e3b4",
            action: () => {
                setModal(false);
                setEdit(true);
            }
        },
        {
            title: "delete product",
            color: "#f8b4b4",
            action: () => handleDelete()
        }
    ];

    const handleEdit = async (field, value) => {
        try {
            const vals = {
                productId: idx,
                value: {
                    data: { [field]: value }
                }
            };
            await updateProduct(vals);

            setEdit(false);
        } catch (error) {
            console.log("error", error);
        } finally {
        }
    };

    const handleDelete = async () => {
        dispatch(setLoading());
        setModal(false);
        try {
            Alert.alert(
                "Hold on!",
                "Are you sure you want to delete this product?",
                [
                    {
                        text: "Cancel",
                        onPress: () => null,
                        style: "cancel"
                    },
                    {
                        text: "YES",
                        onPress: async () => {
                            await deleteProduct(idx);
                            refetch();
                        }
                    }
                ]
            );
        } catch (error) {
            console.log("error", error);
        } finally {
            dispatch(setLoading());
        }
    };
    const productOptions = [
        "title",
        "desc",
        "shortdesc",
        "price",
        "discount",
        "brand",
        "weight",
        "images",
        "category",
        "colors",
        "sizes",
        "shipping",
        "sku"
    ];

    return (
        <ScrollView>
            <View className="relative flex-1">
                {opt && (
                    <View className="absolute top-0 right-8 z-10 bg-white px-2 py-2 border border-dark-3 space-y-2">
                        <Text
                            onPress={() => router.push("admin/create-product")}
                            className="px-2 py-2 font-semibold capitalize bg-dark-3"
                        >
                            create product
                        </Text>
                    </View>
                )}
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
                <ScrollView horizontal>
                    <View className="space-y-2 bg-white">
                        <View className="flex-row items-center px-2 space-x-2 bproduct-b-2 bproduct-dark-3 ">
                            <Text className="w-7 h-7 capitalize font-semibold"></Text>
                            <Text className="w-14 capitalize font-semibold"></Text>
                            <Text className="w-24 capitalize font-semibold">
                                date
                            </Text>
                            <Text className="w-44 capitalize font-semibold">
                                Id
                            </Text>
                            <Text className="w-24 capitalize font-semibold">
                                title
                            </Text>
                            <Text className="w-24  capitalize font-semibold">
                                price
                            </Text>
                            <Text className="w-44  capitalize font-semibold">
                                short description
                            </Text>
                            <Text className="w-44  capitalize font-semibold">
                                description
                            </Text>
                            <Text className="w-24  capitalize font-semibold">
                                category
                            </Text>
                            <Text className="w-24  capitalize font-semibold">
                                weight
                            </Text>
                            <Text className="w-24  capitalize font-semibold">
                                colors
                            </Text>
                            <Text className="w-24  capitalize font-semibold">
                                sizes
                            </Text>
                            <Text className="w-24  capitalize font-semibold">
                                shipping
                            </Text>
                            <Text className="w-24  capitalize font-semibold">
                                sku
                            </Text>
                        </View>
                        <View className="w-full h-[1px] bg-dark-3" />
                        {products.map(
                            ({
                                $createdAt,
                                $id,
                                title,
                                price,
                                discount,
                                brand,
                                desc,
                                images,
                                category,
                                weight,
                                shortdesc,
                                shipping,
                                sizes,
                                colors,
                                sku
                            }) => (
                                <>
                                    <View
                                        key={$id}
                                        className="flex-row items-start py-2 px-2 space-x-2 bproduct-b bproduct-dark-3"
                                    >
                                        <View
                                            style={{
                                                backgroundColor: "#1eec2735"
                                            }}
                                            className="px-2 py-2 items-center justify-center h-fit"
                                        >
                                            <Ionicons
                                                onPress={() => {
                                                    setIdx($id);
                                                    setItem({
                                                        title,
                                                        price,
                                                        discount,
                                                        brand,
                                                        desc,
                                                        images,
                                                        category,
                                                        weight,
                                                        shortdesc,
                                                        shipping,
                                                        sizes,
                                                        colors,
                                                        sku
                                                    });
                                                    setModal(true);
                                                }}
                                                name="menu"
                                                size={16}
                                            />
                                        </View>
                                        <Image
                                            className="w-14 h-14 rounded-md"
                                            style={{ resizeMode: "cover" }}
                                            source={{ uri: images[0] }}
                                        />
                                        <Text className="w-24">
                                            {
                                                formatDateTime($createdAt)
                                                    .dateOnly
                                            }
                                        </Text>
                                        <Text className="w-44">{$id}</Text>
                                        <Text className="w-24">{title}</Text>
                                        <Text className="font-semibold w-24">
                                            {formatAmount(price)}
                                        </Text>
                                        <View>
                                            <ScrollView
                                                nestedScrollEnabled={true}
                                                className="max-h-44"
                                            >
                                                <Text className="w-44">
                                                    {shortdesc}
                                                </Text>
                                            </ScrollView>
                                        </View>
                                        <View>
                                            <ScrollView
                                                nestedScrollEnabled={true}
                                                className="max-h-44 "
                                            >
                                                <Text className="w-44">
                                                    {desc}...
                                                </Text>
                                            </ScrollView>
                                        </View>
                                        <Text className="w-24">{category}</Text>
                                        <Text className="w-24">{weight}</Text>
                                        <View className="flex-row items-center space-x-2 w-24">
                                            {colors.split(",").map(c => (
                                                <Text
                                                    key={c}
                                                    style={{
                                                        backgroundColor: c
                                                    }}
                                                    className="w-5 h-5  rounded-full border-2 border-gray-100"
                                                ></Text>
                                            ))}
                                        </View>
                                        <View className="flex-row items-center space-x-2 w-24">
                                            {sizes.split(",").map(s => (
                                                <Text
                                                    key={s}
                                                    className="  font-semibold uppercase"
                                                >
                                                    {s}
                                                </Text>
                                            ))}
                                        </View>
                                        <Text className="w-24">{shipping}</Text>
                                        <Text className="w-24">{sku}</Text>
                                    </View>
                                    <View className="w-full h-[1px] bg-dark-3" />
                                </>
                            )
                        )}
                    </View>
                    <BottomMenu
                        modal={modal}
                        setModal={setModal}
                        buttons={buttons}
                    />
                    <EditModal
                        initialFields={productOptions}
                        modal={edit}
                        item={item}
                        setModal={setEdit}
                        modalName="edit product"
                        action={handleEdit}
                    />
                    {item?.title && (
                        <HeroModal
                            idx={idx}
                            item={item}
                            modal={hero}
                            setModal={setHero}
                            action={handleEdit}
                        />
                    )}
                </ScrollView>
            </View>
        </ScrollView>
    );
};

export default ProductsTable;
