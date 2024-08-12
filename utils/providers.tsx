'use client'
import { ThemeProvider } from "@/app/theme-provider";
import { Toaster } from "@/components/ui/toaster"


function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster/>
    </ThemeProvider>
  );


}

export default Providers