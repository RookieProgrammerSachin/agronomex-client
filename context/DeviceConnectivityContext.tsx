import { createContext, useContext, useState } from "react";

type DeviceConnectivityContextType = {
  isDeviceConnected: boolean;
  setIsDeviceConnected: React.Dispatch<React.SetStateAction<boolean>>;
} | null;

const DeviceConnectivityContext =
  createContext<DeviceConnectivityContextType>(null);

export function useDeviceConnectivityContext() {
  return useContext(DeviceConnectivityContext);
}

export function DeviceConnectivityContextProvider({
  children,
}: React.PropsWithChildren) {
  const [isDeviceConnected, setIsDeviceConnected] = useState(false);

  return (
    <DeviceConnectivityContext.Provider
      value={{
        isDeviceConnected,
        setIsDeviceConnected,
      }}
    >
      {children}
    </DeviceConnectivityContext.Provider>
  );
}
