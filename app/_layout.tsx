import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "@/redux/store";
import { Provider } from 'react-redux';

export default function RootLayout() {
  return <SafeAreaProvider>
    <Provider store={store}>
      <Stack screenOptions={{headerStyle: {backgroundColor: 'white'}}}>
        <Stack.Screen name="index" options={{title: "Dashboard", headerShadowVisible: false}}/>
        <Stack.Screen name="TaskList" options={{title: "Task List", headerShadowVisible: false}}/>
        <Stack.Screen name="AddTask" options={{title: "Add Task", headerShadowVisible: false}}/>
      </Stack>
    </Provider>
  </SafeAreaProvider>;
}
