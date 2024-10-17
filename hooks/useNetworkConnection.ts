import { useState } from "react";
import { getIpAddressAsync, isAirplaneModeEnabledAsync } from "expo-network";

export default function useNetworkConnection() {
  const [IPAddress, setIPAddress] = useState<string | null>(null);

  const getIPAddress = async () => {
    const ip = await getIpAddressAsync();
    setIPAddress(ip);
  };

  return { IPAddress, getIPAddress };
}
