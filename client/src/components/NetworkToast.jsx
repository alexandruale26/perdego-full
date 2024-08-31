import { useEffect } from "react";
import { toast } from "sonner";
import { Toaster } from "./ui/Sonner";
import { WifiOff, Wifi } from "lucide-react";

// TODO: move <Toaster> to App

function NetworkToast() {
  useEffect(() => {
    const handleOnline = () => {
      toast.dismiss("offline-toast");

      toast(
        <div className="w-full flex flex-col justify-center items-center gap-2 text-center">
          <Wifi className="text-green-400" />
          <p className="text-base font-medium">Conexiune restabilitǎ</p>
          <p className="text-grey-5">Acum ești online!</p>
        </div>,
        {
          duration: 5000,
        },
      );
    };

    const handleOffline = () => {
      toast(
        <div className="w-full flex flex-col justify-center items-center gap-2 text-center">
          <WifiOff />
          <p className="text-base font-medium">Conexiune întreruptǎ</p>
          <p className="text-grey-5">Se încearcǎ restabilirea conexiunii...</p>
        </div>,
        {
          id: "offline-toast",
          duration: Infinity,
        },
      );
    };

    if (!navigator.onLine) {
      handleOffline();
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return <Toaster position="bottom-right" visibleToasts={1} />;
}
NetworkToast.displayName = "NetworkToast";

export default NetworkToast;
