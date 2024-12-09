import { View, Text } from "react-native";
import React from "react";
import { AntDesign, Octicons } from "@expo/vector-icons";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function PastReports() {
  return (
    <View className="mt-5">
      <Text className="text-lg font-bold text-gray-700">Past Reports</Text>

      {/* REPORTS */}
      <View className="mt-2.5">
        <View className="bg-indigo-100 rounded-lg p-5 mb-2.5 flex flex-col">
          <View className="flex-row justify-between">
            <Text className="text-gray-500 text-base">16:15</Text>
            <Text className="text-gray-500 text-base">04 Sep, 2024</Text>
          </View>
          <View className="flex-row justify-between mt-2.5">
            <Text className="text-black text-base font-semibold">
              Kamla Nagar, Delhi
            </Text>
            <View style={{ position: "absolute", right: 0, top: 0 }}>
              <Octicons name="circle" size={hp(2.7)} color="#C70039" />
            </View>
          </View>
        </View>
        <View className="bg-indigo-100 rounded-lg p-5 mb-2.5 flex flex-col">
          <View className="flex-row justify-between">
            <Text className="text-gray-500 text-base">15:00</Text>
            <Text className="text-gray-500 text-base">02 Sep, 2024</Text>
          </View>
          <View className="flex-row justify-between mt-2.5">
            <Text className="text-black text-base font-semibold">
              Rajouri Garden, Delhi
            </Text>
            <View style={{ position: "absolute", right: 0, top: 0 }}>
              <Octicons name="circle" size={hp(2.7)} color="#C70039" />
            </View>
          </View>
        </View>
        <View className="bg-indigo-100 rounded-lg p-5 mb-2.5 flex flex-col">
          <View className="flex-row justify-between">
            <Text className="text-gray-500 text-base">13:45</Text>
            <Text className="text-gray-500 text-base">31 Aug, 2024</Text>
          </View>
          <View className="flex-row justify-between mt-2.5">
            <Text className="text-black text-base font-semibold">
              Tilak Nagar, Delhi
            </Text>
            <View style={{ position: "absolute", right: 0, top: 0 }}>
              <AntDesign name="checkcircle" size={hp(2.7)} color="green" />
            </View>
          </View>
        </View>
        {/* Additional Reports */}
        <View className="bg-indigo-100 rounded-lg p-5 mb-2.5 flex flex-col">
          <View className="flex-row justify-between">
            <Text className="text-gray-500 text-base">12:30</Text>
            <Text className="text-gray-500 text-base">29 Aug, 2024</Text>
          </View>
          <View className="flex-row justify-between mt-2.5">
            <Text className="text-black text-base font-semibold">
              Kamla Nagar, Delhi
            </Text>
            <View style={{ position: "absolute", right: 0, top: 0 }}>
              <AntDesign name="checkcircle" size={hp(2.7)} color="green" />
            </View>
          </View>
        </View>
        <View className="bg-indigo-100 rounded-lg p-5 mb-2.5 flex flex-col">
          <View className="flex-row justify-between">
            <Text className="text-gray-500 text-base">11:15</Text>
            <Text className="text-gray-500 text-base">27 Aug, 2024</Text>
          </View>
          <View className="flex-row justify-between mt-2.5">
            <Text className="text-black text-base font-semibold">
              Rajouri Garden, Delhi
            </Text>
            <View style={{ position: "absolute", right: 0, top: 0 }}>
              <AntDesign name="checkcircle" size={hp(2.7)} color="green" />
            </View>
          </View>
        </View>
        <View className="bg-indigo-100 rounded-lg p-5 mb-2.5 flex flex-col">
          <View className="flex-row justify-between">
            <Text className="text-gray-500 text-base">10:45</Text>
            <Text className="text-gray-500 text-base">25 Aug, 2024</Text>
          </View>
          <View className="flex-row justify-between mt-2.5">
            <Text className="text-black text-base font-semibold">
              Tilak Nagar, Delhi
            </Text>
            <View style={{ position: "absolute", right: 0, top: 0 }}>
              <Octicons name="circle" size={hp(2.7)} color="#C70039" />
            </View>
          </View>
        </View>
        {/* Additional Reports */}
        <View className="bg-indigo-100 rounded-lg p-5 mb-2.5 flex flex-col">
          <View className="flex-row justify-between">
            <Text className="text-gray-500 text-base">14:30</Text>
            <Text className="text-gray-500 text-base">20 Aug, 2024</Text>
          </View>
          <View className="flex-row justify-between mt-2.5">
            <Text className="text-black text-base font-semibold">
              Kamla Nagar, Delhi
            </Text>
            <View style={{ position: "absolute", right: 0, top: 0 }}>
              <AntDesign name="checkcircle" size={hp(2.7)} color="green" />
            </View>
          </View>
        </View>
        <View className="bg-indigo-100 rounded-lg p-5 mb-2.5 flex flex-col">
          <View className="flex-row justify-between">
            <Text className="text-gray-500 text-base">17:54</Text>
            <Text className="text-gray-500 text-base">17 Aug, 2024</Text>
          </View>
          <View className="flex-row justify-between mt-2.5">
            <Text className="text-black text-base font-semibold">
              Rajouri Garden, Delhi
            </Text>
            <View style={{ position: "absolute", right: 0, top: 0 }}>
              <AntDesign name="checkcircle" size={hp(2.7)} color="green" />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
