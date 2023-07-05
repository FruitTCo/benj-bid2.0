import React from "react";

const MaskedString = ({ originalString }) => {
  const visibleChars = 4; // Number of characters to keep visible

  // Create the masked string
  const maskedString =
    originalString.substring(0, visibleChars) +
    "*".repeat(originalString.length - visibleChars * 2) +
    originalString.substring(originalString.length - visibleChars);

  return <small style={{ fontSize: 12, opacity: 0.6 }}>User {maskedString}</small>;
};

export default MaskedString;
