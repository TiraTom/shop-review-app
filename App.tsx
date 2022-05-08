import React, { useEffect, useState } from "react";
import { UserContext } from "./src/contexts/userContext";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { User } from "./src/types/auth/user";

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AppNavigator />
    </UserContext.Provider>
  );
}
