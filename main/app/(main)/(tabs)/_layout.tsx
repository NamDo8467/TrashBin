import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const CustomLeafButton = ({ color }) => {
  const router = useRouter();
  return (
    <TouchableOpacity style={styles.leafButtonContainer} onPress={() => router.push('/camera')}>
      <View style={styles.leafButtonCircle}>
        <FontAwesome name="leaf" size={28} color={color} />
      </View>
    </TouchableOpacity>
  );
};
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#006ee6",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          paddingTop: 12,
        },
        tabBarItemStyle: {
          height: 50,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          tabBarIcon: ({ color }) => <CustomLeafButton color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome color={color} size={25} name='user' />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  leafButtonContainer: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  leafButtonCircle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});
