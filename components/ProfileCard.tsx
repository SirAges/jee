import { View, Text } from "react-native";
const ProfileCard = ({ name, email }) => {
    return (
        <View className="flex-row justify-between items-center flex-1 space-x-2">
            <View className="flex-1">
                <Text className="font-semibold text-sm capitalize">{name}</Text>
                <Text className="text-dark-2 text-xs ">{email}</Text>
            </View>
        </View>
    );
};

export default ProfileCard;
