import Weather from './components/Weather'
import { Analytics } from "@vercel/analytics/react"

function App() {

  return (
    <div className="relative h-full w-full overflow-y-auto antialiased  ">
      <div className="fixed inset-0 bg-fixed bg-cover bg-img" aria-label="Background image"></div>
      <main className="relative  z-1   items-center justify-center ">
        <div className=" w-full border h-screen pb-0 overflow-hidden p-10 ">
          <Weather />
        </div>
      </main>
    </div>
  )
}

export default App
