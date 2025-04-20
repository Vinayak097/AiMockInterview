import { getCurrentUser } from '@/actions/auth.action';
import { getInterviewById, getInterviewByuserId } from '@/actions/genera.action';
import Agent from '@/components/Agent';
import TechIcons from '@/components/TechIcons';
import { getRandomInterviewCover } from '@/lib/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async({params}:RouteParams) => {
  
  const user=await getCurrentUser()
    const {id}= await params;
    const interview=await getInterviewById(id);
    if(!interview){
        redirect('/')
    }
  return (
    <>
    <div className='flex flex-row gap-4 justify-between '>
        <div className='flex flex-row gap-4 items-center'>
          <div className='flex flex-row items-center gap-4'>
            <Image src={getRandomInterviewCover()} alt='cover image' width={40} height={40} 
            className='rounded-full object-cover size-[40px]'></Image>
            <h3 className='capitalize'>{interview.role}</h3>
          </div>
          <TechIcons techStack={interview.techstack}></TechIcons>
        </div>
        <p className='bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize'>{interview.type}</p>
    </div>
    <Agent userName={user.name} userId={user?.id} type={interview.type}></Agent>
    </>
    
  )
}

export default page