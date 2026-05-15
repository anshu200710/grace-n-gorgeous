import logo from "@/assets/logo.jpg";

export function Logo({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <img
      src={logo}
      alt="Grace n Gorgeous"
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={`object-contain mix-blend-multiply ${className}`}
    />
  );
}
