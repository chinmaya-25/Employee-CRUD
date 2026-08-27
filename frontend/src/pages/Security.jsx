import { useState } from "react";
import axios from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";
import toast from "react-hot-toast";

export default function Security() {
  const [qrCode, setQrCode] = useState(null);

  const [token, setToken] = useState("");

  const handleSetup = async () => {
    try {
      const { data } = await axios.post("/auth/mfa/setup");

      setQrCode(data.qrCode);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEnable = async () => {
    try {
      await axios.post("/auth/mfa/enable", {
        token,
      });

      toast.success("MFA Enabled");
    } catch (error) {
      toast.error("Invalid OTP");
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h1 className="text-2xl font-bold">Security</h1>

        <button
          onClick={handleSetup}
          className="
            mt-4
            bg-blue-600
            text-white
            px-5
            py-3
            rounded-xl
          "
        >
          Enable MFA
        </button>

        {qrCode && (
          <div className="mt-6">
            <img src={qrCode} alt="MFA QR Code" className="w-64 h-64 mx-auto" />

            <input
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter OTP"
              className="
                border
                rounded-xl
                px-4
                py-3
                block
                mt-4
              "
            />

            <button
              onClick={handleEnable}
              className="
                mt-4
                bg-green-600
                text-white
                px-4
                py-2
                rounded-lg
              "
            >
              Verify & Enable
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
