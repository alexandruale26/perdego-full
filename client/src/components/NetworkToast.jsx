import { useEffect } from "react";
import { toast } from "sonner";
import { Toaster } from "./ui/Sonner";
import { WifiOff, Wifi } from "lucide-react";

function NetworkToast() {
  useEffect(() => {
    const handleOnline = () => {
      toast.dismiss("network-toast");
      toast(<OnlineToast />, {
        duration: 5000,
        onDismiss: () => toast.dismiss(),
      });
    };

    const handleOffline = () => {
      toast(<OfflineToast />, { id: "network-toast", duration: Infinity });
    };

    if (!navigator.onLine) handleOffline();

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
  }, []);

  return <Toaster position="bottom-right" visibleToasts={1} />;
}
NetworkToast.displayName = "NetworkToast";

export default NetworkToast;

const OnlineToast = () => (
  <div className="w-full flex flex-col justify-center items-center gap-2 text-center">
    <Wifi className="text-green-400" />
    <p className="text-base font-medium">Conexiune restabilitǎ</p>
    <p className="text-grey-5">Acum ești online!</p>
  </div>
);

const OfflineToast = () => (
  <div className="w-full flex flex-col justify-center items-center gap-2 text-center">
    <WifiOff />
    <p className="text-base font-medium">Conexiune întreruptǎ</p>
    <p className="text-grey-5">Verificǎ conexiunea la internet</p>
  </div>
);
