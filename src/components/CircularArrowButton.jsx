import React from "react";

// A circular button with a yellow border and red right arrow, matching the screenshot
export default function CircularArrowButton({ onClick, size = 70, style = {}, ...props }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: "4px solid #FFD600",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 16px 2px #FFD60055",
        outline: "none",
        ...style,
      }}
      {...props}
    >
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 108 112" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="54" cy="56" r="52" fill="white" />
        <polygon points="32,24 88,56 32,88" fill="#FF1A1A" />
      </svg>
    </button>
  );
}
