
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    ScrollView
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { brands } from "@/lib/data";
const Filter = ({ filters, setFilter, setOpen, open }) => {
    return (
        <View className="py-2 flex-row space-x-2 bg-white px-2">
            <View className="border-border/20 border-[0.5px] bg-card-2 rounded-md w-10 h-10 items-center justify-center">
                <Ionicons
                    onPress={() => setOpen(true)}
                    name="filter"
                    size={24}
                    color="#185132"
                />
            </View>

            <View className="flex-row  flex-1">
                <ScrollView horizontal>
                    {brands.map(({ image, name }, i) => (
                        <TouchableWithoutFeedback
                            key={i}
                            onPress={() =>
                                router.push(`tab/search?searched=${name}`)
                            }
                        >
                            <View className="flex-row items-center px-2 space-x-2 border-border/20 border-[0.5px] rounded-sm mx-1">
                                <Image
                                    style={{ resizeMode: "cover" }}
                                    className="w-8 h-8 rounded-sm"
                                    source={{ uri: image }}
                                />
                                <Text className="font-semibold capitalize text-xs">
                                    {name}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default Filter;
