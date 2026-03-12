import { cn } from "@/lib/utils";

type PixelFrameProps = {
  className?: string;
  variant?: "capsule" | "panel";
};

function PixelFrame({ className, variant = "capsule" }: PixelFrameProps) {
  const prefix = variant === "capsule" ? "pixel-capsule" : "pixel-panel";

  return (
    <span aria-hidden="true" className={cn(`${prefix}-frame`, className)}>
      <span className={`${prefix}-segment ${prefix}-top`} />
      <span className={`${prefix}-segment ${prefix}-bottom`} />
      <span className={`${prefix}-segment ${prefix}-left`} />
      <span className={`${prefix}-segment ${prefix}-right`} />
      <span className={`${prefix}-segment ${prefix}-corner-top-left`} />
      <span className={`${prefix}-segment ${prefix}-corner-top-right`} />
      <span className={`${prefix}-segment ${prefix}-corner-bottom-left`} />
      <span className={`${prefix}-segment ${prefix}-corner-bottom-right`} />
      <span className={`${prefix}-segment ${prefix}-corner-left-top`} />
      <span className={`${prefix}-segment ${prefix}-corner-right-top`} />
      <span className={`${prefix}-segment ${prefix}-corner-left-bottom`} />
      <span className={`${prefix}-segment ${prefix}-corner-right-bottom`} />
      <span className={`${prefix}-segment ${prefix}-notch-top-left`} />
      <span className={`${prefix}-segment ${prefix}-notch-top-right`} />
      <span className={`${prefix}-segment ${prefix}-notch-bottom-left`} />
      <span className={`${prefix}-segment ${prefix}-notch-bottom-right`} />
    </span>
  );
}

export { PixelFrame };
