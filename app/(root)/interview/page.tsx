import { getCurrentUser } from '@/actions/auth.action'
import Agent from '@/components/Agent'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async() => {
  const user =await getCurrentUser();
  
  if(!user){
    redirect('/sign-in')
  }
  return (
    <>
    <div>Interview page </div>
    <Agent userName={user?.name} userId={user?.id} type='generate'></Agent>
    </>
  )
}

export default page