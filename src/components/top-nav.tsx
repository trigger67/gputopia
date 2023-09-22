"use client"

import { useEffect } from "react"
import { MainNav } from "@/components/main-nav"
import { PusherConnector } from "@/components/pusher-connector"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"
import { startAlbyOauth } from "@/lib/alby-oauth"
import { useStore } from "@/lib/store"
import { useAlby } from "@/lib/useAlby"

export const TopNav = () => {
  const { authed, logout, user } = useAlby()
  const onlineMembers = useStore((state) => state.onlineMembers)
  useEffect(() => {
    console.log(onlineMembers)
  }, [onlineMembers])
  return (
    <>
      {authed && <PusherConnector />}
      <div className="border-b fixed top-0 left-0 right-0 z-50 backdrop-blur bg-background/80">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            {user ? <UserNav user={user} logout={logout} /> : <Button variant="outline" onClick={startAlbyOauth}>Log in with Alby</Button>}
          </div>
        </div>
      </div>
    </>
  )
}
