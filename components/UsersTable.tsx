import { useState, useEffect } from "react";
import EditModal from "./EditModal";
import BottomMenu from "./BottomMenu";
import Ionicons from "@expo/vector-icons/Ionicons";

import { View, Text, ScrollView, Alert } from "react-native";
import { formatDateTime } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/loading/loadingSlice";
import {
    useUpdateUserMutation,
    useDeleteUserMutation
} from "@/redux/user/userApiSlice";
const UsersTable = ({ days, refetch, isFetching, data }) => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [modal, setModal] = useState(false);
    const [edit, setEdit] = useState(false);

    const [item, setItem] = useState({});

    const [idx, setIdx] = useState(null);
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();
    const buttons = [
        {
            title: "edit user",
            color: "#f8e3b4",
            action: () => {
                setModal(false);
                setEdit(true);
            }
        },
        {
            title: "delete user",
            color: "#f8b4b4",
            action: () => handleDelete()
        }
    ];

    const handleEdit = async (field, value) => {
        dispatch(setLoading());
        console.log(field, value);
        try {
            const vals = {
                userId: idx,
                value: {
                    data: { [field]: value }
                }
            };

         await updateUser(vals);

            setEdit(false);
        } catch (error) {
            console.log("error", error);
        } finally {
            refetch();
            dispatch(setLoading());
        }
    };

    const handleDelete = async () => {
        dispatch(setLoading());
        setModal(false);
        try {
            Alert.alert(
                "Hold on!",
                "Are you sure you want to delete this user?",
                [
                    {
                        text: "Cancel",
                        onPress: () => null,
                        style: "cancel"
                    },
                    {
                        text: "YES",
                        onPress: async () => {
                            await deleteUser(idx);
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
    const userOptions = ["state", "address"];
    useEffect(() => {
        if (data && data !== undefined) {
            const filtered = data.documents.filter(({ $createdAt }) => {
                const date = new Date();
                const userDate = new Date($createdAt);
                const diffMill = date - userDate;
                const trimDay = days.split(" ");
                const res =
                    trimDay[1] === "days"
                        ? diffMill / (1000 * 60 * 60 * 24) <= Number(trimDay[0])
                        : diffMill / (1000 * 60 * 60 * 24 * 30) <=
                          Number(trimDay[0]);
                return res;
            });

            setUsers(filtered);
        }
        return () => [];
    }, [days, data]);

    return (
        <View className="flex-1">
            <View className="flex-row items-center justify-between py-2 px-2 relative">
                <Text
                    onPress={refetch}
                    className=" py-2 font-semibold capitalize text-center"
                >
                    {isFetching ? "fetching" : "reload table"}
                </Text>
            </View>
            <ScrollView className="flex-1" horizontal>
                <View className="space-y-2 bg-white ">
                    <View className="flex-row items-center px-2 space-x-2 buser-b-2 buser-dark-3 ">
                        <Text className="w-7 h-7"></Text>
                        <Text className="w-24">user date</Text>
                        <Text className="w-44">user Id</Text>
                        <Text className="w-56">user name</Text>
                        <Text className="w-56">user email</Text>
                        <Text className="w-24">user country</Text>
                        <Text className="w-24">user state</Text>
                        <Text className="w-24">user address</Text>
                    </View>
                    <ScrollView nestedScrollEnabled>
                        {users.map(
                            ({
                                $createdAt,
                                $id,
                                name,
                                email,
                                address,
                                state,
                                country
                            }) => (
                                <View
                                    key={$id}
                                    className="flex-row items-start py-2 px-2 space-x-2 buser-b buser-dark-3"
                                >
                                    <View
                                        style={{ backgroundColor: "#1eec2735" }}
                                        className="px-2 py-2 items-center justify-center h-fit"
                                    >
                                        <Ionicons
                                            onPress={() => {
                                                setIdx($id);
                                                setModal(true);
                                            }}
                                            name="menu"
                                            size={16}
                                        />
                                    </View>
                                    <Text className="w-24">
                                        {formatDateTime($createdAt).dateOnly}
                                    </Text>
                                    <Text className="w-44">{$id}</Text>
                                    <Text className="font-semibold w-56">
                                        {name}
                                    </Text>
                                    <Text className=" w-56">{email}</Text>
                                    <Text className=" w-24">{country}</Text>
                                    <Text className=" w-24">{state}</Text>
                                    <Text className=" w-24">{address}</Text>
                                </View>
                            )
                        )}
                        <BottomMenu
                            modal={modal}
                            setModal={setModal}
                            buttons={buttons}
                        />
                        <EditModal
                            initialFields={userOptions}
                            modal={edit}
                            item={item}
                            setModal={setEdit}
                            modalName="edit user"
                            action={handleEdit}
                        />
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
};

export default UsersTable;
