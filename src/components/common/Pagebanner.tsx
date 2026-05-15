'use client'

interface PagebannerProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  scrollToTarget?: string; //
}

export default function Pagebanner({
  title,
  subtitle,
  buttonText,
  onButtonClick,
  scrollToTarget,
}: PagebannerProps) {
  return (
    <div
      className="min-h-[20vh] flex flex-col items-center justify-center relative bg-[#F15B40] text-white bg-repeat bg-[length:160px_auto] bg-center shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] py-8 md:py-12"
      style={{
        backgroundImage: `url('/assets/boximg.avif')`,
      }}
    >
      <h1
        className="tracking-wide uppercase relative z-10 text-center px-[5%] py-[20px] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-[-4px]"
        style={{
          fontFamily:
            '"MDNichrome", "Arial Black", "Helvetica Black", sans-serif',
          textShadow: "3px 3px 0px rgba(137, 66, 6, 0.4)",
          letterSpacing: "0px"
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <h2 className="text-xl md:text-2xl lg:text-3xl text-center mb-8 text-white max-w-4xl mx-auto px-4">
          {subtitle}
        </h2>
      )}

      {buttonText && (
        <button
          onClick={() => {
            if (scrollToTarget) {
              const targetElement = document.querySelector(scrollToTarget);
              if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
              }
            }
            if (onButtonClick) {
              onButtonClick();
            }
          }}
          className="bg-yellow-400 hover:bg-white text-[#653003] font-bold py-3 px-4 md:px-6 rounded-lg transition-colors duration-200 text-sm md:text-lg mx-4"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}
