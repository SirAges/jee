import { View, Text, TouchableWithoutFeedback } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

// tab from
const AdminCard = ({
    total,
    previous,
    current,
    name,
    icon,
    color,
    selected,
    setSelected
}) => {
    const perc = (((current - previous) / current) * 100).toFixed(1);
    const isNeg = perc.includes("-");

    return (
        <TouchableWithoutFeedback onPress={() => setSelected(name)}>
            <View className="h-full w-full  shadow shadow-md shadow-black/40 rounded-md bg-white">
                <View className="flex-row justify-between px-2">
                    <Text
                        className={`capitalize font-semibold ${
                            selected === name ? "text-primary-1" : ""
                        }`}
                    >
                        {name}
                    </Text>
                    <View
                        style={{ backgroundColor: color }}
                        className="w-7 h-7 rounded-md justify-center items-center"
                    >
                        <FontAwesome6 name={icon} size={16} />
                    </View>
                </View>
                <View className="px-2">
                    <Text className="text-3xl font-extrabold">{total}</Text>
                    <View className="flex-row items-center space-x-2">
                        <Text style={{ color: isNeg ? "#a60404" : "#04a618" }}>
                            {perc}%
                        </Text>
                        <Text>
                            <Ionicons
                                size={16}
                                name={isNeg ? "arrow-down" : "arrow-up"}
                                color={isNeg ? "#f2070760" : "#07f20860"}
                            />
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default AdminCard;
