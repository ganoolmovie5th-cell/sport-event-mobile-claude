import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { darkTheme, lightTheme } from '../constants/colors';
import { useAppStore } from '../store/appStore';
import { HomeScreen } from '../screens/HomeScreen';
import { EventsScreen } from '../screens/EventsScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { CalendarScreen } from '../screens/CalendarScreen';
import { MoreScreen } from '../screens/MoreScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  const { theme } = useAppStore();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.tabBarBorder,
          borderTopWidth: 1,
          paddingBottom: Platform.OS === 'ios' ? 6 : 8,
          paddingTop: 8,
          height: 66,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.06,
              shadowRadius: 12,
            },
            android: { elevation: 8 },
          }),
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tab.Screen
        name="Beranda"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={focused ? 24 : 22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Event"
        component={EventsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'trophy' : 'trophy-outline'} size={focused ? 24 : 22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Kalender"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'calendar' : 'calendar-outline'} size={focused ? 24 : 22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Lainnya"
        component={MoreScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'settings' : 'settings-outline'} size={focused ? 24 : 22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const { theme } = useAppStore();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: '700', fontSize: 17 },
          contentStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="Main"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: 'Detail Event' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
