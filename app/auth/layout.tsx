import { AuthLayoutHeader } from "@/components/headers/AuthLayoutHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center bg-[#f4f8fd] transition-colors overflow-hidden">
      {/* Header */}
      <AuthLayoutHeader />

      {/* Wavy SVG background at the bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 w-full pointer-events-none select-none"
        style={{ zIndex: 0 }}
      >
        <svg
          viewBox="0 0 1440 320"
          width="100%"
          height="auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
        >
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7F9CF5" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#A5B4FC" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient)"
            fillOpacity="1"
            d="M0,224L60,202.7C120,181,240,139,360,144C480,149,600,203,720,218.7C840,235,960,213,1080,197.3C1200,181,1320,171,1380,165.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </div>

      <div className="w-full max-w-md px-4">
        {/* auth header */}
        {children}
      </div>
    </main>
  );
}
