import { useEffect, useRef } from "react";

interface SplineSceneProps {
  url: string;
  className?: string;
}

const SplineScene = ({ url, className = "" }: SplineSceneProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Load Spline runtime
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@splinetool/runtime@1.0.6/build/runtime.js";
    document.body.appendChild(script);

    script.onload = () => {
      // @ts-ignore - Spline runtime will be available globally
      if (window.SPLINE) {
        // @ts-ignore
        const spline = new window.SPLINE.Application(canvasRef.current);
        spline.load(url);
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`w-full h-full ${className}`}
      style={{ display: 'block' }}
    />
  );
};

export default SplineScene;
