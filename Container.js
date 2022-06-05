import { View } from "native-base";
import React from "react";
import { Homepage, ListDebt, ListPaid } from "./src/screens";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();


const Container = () => {
  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Tambah Hutang" component={Homepage} />
      <Tab.Screen name="Daftar Hutang" component={ListDebt} />
      <Tab.Screen name="Daftar Lunas" component={ListPaid} />
    </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Container;
