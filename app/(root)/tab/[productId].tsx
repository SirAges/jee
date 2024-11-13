import Loader from "@/components/Loader";
import ReviewModal from "../../../components/ReviewModal";
import Checkout from "@/components/Checkout";
import ActionIcon from "@/components/ActionIcon";
import { coupons } from "@/lib/data";
import Coupons from "@/components/Coupons";

import Toast from "react-native-simple-toast";
import AboutItem from "@/components/AboutItem";
import Reviews from "@/components/Reviews";
import { useLocalSearchParams, router } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import {
    selectCurrentWish,
    addToWish,
    removeFromWish
} from "@/redux/wish/wishSlice";
import { useGetCurrentQuery } from "@/redux/auth/authApiSlice";
import { setLoading } from "@/redux/loading/loadingSlice";
import { addToRecent } from "@/redux/product/productSlice";
import {
    selectCurrentCart,
    addToCart,
    removeFromCart
} from "@/redux/cart/cartSlice";
import { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    ScrollView
} from "react-native";
import { getRating, roundNum, formatAmount } from "@/lib/utils";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
    useAddNewReviewMutation,
    useGetProductReviewQuery
} from "@/redux/review/reviewApiSlice";
import { useGetProductQuery } from "@/redux/product/productApiSlice";
const Product = () => {
    const { productId } = useLocalSearchParams();
    console.log("productId", productId);
    const date = new Date();

    const [reviews, setReviews] = useState([]);
    const [variant, setVariant] = useState({ size: "", color: "" });
    const [coupon, setCoupon] = useState("");
    const [modal, setModal] = useState(false);
    const [qty, setQty] = useState(1);
    const [idx, setIdx] = useState(0);
    const [tab, setTab] = useState({
        about: true,
        review: false
    });

    const [addNewReview] = useAddNewReviewMutation();
    const { data, isFetching: fReview } = useGetProductReviewQuery(productId);
    const { data: product, isFetching } = useGetProductQuery(productId);
    const { data: current } = useGetCurrentQuery();
    const dispatch = useDispatch();
    const wishes = useSelector(selectCurrentWish);
    const carts = useSelector(selectCurrentCart);

    const wished = wishes.some(s => s.$id === product?.$id);
    const carted = carts.some(s => s.$id === product?.$id);

    const totalReviews = reviews?.length;
    const avgReview = getRating(reviews);
    const couponAvailable = coupons.find(
        f => f?.coupon?.toLowerCase().split("-")[0] === coupon.toLowerCase()
    );
    const couponPerc = couponAvailable?.coupon?.split("-")[1];
    const couponText = couponAvailable?.coupon?.split("-")[0];
    useEffect(() => {
        const getProduct = () => {
            if (product && product !== undefined) {
                setVariant({
                    size: product?.sizes?.split(",")[0],
                    color: product?.colors?.split(",")[0]
                });
            }
        };
        getProduct();
        return () => {};
    }, [productId, product]);

    useEffect(() => {
        if (data && data !== undefined) {
            dispatch(addToRecent({ date: `${date}`, productId }));
            const res = [...data.documents]
                .sort((a, b) => {
                    const dateA = new Date(a.$createdAt);
                    const dateB = new Date(b.$createdAt);
                    return dateB - dateA;
                })
                .filter(f => f.productId === productId);

            setReviews(res);
        }
        return () => [];
    }, [data, productId, dispatch]);

    const toggleWish = () => {
        if (wished) {
            dispatch(removeFromWish(product.$id));
        } else {
            dispatch(
                addToWish({
                    $id: product.$id,
                    title: product.title,
                    images: product.images,
                    desc: product.desc,
                    price: product.price,
                    qty,
                    variant
                })
            );
        }
    };
    const toggleCart = () => {
        if (carted) {
            dispatch(removeFromCart(product.$id));
        } else {
            dispatch(
                addToCart({
                    $id: product.$id,
                    title: product.title,
                    images: product.images,
                    desc: product.desc,
                    price: product.price,
                    qty,
                    variant
                })
            );
        }
    };

    const handleReview = async value => {
        try {
            dispatch(setLoading());
            if (current) {
                const { rate, value: review } = value;

                const { email, targets, name } = current;
                const id = `${targets[0].userId.slice(0, 16)}-${productId.slice(
                    0,
                    16
                )}`;
                console.log("id", current);
                const data = await addNewReview({
                    documentId: id,
                    data: {
                        productId,
                        rate,
                        review,
                        email,
                        name,
                        userId: targets[0].userId
                    }
                });
                console.log("data", data);
                if (data?.error) {
                    Toast.show("you have dropped a review else try again");
                    setModal(false);
                    return;
                }

                setModal(false);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            dispatch(setLoading());
        }
    };
    if (isFetching || fReview) {
        return (
            <Loader
                text="please wait... fetching product 
"
            />
        );
    }

    return (
        product?.$id && (
            <SafeAreaView className="relative flex-1 bg-white">
                <View className="px-2 flex-row justify-between w-full z-10 py-2">
                    <Ionicons
                        onPress={() => router.back()}
                        name="arrow-back"
                        color="#4ee17b"
                        size={24}
                    />
                    <View className="flex-row space-x-3">
                        <ActionIcon
                            classes="z-50 px-3"
                            icon="heart"
                            action={toggleWish}
                            cond={wished}
                        />
                        <ActionIcon
                            classes="px-3"
                            icon="cart"
                            action={toggleCart}
                            cond={carted}
                        />
                    </View>
                </View>
                <ScrollView className="flex-1">
                    <View className="justify-center  bg-white relative w-full">
                        <View className="justify-center  bg-white relative w-full">
                            <Image
                                className="w-full h-96"
                                source={{ uri: product?.images[idx] }}
                                style={{ resizeMode: "cover" }}
                            />
                            <View className="absolute right-2">
                                {product.images.map(
                                    (m, i) =>
                                        idx !== i && (
                                            <TouchableWithoutFeedback
                                                key={i}
                                                onPress={() => setIdx(i)}
                                            >
                                                <View className="my-2 relative w-14 h-14 bg-card-2 rounded-md p-1 border-border border-[1px]">
                                                    <Image
                                                        className="w-full h-full w-full bg-background-1 opacity-90 rounded-md"
                                                        source={{ uri: m }}
                                                        style={{
                                                            resizeMode: "cover"
                                                        }}
                                                    />
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                )}
                            </View>
                        </View>
                        <View className="px-2 py-2">
                            <View className="flex-row items-center justify-between">
                                <Text className="bg-primary-1 w-24  py-1 px-2 rounded-md text-center text-white font-semibold text-xs  ">
                                    {product.shipping}
                                </Text>
                                <Text
                                    onPress={() => setModal(true)}
                                    className="text-primary-2"
                                >
                                    write a review
                                </Text>
                            </View>
                            <Text className="text-2xl font-semibold capitalize  w-full">
                                {product.title}
                            </Text>
                            <Text
                                onPress={() =>
                                    router.push(
                                        `/search?searched=${product.category}`
                                    )
                                }
                                className="text-dark-2 capitalize font-semibold text-md pb-2 px-2"
                            >
                                {product.category}
                            </Text>
                            <View className="flex-row items-center justify-between">
                                <Text className="text-dark-2 text-sm capitalize font-medium">
                                    <Ionicons
                                        name="star"
                                        size={10}
                                        color="#4ee17b"
                                    />
                                    {` ${roundNum(avgReview)} Ratings`}
                                </Text>
                                <Text className="text-dark-2 text-sm capitalize font-medium">
                                    {`${roundNum(totalReviews)} Reviews`}
                                </Text>
                                <Text className="text-dark-2 text-sm capitalize font-medium">
                                    {`${roundNum(totalReviews)} Sold`}
                                </Text>
                            </View>
                            <Coupons
                                couponAvailable={couponAvailable}
                                coupon={coupon}
                                setCoupon={setCoupon}
                            />

                            <View className="flex-row items-center justify-between py-4">
                                <Text
                                    onPress={() =>
                                        setTab(prev => ({
                                            about: true,
                                            review: false
                                        }))
                                    }
                                    className={`text-center font-semibold flex-1 ${
                                        tab.about
                                            ? "text-primary-1 border-border border-b-[1px]"
                                            : "text-dark-2"
                                    }`}
                                >
                                    About Item
                                </Text>
                                <Text
                                    onPress={() =>
                                        setTab(prev => ({
                                            about: false,
                                            review: true
                                        }))
                                    }
                                    className={`text-center font-semibold flex-1 ${
                                        tab.review
                                            ? "text-primary-1 border-border border-b-[1px]"
                                            : "text-dark-2"
                                    }`}
                                >
                                    Reviews
                                </Text>
                            </View>
                            {tab.about && (
                                <AboutItem
                                    setVariant={setVariant}
                                    variant={variant}
                                    about={{
                                        shortdesc: product.shortdesc,
                                        desc: product.desc,
                                        colors: product.colors,
                                        sizes: product.sizes,
                                        weight: product.weight
                                    }}
                                />
                            )}
                            {tab.review && <Reviews reviews={reviews} />}
                        </View>
                    </View>
                </ScrollView>
                <View className="px-3 py-2 justify-between flex-row border-t border-border">
                    <View>
                        <Text className="text-xs capitalize text-dark-2">
                            Total price
                        </Text>
                        {!product?.discount ? (
                            <Text className="text-2xl font-semibold capitalize text-primary-2">
                                {formatAmount(
                                    qty *
                                        (couponAvailable
                                            ? (product.price * couponPerc) / 100
                                            : product.price)
                                )}
                            </Text>
                        ) : (
                            <View>
                                <Text className="text-sm font-semibold capitalize text-dark-2 line-through">
                                    {formatAmount(qty * product.price)}
                                </Text>
                                <Text className="text-xl font-semibold capitalize text-primary-2 ">
                                    {formatAmount(
                                        qty *
                                            (couponAvailable
                                                ? (product.price *
                                                      (product.discount
                                                          ? product.discount /
                                                            100
                                                          : 1) *
                                                      couponPerc) /
                                                  100
                                                : product.price *
                                                  (product?.discount
                                                      ? product.discount / 100
                                                      : 1))
                                    )}
                                </Text>
                            </View>
                        )}
                    </View>
                    <View className="flex-row items-center">
                        <Ionicons
                            onPress={() =>
                                setQty(prev => (prev > 1 ? prev - 1 : 1))
                            }
                            name={
                                qty > 1
                                    ? "remove-circle"
                                    : "remove-circle-outline"
                            }
                            color="#ba1717"
                            size={24}
                        />
                        <Text className="text-primary-2 px-3 font-semibold">
                            {qty}
                        </Text>

                        <Ionicons
                            onPress={() => setQty(prev => prev + 1)}
                            name={qty > 1 ? "add-circle" : "add-circle-outline"}
                            color="#4ee17b"
                            size={24}
                        />
                    </View>

                    <Checkout
                        variant={variant}
                        products={[
                            `${productId}=${qty}=${product.price}=${product.title}=${product.images[0]}=${variant.size}=${variant.color}`
                        ]}
                        amount={
                            qty *
                            (couponAvailable
                                ? (product.price * couponPerc) / 100
                                : product.price)
                        }
                    />
                </View>

                <ReviewModal
                    modal={modal}
                    setModal={setModal}
                    action={handleReview}
                />
            </SafeAreaView>
        )
    );
};

export default Product;
