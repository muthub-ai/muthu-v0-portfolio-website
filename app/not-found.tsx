"use client"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-8">
      <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center mb-6">
        <span className="text-4xl">🔍</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
      <p className="text-zinc-400 mb-6">Sorry, the page you are looking for does not exist.</p>
      <a href="/" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-2 rounded-md font-semibold">
        Go Home
      </a>
    </div>
  )
}
