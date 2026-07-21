import React, { useEffect, useRef } from "react";

interface AdSenseProps {
  className?: string;
  slot?: string;
  format?: string;
  responsive?: string;
}

export function AdSense({
  className = "",
  slot = "7437812165", // standard default display ad slot
  format = "auto",
  responsive = "true"
}: AdSenseProps) {
  const initialized = useRef(false);

  useEffect(() => {
    // Avoid double initialization in strict mode or hot reload
    if (initialized.current) return;
    initialized.current = true;

    try {
      // Ensure the adsbygoogle array is available and push empty config to trigger the ad render
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense initialization error:", e);
    }
  }, []);

  return (
    <div className={`w-full flex flex-col items-center justify-center my-6 gap-1 ${className}`}>
      <span className="text-[9px] font-mono tracking-widest text-zinc-700 uppercase">
        ADVERTISEMENT
      </span>
      <div 
        id="google-adsense-container"
        className="w-full max-w-lg min-h-[100px] flex items-center justify-center bg-black/35 rounded-xl overflow-hidden border border-zinc-900/60 p-2 shadow-inner shadow-black/80"
      >
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", minHeight: "90px" }}
          data-ad-client="ca-pub-8139972839007359"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive}
        />
      </div>
    </div>
  );
}
