import React, { useState } from "react";
import { requestOTP } from "@services/api";
import { Button } from "./ui/button";

const OTPForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleOTPRequest = async () => {
    try {
      const response = await requestOTP(email);
      setMessage(response.message);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h1>Request New OTP</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="p-2 border border-gray-300 rounded mb-2"
      />
      <Button onClick={handleOTPRequest}>Request OTP</Button>
      {message && <p className="text-green-500 mt-2">{message}</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default OTPForm;
