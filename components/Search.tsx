
import { View, TextInput } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
const Search = ({ classes, search, setSearch, placeholder }) => {
    // tab run next

    return (
        <View
            className={`z-50  border-border/20 border-[1px] rounded-md  flex-row space-x-2 items-center bg-card-2 mx-2 my-2 px-2 flex-1 ${classes}`}
        >
            <TextInput
                className={`py-2 tracking-wider flex-1 ${
                    classes ? "text-white" : "text-primary-2"
                }`}
                value={search}
                onChangeText={text => setSearch(text)}
                placeholder={placeholder}
                placeholderTextColor={classes ? "#ffffff" : "#185132"}
                returnKeyType="search"
                autoCapitalize="sentences"
                autoCorrect={false}
                autoFocus={false}
                clearButtonMode="while-editing"
                contextMenuHidden={false}
                dataDetectorTypes="all"
                editable={true}
                enablesReturnKeyAutomatically={true}
                onSubmitEditing={() => () => {
                    router.push(`tab/search?searched=${search.toLowerCase()}`);
                    setSearch("");
                }}
                textAlign="left"
                textAlignVertical={"center"}
                spellCheck={true}
                allowFontScaling={true}
                inputMode={"text"}
                selectionColor="#4ee17b"
            />
            <Ionicons
                onPress={() => {
                    router.push(`tab/search?searched=${search.toLowerCase()}`);
                    setSearch("");
                }}
                name="search"
                size={24}
                color="#4ee17b"
            />
        </View>
    );
};

export default Search;
