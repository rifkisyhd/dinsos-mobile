// index.js
import { Redirect } from "expo-router";

// export default function App() {
//   return <HomeScreen />;
// }

export default function App() {
  return <Redirect href={"/(tabs)/home"} />;
}