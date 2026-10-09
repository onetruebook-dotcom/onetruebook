type LogoProps = {
  variant?: "light" | "dark";
  className?: string;
};

export function Logo({ variant = "light", className = "" }: LogoProps) {
  const src = variant === "dark" ? "/brand/logo-dark.svg" : "/brand/logo-user.svg";

  return (
    <img
      src={src}
      alt="One True Book"
      width={799}
      height={158}
      className={`block h-8 w-auto select-none sm:h-10 ${className}`}
    />
  );
}
