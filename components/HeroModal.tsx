import { useState, useEffect } from "react";
import {
    View,
    Text,
    Modal,
    TouchableWithoutFeedback,
    TextInput,
    Image,
    ScrollView
} from "react-native";

import * as DocumentPicker from "expo-document-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { setLoading, selectCurrentLoading } from "@/redux/loading/loadingSlice";
import { useUpdateHeroMutation } from "@/redux/hero/heroApiSlice";
import UUID from "react-native-uuid";
import { useDispatch, useSelector } from "react-redux";

const HeroModal = ({ modal, setModal, idx, item }) => {
    const [updateHero] = useUpdateHeroMutation();
    const loading = useSelector(selectCurrentLoading);
    const dispatch = useDispatch();
    const [files, setFiles] = useState([]);
    const [imgIdx, setImgIdx] = useState(0);
    useEffect(() => {
        if (item?.title) {
            setFiles(prev => [
                { size: 1000000, type: "", uri: item?.images[imgIdx] }
            ]);
        }
    }, [idx, imgIdx, item?.title, item?.images]);
    const [value, setValue] = useState({
        tag: "",
        discount: "",
        desc: "",
        cta: "",
        frontColor: "",
        backColor: "",
        layout: "",
        productId: ""
    });

    const [layoutStyle, setLayoutStyle] = useState("left");
    const fields = ["images", "discount", "tag", "desc", "cta"];
    const colors = [
        "#FFFFFF", // White
        "#000000", // Black
        "#FF00FF", // Magenta
        "#00FFFF", // Cyan
        "#808080", // Gray
        "#800000", // Maroon
        "#008000", // Dark Green
        "#000080", // Navy
        "#808000", // Olive
        "#800080", // Purple
        "#008080", // Teal
        "#F0F0F0" // Light Gray
    ];
    const layouts = [
        "left",
        "center",
        "right",
        "top-right",
        "top-left",
        "top-center",
        "bottom-right",
        "bottom-left",
        "bottom-center"
    ];

    const handleLayout = clicked => {
        if (clicked === "left") {
            setLayoutStyle("items-start justify-center");

            return;
        }
        if (clicked === "center") {
            setLayoutStyle("items-center justify-center");
            return;
        }
        if (clicked === "right") {
            setLayoutStyle("items-end justify-center");
            return;
        }
        if (clicked === "top-right") {
            setLayoutStyle("items-end justify-start");
            return;
        }
        if (clicked === "top-center") {
            setLayoutStyle("items-center justify-start");
            return;
        }
        if (clicked === "top-left") {
            setLayoutStyle("items-start justify-start");
            return;
        }
        if (clicked === "bottom-center") {
            setLayoutStyle("items-center justify-end");
            return;
        }
        if (clicked === "bottom-left") {
            setLayoutStyle("items-start justify-end");
            return;
        }
        if (clicked === "bottom-right") {
            setLayoutStyle("items-end justify-end");
            return;
        }
    };

    const pickDocument = async () => {
        try {
            const { assets } = await DocumentPicker.getDocumentAsync({
                multiple: false,
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
        const filtered = files.filter(f => f.uri !== clicked);
        setFiles(filtered);
    };
    const handleHeroUpdate = async () => {
        dispatch(setLoading());
        const uniqueID = UUID.v4();
        const cloudName = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUDENAME;
        const apiKey = process.env.EXPO_PUBLIC_CLOUDINARY_API_KEY;
        const uploadPreset = "tlccrm";
        const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
        try {
            const imageUploadPromises = files.map(async f => {
                if (!f?.uri.includes("http")) {
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
                    return f.uri;
                }
            });
            const imagesUrl = await Promise.all(imageUploadPromises);

            setValue(prev => ({
                ...prev,
                images: imagesUrl,
                layout: layoutStyle,
                productId: idx
            }));

            const newValue = {
                data: value
            };
           await updateHero(newValue);
        } catch (error) {
            console.log("error", error);
        } finally {
            dispatch(setLoading());
        }
    };

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
                            <Text className="font-semibold  text-md py-4 px-2 bg-dark-3 text-center rounded-t-md">
                                Customize your hero banner
                            </Text>

                            <View className="flex-row items-center space-x-2 py-2 px-2">
                                <Text>Front color</Text>
                                <View className="flex-row items-center gap-1 flex-wrap flex-1">
                                    {colors.map(c => (
                                        <Text
                                            onPress={() =>
                                                setValue(prev => ({
                                                    ...prev,
                                                    frontColor: c
                                                }))
                                            }
                                            style={{
                                                backgroundColor: c
                                            }}
                                            className="rounded-full h-5 w-5 border-2 border-dark-3 text-xs"
                                        >
                                            {c === value.frontColor &&
                                                String.fromCharCode(
                                                    parseInt("2713", 16)
                                                )}
                                        </Text>
                                    ))}
                                </View>
                            </View>

                            <View className="flex-row items-center space-x-2 py-2 px-2">
                                <Text>Back color</Text>
                                <View className="flex-row items-center gap-1 flex-wrap flex-1">
                                    {colors.map(c => (
                                        <Text
                                            onPress={() =>
                                                setValue(prev => ({
                                                    ...prev,
                                                    backColor: `${c}50`
                                                }))
                                            }
                                            style={{
                                                backgroundColor: c
                                            }}
                                            className="rounded-full h-5 w-5 border-2 border-dark-3 text-xs"
                                        >
                                            {`${c}50` === value.backColor &&
                                                String.fromCharCode(
                                                    parseInt("2713", 16)
                                                )}
                                        </Text>
                                    ))}
                                </View>
                            </View>
                            <View className="flex-row flex-wrap items-center gap-1 px-2 py-2">
                                {layouts.map(l => (
                                    <Text
                                        onPress={() => handleLayout(l)}
                                        className="grow text-center bg-card-1 rounded-md px-2 py-2"
                                    >
                                        {l}
                                    </Text>
                                ))}
                            </View>
                            <ScrollView className="max-h-96">
                                <View className="px-2 py-3 space-y-2">
                                    {fields.map(f => (
                                        <View className="bg-card-2 border-border border rounded-md w-full">
                                            {f === "images" ? (
                                                <View className="items-center w-full space-y-3  relative">
                                                    {!files.length ? (
                                                        <TouchableWithoutFeedback
                                                            onPress={
                                                                pickDocument
                                                            }
                                                        >
                                                            <View className=" items-center space-y-3 py-2">
                                                                <Image
                                                                    className=" w-12 h-12"
                                                                    style={{
                                                                        resizeMode:
                                                                            "contain"
                                                                    }}
                                                                    source={require("@/assets/icons/upload.png")}
                                                                />
                                                                <Text className="text-primary-2 ">
                                                                    upload file
                                                                    (below 4mb)
                                                                </Text>
                                                            </View>
                                                        </TouchableWithoutFeedback>
                                                    ) : (
                                                        <View className=" items-center justify-center flex-row flex-wrap  ">
                                                            {files.map(
                                                                (
                                                                    {
                                                                        uri,
                                                                        size,
                                                                        type
                                                                    },
                                                                    i
                                                                ) => (
                                                                    <View
                                                                        key={i}
                                                                        className="border-border rounded-md h-60 w-full rounded-md border-border relative"
                                                                    >
                                                                        <View className="absolute top-3 z-20 left-2">
                                                                            <Text
                                                                                onPress={() =>
                                                                                    removeImage(
                                                                                        uri
                                                                                    )
                                                                                }
                                                                                className="text-destructive-2"
                                                                            >
                                                                                <Ionicons
                                                                                    name="trash"
                                                                                    size={
                                                                                        20
                                                                                    }
                                                                                />
                                                                            </Text>
                                                                        </View>
                                                                        <View
                                                                            className={`${layoutStyle} absolute top-0 bottom-0 left-0 right-0 w-full h-full space-y-2 px-2 py-2 z-10`}
                                                                        >
                                                                            <View
                                                                                style={{
                                                                                    backgroundColor:
                                                                                        value.backColor
                                                                                }}
                                                                                className="space-y-1 w-3/5   py-2 px-2 rounded-sm"
                                                                            >
                                                                                <Text
                                                                                    style={{
                                                                                        color: value.frontColor
                                                                                    }}
                                                                                    className="text-primary-2 font-semibold"
                                                                                >
                                                                                    #
                                                                                    {
                                                                                        value.tag
                                                                                    }
                                                                                </Text>
                                                                                <Text
                                                                                    style={{
                                                                                        color: value.frontColor
                                                                                    }}
                                                                                    className="text-4xl upperif font-black text-primary-2"
                                                                                >
                                                                                    {
                                                                                        value.discount
                                                                                    }

                                                                                    %
                                                                                    off
                                                                                </Text>
                                                                                <Text
                                                                                    style={{
                                                                                        color: value.frontColor
                                                                                    }}
                                                                                    className="text-primary-2"
                                                                                >
                                                                                    {
                                                                                        value.desc
                                                                                    }
                                                                                </Text>
                                                                            </View>
                                                                            <Text
                                                                                style={{
                                                                                    backgroundColor:
                                                                                        value.backColor,
                                                                                    color: value.frontColor
                                                                                }}
                                                                                className=" px-2 py-4 rounded-md w-32 items-center text-center text-white font-semibold"
                                                                            >
                                                                                {
                                                                                    value.cta
                                                                                }
                                                                            </Text>
                                                                        </View>
                                                                        <Image
                                                                            className=" w-full h-full rounded-t-md"
                                                                            style={{
                                                                                resizeMode:
                                                                                    "cover"
                                                                            }}
                                                                            source={{
                                                                                uri
                                                                            }}
                                                                        />
                                                                    </View>
                                                                )
                                                            )}
                                                        </View>
                                                    )}
                                                    <View className="flex-row gap-1 flex-wrap relative pb-2">
                                                        {item.images.map(
                                                            (m, i) =>
                                                                i !==
                                                                    imgIdx && (
                                                                    <TouchableWithoutFeedback
                                                                        onPress={() =>
                                                                            setImgIdx(
                                                                                i
                                                                            )
                                                                        }
                                                                    >
                                                                        <Image
                                                                            className="w-14 rounded-md  border-2 h-14"
                                                                            style={{
                                                                                resizeMode:
                                                                                    "cover"
                                                                            }}
                                                                            source={{
                                                                                uri: m
                                                                            }}
                                                                        />
                                                                    </TouchableWithoutFeedback>
                                                                )
                                                        )}
                                                    </View>
                                                </View>
                                            ) : (
                                                <TextInput
                                                    className="w-full text-primary-2 bg-transparent tracking-wider max-h-44 px-2 py-4"
                                                    value={value[f]}
                                                    multiline={f === "desc"}
                                                    onChangeText={text =>
                                                        setValue(prev => ({
                                                            ...prev,
                                                            [f]: text
                                                        }))
                                                    }
                                                    placeholder={`${f}`}
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
                                    ))}

                                    <Text
                                        onPress={
                                            loading ? null : handleHeroUpdate
                                        }
                                        className="py-4 px-2 bg-primary-1 rounded-md text-center font-semibold"
                                    >
                                        Submit
                                    </Text>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </Modal>
    );
};

export default HeroModal;
