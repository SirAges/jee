import { useState, useEffect } from "react";
import {
    View,
    Text,
    Modal,
    TouchableWithoutFeedback,
    TextInput,
    Image
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { setLoading, selectCurrentLoading } from "@/redux/loading/loadingSlice";
import UUID from "react-native-uuid";
import SelectDropdown from "react-native-select-dropdown";
import { useDispatch, useSelector } from "react-redux";

const EditModal = ({
    modal,
    setModal,
    action,
    item,
    initialFields,
    isPassword,
    modalName
}) => {
    const loading = useSelector(selectCurrentLoading);
    const dispatch = useDispatch();
    const [files, setFiles] = useState([]);
    const [value, setValue] = useState("");

    const [field, setField] = useState(initialFields[0]);
    const [password, setPassword] = useState("");
    const EXPO_PUBLIC_CLOUDINARY_CLOUDENAME =
        process.env.EXPO_PUBLIC_CLOUDINARY_CLOUDENAME;
    const EXPO_PUBLIC_CLOUDINARY_API_KEY =
        process.env.EXPO_PUBLIC_CLOUDINARY_API_KEY;
    useEffect(() => {
        if (field === "images") {
            setFiles(item[field]);
            return;
        }
        setValue(item[field]);
        return () => "";
    }, [field, modal, item]);
    const pickDocument = async () => {
        try {
            const { assets } = await DocumentPicker.getDocumentAsync({
                multiple: true,
                type: ["image/png", "image/jpg", "image/jpeg"]
            });

            if (!assets) {
                console.log("error", error);
            }

            await assets.forEach(asset => {
                const { uri, size, mimeType: type, name } = asset;
                setFiles(prev => [...prev, { uri, size, type, name }]);
            });
        } catch (error) {
            console.log("error", error.message);
        }
    };
    const removeImage = clicked => {
        const filtered = files.filter(f =>
            f?.url ? f?.uri !== clicked : f !== clicked
        );
        setFiles(filtered);
    };
    const handleImageUpdate = async () => {
        dispatch(setLoading());
        const uniqueID = UUID.v4();
        const cloudName = EXPO_PUBLIC_CLOUDINARY_CLOUDENAME;
        const apiKey = EXPO_PUBLIC_CLOUDINARY_API_KEY;
        const uploadPreset = "tlccrm";
        const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
        try {
            if (field === "images") {
                const imageUploadPromises = files.map(async f => {
                    if (f?.uri) {
                        const { uri, size, name, type } = f;
                        const sized = Number((size / 1000000).toFixed(2));

                        if (sized > 4) {
                            Toast.show("File must not be larger than 4MB");
                            return;
                        }

                        // const base64 = await FileSystem.readAsStringAsync(uri, {
                        //     encoding: FileSystem.EncodingType.Base64
                        // });
                        const formData = new FormData();
                        formData.append("file", {
                            uri,
                            type,
                            name: `${uniqueID}_${name}`
                        });
                        formData.append("upload_preset", uploadPreset);
                        formData.append("api_key", apiKey);

                        const response = await fetch(apiUrl, {
                            method: "POST",
                            body: formData,
                            headers: {
                                accept: "application/json"
                            }
                        });

                        if (!response.ok) {
                            throw new Error(
                                `Upload failed: ${response.statusText}`
                            );
                        }

                        const data = await response.json();

                        return data.secure_url;
                    } else {
                        return f;
                    }
                });
                const imagesUrl = await Promise.all(imageUploadPromises);

                setValue(imagesUrl);
            }

            await action(field, value, password);
        } catch (error) {
            console.log("error", error);
        } finally {
            dispatch(setLoading());
        }
    };

    const shippings = [
        "free shipping",
        "cheap shipping",
        "fast shipping",
        "moderate shipping",
        "custom shipping",
        "Immediate delivery"
    ];
    return (
        <Modal
            animationType="slide"
            onRequestClose={() => setModal(false)}
            transparent
            visible={modal}
        >
            <View className=" bg-black/50 h-full w-full">
                <TouchableWithoutFeedback
                    onPress={() => (loading ? null : setModal(false))}
                >
                    <View className="justify-center items-center px-2 flex-1">
                        <View
                            onStartShouldSetResponder={() => true} // Enable responder
                            onResponderRelease={e => e.stopPropagation()}
                            onTouchStart={e => e.stopPropagation()}
                            className="bg-white rounded-md pb-2 w-full"
                        >
                            <Text className="font-semibold  text-md py-4 px-2 bg-dark-3 text-center rounded-t-md capitalize">
                                {modalName}
                            </Text>
                            <View className="px-2 space-y-2">
                                <SelectDropdown
                                    dropdownStyle={{
                                        backgroundColor: "#185132",
                                        borderRadius: 5
                                    }}
                                    statusBarTranslucent
                                    data={initialFields}
                                    onSelect={setField}
                                    renderButton={(selectedItem, isOpened) => {
                                        return (
                                            <View className="w-full">
                                                <Text className="font-semibold capitalize">
                                                    {modalName}{" "}
                                                    {field.replace("old", "")}
                                                </Text>
                                            </View>
                                        );
                                    }}
                                    renderItem={(item, index, isSelected) => {
                                        return (
                                            <View
                                                style={{
                                                    backgroundColor: isSelected
                                                        ? "#052f1841"
                                                        : ""
                                                }}
                                            >
                                                <Text className="py-4 px-2 text-white bg-transparent capitalize">
                                                    {item.replace("old", "")}
                                                </Text>
                                            </View>
                                        );
                                    }}
                                    showsVerticalScrollIndicator={false}
                                />
                                <View className="bg-card-2 border-border border rounded-md w-full py-3 px-2">
                                    {field === "images" ? (
                                        <View className="items-center w-full space-y-3 relative">
                                            <TouchableWithoutFeedback
                                                onPress={pickDocument}
                                            >
                                                <View className=" items-center ">
                                                    <Image
                                                        className=" w-12 h-12"
                                                        style={{
                                                            resizeMode:
                                                                "contain"
                                                        }}
                                                        source={require("@/assets/icons/upload.png")}
                                                    />
                                                    <Text className="text-white ">
                                                        upload file (below 4mb)
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                            <View className=" items-center justify-center flex-row flex-wrap gap-2 z-10">
                                                {files.map((f, i) => (
                                                    <View
                                                        key={i}
                                                        className="border-border rounded-md h-16 w-16 rounded-md border-border relative"
                                                    >
                                                        <View className="absolute -top-1 z-20 -left-1">
                                                            <Text
                                                                onPress={() =>
                                                                    removeImage(
                                                                        f?.uri
                                                                            ? f.uri
                                                                            : f
                                                                    )
                                                                }
                                                                className="text-destructive-2"
                                                            >
                                                                <Ionicons
                                                                    name="trash"
                                                                    size={20}
                                                                />
                                                            </Text>
                                                        </View>
                                                        <View className="absolute h-full w-full items-center justify-center z-10">
                                                            {f?.size && (
                                                                <Text className="    text-primary-1 font-bold">
                                                                    {(
                                                                        f?.size /
                                                                        1000000
                                                                    ).toFixed(
                                                                        1
                                                                    )}
                                                                    mb
                                                                </Text>
                                                            )}
                                                        </View>
                                                        <Image
                                                            className=" w-full h-full rounded-md"
                                                            style={{
                                                                resizeMode:
                                                                    "cover"
                                                            }}
                                                            source={{
                                                                uri: f?.uri
                                                                    ? f.uri
                                                                    : f
                                                            }}
                                                        />
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    ) : field === "shipping" ? (
                                        <SelectDropdown
                                            dropdownStyle={{
                                                backgroundColor: "#185132",
                                                borderRadius: 5
                                            }}
                                            statusBarTranslucent
                                            data={shippings}
                                            onSelect={setValue}
                                            renderButton={(
                                                selectedItem,
                                                isOpened
                                            ) => {
                                                return (
                                                    <View className="w-full ">
                                                        <Text className=" capitalize py-1">
                                                            {value}
                                                        </Text>
                                                    </View>
                                                );
                                            }}
                                            renderItem={(
                                                item,
                                                index,
                                                isSelected
                                            ) => {
                                                return (
                                                    <View
                                                        style={{
                                                            backgroundColor:
                                                                isSelected
                                                                    ? "#052f1841"
                                                                    : ""
                                                        }}
                                                    >
                                                        <Text className="py-4 px-2 text-white bg-transparent capitalize">
                                                            {item}
                                                        </Text>
                                                    </View>
                                                );
                                            }}
                                            showsVerticalScrollIndicator={false}
                                        />
                                    ) : (
                                        <TextInput
                                            className="w-full text-primary-2 bg-transparent tracking-wider max-h-44"
                                            value={value}
                                            multiline={field.includes("desc")}
                                            onChangeText={setValue}
                                            placeholder={
                                                field !== "oldPassword"
                                                    ? `${modalName} ${field}`
                                                    : "old password"
                                            }
                                            placeholderTextColor="185132"
                                            keyboardType={""}
                                            returnKeyType="done"
                                            autoCapitalize="sentences"
                                            autoCorrect={false}
                                            autoFocus={false}
                                            contextMenuHidden={false}
                                            dataDetectorTypes="all"
                                            editable={!loading}
                                            textAlign="left"
                                            textAlignVertical={"center"}
                                            spellCheck={true}
                                            inputMode={"text"}
                                            passwordRules="required: lower; upper; numeric; special;"
                                            selectionColor="#4ee17b"
                                        />
                                    )}
                                </View>
                                {isPassword && (
                                    <View className="bg-card-2 border-border border rounded-md w-full py-3 px-2">
                                        <TextInput
                                            className="w-full text-primary-2 bg-transparent tracking-wider max-h-44"
                                            value={password}
                                            secureTextEntry
                                            onChangeText={setPassword}
                                            
                                            placeholder={`${
                                                field === "oldPassword"
                                                    ? "new"
                                                    : ""
                                            } password`}
                                            placeholderTextColor="185132"
                                            keyboardType={""}
                                            returnKeyType="done"
                                            autoCapitalize="sentences"
                                            autoCorrect={false}
                                            autoFocus={false}
                                            contextMenuHidden={false}
                                            dataDetectorTypes="all"
                                            editable={!loading}
                                            textAlign="left"
                                            textAlignVertical={"center"}
                                            spellCheck={true}
                                            inputMode={"text"}
                                            passwordRules="required: lower; upper; numeric; special;"
                                            selectionColor="#4ee17b"
                                        />
                                    </View>
                                )}
                                <Text
                                    onPress={loading ? null : handleImageUpdate}
                                    className="py-4 px-2 bg-primary-1 rounded-md text-center font-semibold"
                                >
                                    Submit
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </Modal>
    );
};

export default EditModal;
