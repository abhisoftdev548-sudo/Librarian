import { useEffect } from "react"
import Auth from "./feature/Auth/Auth.tsx"
import Lenis from "lenis"
const App: React.FC = () => {
  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,   // Scroll kitna lamba chalega
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smoothness curve
      smoothWheel: true,
    })

    // 2. Use the Request Animation Frame (RAF) to update Lenis
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup function to avoid memory leaks
    return () => {
      lenis.destroy()
    }
  }, [])
  return (
    <div className="w-full min-h-screen bg-brand-bg  text-brand-text overflow-x-hidden">
      <Auth/>
    </div>
  )
}

export default App
