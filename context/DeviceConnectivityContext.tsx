import useNetworkConnection from "@/hooks/useNetworkConnection";
import { createContext, useContext, useState } from "react";

type DeviceConnectivityContextType = {
  isDeviceConnected: boolean;
  setIsDeviceConnected: React.Dispatch<React.SetStateAction<boolean>>;
  ipAddress: string | null;
  getIPAddress: () => Promise<void>;
  deviceName: string;
} | null;

export const DeviceConnectivityContext =
  createContext<DeviceConnectivityContextType>(null);

function getDeviceName() {
  return "IOT-001";
}

export function DeviceConnectivityContextProvider({
  children,
}: React.PropsWithChildren) {
  const [isDeviceConnected, setIsDeviceConnected] = useState(false);
  const { IPAddress, getIPAddress } = useNetworkConnection();
  const deviceName = getDeviceName();

  return (
    <DeviceConnectivityContext.Provider
      value={{
        isDeviceConnected,
        setIsDeviceConnected,
        ipAddress: IPAddress,
        getIPAddress,
        deviceName,
      }}
    >
      {children}
    </DeviceConnectivityContext.Provider>
  );
}
