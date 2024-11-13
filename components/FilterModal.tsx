
import {
    View,
    Text,
    Modal,
    TouchableWithoutFeedback,

} from "react-native";
import Checkbox from "expo-checkbox";

const FilterModal = ({ open, setOpen, filter, setFilter }) => {
    const sizes = ["xs", "sm", "md", "lg", "xl", "xxl"];
    const prices = ["$", "$$", "$$$", "$$$$", "$$$$$", "$$$$$$"];
    const shippings = [
        "free shipping",
        "cheap shipping",
        "fast shipping",
        "moderate shipping",
        "custom shipping",
        "Immediate delivery"
    ];

    const onSizeChange = clicked => {
        setFilter(prev => ({ ...prev, size: clicked }));
    };
    const onPriceChange = clicked => {
        setFilter(prev => ({ ...prev, price: clicked }));
    };
    const onShippingChange = clicked => {
        setFilter(prev => ({ ...prev, shipping: clicked }));
    };
    return (
        <Modal
            animationType="fade"
            onRequestClose={() => setOpen(false)}
            transparent
            visible={open}
        >
            <TouchableWithoutFeedback onPress={() => setOpen(false)}>
                <View className="flex-1 justify-center items-center px-3">
                    <View
                        onStartShouldSetResponder={() => true} // Enable responder
                        onResponderRelease={e => e.stopPropagation()}
                        onTouchStart={e => e.stopPropagation()}
                        className="w-full bg-white rounded-lg shadow-inner shadow-black shadow-lg py-2 px-2"
                    >
                        <View className=" flex-row space-x-4 items-center">
                            <View>
                                <Text className="font-semibold text-lg capitalize">
                                    Sizes
                                </Text>
                                {sizes.map(s => (
                                    <View
                                        key={s}
                                        className="flex-row items-center my-2 space-x-2"
                                    >
                                        <Checkbox
                                            className=" border-border border-[1px]"
                                            value={filter?.size === s}
                                            onValueChange={() =>
                                                onSizeChange(s)
                                            }
                                            color="#4ee17b"
                                        />
                                        <Text className="uppercase">{s}</Text>
                                    </View>
                                ))}
                            </View>
                            <View>
                                <Text className="font-semibold text-lg capitalize">
                                    Prices
                                </Text>
                                {prices.map(p => (
                                    <View
                                        key={p}
                                        className="flex-row items-center my-2 space-x-2"
                                    >
                                        <Checkbox
                                            className=" border-border border-[1px]"
                                            value={filter?.price === p}
                                            onValueChange={() =>
                                                onPriceChange(p)
                                            }
                                            color="#4ee17b"
                                        />
                                        <Text className="uppercase">{p}</Text>
                                    </View>
                                ))}
                            </View>
                            <View>
                                <Text className="font-semibold text-lg capitalize">
                                    Shippings
                                </Text>
                                {shippings.map(s => (
                                    <View
                                        key={s}
                                        className="flex-row items-center my-2 space-x-2"
                                    >
                                        <Checkbox
                                            className=" border-border border-[1px]"
                                            value={filter?.shipping === s}
                                            onValueChange={() =>
                                                onShippingChange(s)
                                            }
                                            color="#4ee17b"
                                        />
                                        <Text className="uppercase text-xs">
                                            {s}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View className="flex-row items-center justify-between py-2 px-2">
                            <Text
                                onPress={() =>
                                    setFilter({
                                        price: "",
                                        size: "",
                                        shiping: ""
                                    })
                                }
                                className=" text-md text-primary-1 capitalize"
                            >
                                clear
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default FilterModal;
