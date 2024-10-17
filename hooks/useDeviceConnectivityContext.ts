import { DeviceConnectivityContext } from "@/context/DeviceConnectivityContext";
import { useContext } from "react";

export function useDeviceConnectivityContext() {
  return useContext(DeviceConnectivityContext);
}
