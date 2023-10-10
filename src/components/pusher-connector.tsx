import Pusher, * as PusherTypes from 'pusher-js'
import { useEffect, useState } from 'react'
import { processJob } from '@/lib/processJob'
import { useStore } from '@/lib/store'
import { generate } from '@/lib/webllm'
import { kv } from '@vercel/kv'
import { signOut, useSession } from 'next-auth/react'
import { useAlby } from '@/lib/useAlby'

export const PusherConnector = () => {
  useAlby()

  const { data: session, status } = useSession()
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    let userId = session?.user?.user_id
    if (!userId) {
      signOut()
      alert('Error. Please log in again.')
    } else {
      setUserId(userId)
    }
  }, [session?.user?.user_id])

  useEffect(() => {
    if (!userId || userId === null) return
    const pusher = new Pusher('e12c6b8ab6c32132e3bf', {
      cluster: 'mt1'
    })

    const presenceChannel = pusher.subscribe('presence-common_room')
    presenceChannel.bind('pusher:subscription_succeeded', (members: PusherTypes.Members) => {
      useStore.getState().setCount(members.count)
    })
    presenceChannel.bind('pusher:member_added', (member: any) => {
      useStore.getState().increment()
      // console.log('Member added:', member)
    })
    presenceChannel.bind('pusher:member_removed', (member: any) => {
      // console.log('Member removed:', member)
      useStore.getState().decrement()
    })

    // Subscribe to user-specific channel if userId is available
    if (userId) {
      const userChannel = pusher.subscribe(`private-user-${userId}`) // should be userId
      userChannel.bind('JobAssigned', async (data: any) => {
        return await generate(data.job)
      })
    }

    // Listen for "new job" event
    window.jobChannel = pusher.subscribe('private-v3jobs')
    window.jobChannel.bind('new-job', processJob)

    window.jobChannel.bind(`client-job-${userId}`, data => {
      // console.log(data.message);
      useStore.setState({ lastMessage: data.message })
    })

    window.pusher = pusher
  }, [userId])

  return null
}
