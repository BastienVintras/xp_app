import { Button } from '@/components/ui/button'
import React from 'react'
import {signIn} from 'next-auth/react'

export default function ButtonProvider() {
  return (
    <div className='flex flex-col space-y-4'>
        <Button onClick={() => signIn('google')}>Continuer avec Google</Button>
        <Button onClick={() => signIn('github')}>Continuer avec GitHub</Button>

    </div>
  )
}
