'use client'

import { BackgroundImage } from '@/components/background-image'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session, status } = useSession()

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col flex-grow justify-center">
        <BackgroundImage />
        <div className="-mt-16 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <p>Session status : </p>
            <p>{status}</p>
            <p>{JSON.stringify(session)}</p>
            <div className="my-8 flex justify-center">
              <a href="/blog/opening">
                <div className="tracking-wider shentox relative rounded-full px-3 py-1 text-md leading-6 text-gray-400 hover:text-white ring-1 ring-white/10">
                  READ: Opening AI
                </div>
              </a>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-white">
                Your GPU Marketplace
              </h1>
              <p className="mt-6 mb-12 text-lg leading-8" style={{ color: '#d3d3d3' }}>
                The easiest way to buy and sell GPU capacity. Coming soon.
              </p>
              <a
                href="/beta"
                className="tracking-wider font-medium big-green-button rounded-xl px-5 py-4 text-lg text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                Join the Beta
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
