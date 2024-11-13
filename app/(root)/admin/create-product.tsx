import FormInput from "@/components/FormInput";

import { useState } from "react";
import { View, Text, Image, } from "react-native";
import { productInitial } from "@/lib/initial";
import { setLoading, selectCurrentLoading } from "@/redux/loading/loadingSlice";
import { productForm } from "@/lib/form";
import { productSchema } from "@/lib/schema";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    useAddNewProductMutation,

} from "@/redux/product/productApiSlice";

import { useDispatch, useSelector } from "react-redux";

import Toast from "react-native-simple-toast";
import UUID from "react-native-uuid";
const CreateProduct = () => {
    const dispatch = useDispatch();
    const loading = useSelector(selectCurrentLoading);
    const [files, setFiles] = useState([]);
    const [addNewProduct] = useAddNewProductMutation();
  
   
    const onSubmit = async value => {
        dispatch(setLoading());

        const uniqueID = UUID.v4();
        const cloudName = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUDENAME;
        const apiKey = process.env.EXPO_PUBLIC_CLOUDINARY_API_KEY;
        const uploadPreset = "tlccrm";
        const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

        try {
            const imageUploadPromises = files.map(
                async ({ uri, size, name, type }) => {
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
                }
            );

            // Resolve all upload promises
            const imagesUrl = await Promise.all(imageUploadPromises);
            if (!imagesUrl?.length) {
                Toast.show(
                    "please select at least one product image. Three is recommended"
                );
                return;
            }
            const newData = {
                ...value,
                images: imagesUrl.filter(url => url !== null)
            };

            const product = await addNewProduct({
                documentId: uniqueID,
                data: newData
            });
            console.log("imagesUrl", product);
        } catch (error) {
            console.error("Error uploading images:", error);
        } finally {
            dispatch(setLoading());
        }
    };

    return (
        <View className="items-center justify-center  bg-black relative">
            <Image
                className="object-center h-full w-full opacity-40"
                style={{ resizeMode: "cover" }}
                source={require("@/assets/images/ts10.jpg")}
            />

            <View className="absolute h-full w-full ">
                <SafeAreaView className="flex-1 items-center">
                    <Image
                        className="object-center h-10 w-10 rounded-full"
                        style={{ resizeMode: "cover" }}
                        source={require("@/assets/icons/Logo.png")}
                    />
                    <Text className="text-white text-3xl font-semibold px-2 py-4">
                        Create a Product
                    </Text>

                    <FormInput
                        from="create-product"
                        loading={loading}
                        list={productForm}
                        schema={productSchema}
                        initial={productInitial}
                        action={onSubmit}
                        layoutClass=""
                        files={files}
                        setFiles={setFiles}
                        button="create product"
                    />
                </SafeAreaView>
            </View>
        </View>
    );
};

export default CreateProduct;
