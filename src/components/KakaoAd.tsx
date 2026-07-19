import React, { useEffect } from "react";

export function KakaoAd() {
  useEffect(() => {
    // Dynamically insert the Kakao AdFit script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//t1.kakaocdn.net/kas/static/ba.min.js";
    script.async = true;
    
    // Append script to document body so it executes and populates the ins tag
    document.body.appendChild(script);

    return () => {
      // Clean up script on unmount to prevent multiple duplicate loads
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center my-6 gap-1">
      {/* Subtle Advertisement indicator to align with clean design aesthetics */}
      <span className="text-[9px] font-mono tracking-widest text-zinc-700 uppercase">
        ADVERTISEMENT
      </span>
      <div 
        id="kakao-adfit-container"
        className="flex items-center justify-center min-h-[50px] bg-black/10 rounded-lg overflow-hidden border border-zinc-900/40 p-1"
        style={{ width: "320px", height: "50px" }}
      >
        <ins
          className="kakao_ad_area"
          style={{ display: "none" }}
          data-ad-unit="DAN-FKuF3q16OUIlRJMh"
          data-ad-width="320"
          data-ad-height="50"
        />
      </div>
    </div>
  );
}
