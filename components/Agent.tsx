import { cn } from '@/lib/utils';
import Image from 'next/image'
import React from 'react'
enum CallStatus{
    INACTIVE='INACTIVE',
    ACTIVE='ACTIVE',
    CONNECTING='CONNECTING',
    FINISHED='FINISHED'
}
const Agent = ({userName,userId,type}:AgentProps) => {
    const isSpeaking=true;
    const callStatus=CallStatus.INACTIVE;
    const messages=['whats your name?' , 'My name is john Doe , nice to meet you!']

    const lastMessages=messages[messages.length-1]
  return (
<>
    <div className='call-view'>
        <div className='card-interviewer'>
            <div className='avatar'>
                <Image src="/ai-avatar.png" alt="vapi" width={65} height={65} className='object-cover'>
                </Image>    
                {isSpeaking &&<span className='animate-speak'></span>}
            </div>

            <h3>AI Interview</h3>
        </div>
        <div className='card-border'>
            <div className='card-content'>
                <Image src='/user-avatar.png' alt="user avatar" width={540} height={540 }
                className='rouded-full object-cover size-[120px]'></Image>
                <h3>{userName}</h3>
            </div>

        </div>
    </div>

    {messages.length>0 &&(
        <div className='transcript-border'>
            <div className='transcript'>
                <p key={lastMessages} className={cn('transition-opacity duration-500 opacity-0 ', 'animate-fadeIn opacity-500')}>
                    {lastMessages}
                </p>

            </div>
        </div>
    )}
    <div className='w-full flex justify-center'>
        {callStatus !=='ACTIVE' ? (
            <button className='relative btn-call'><span className={cn('absolute animate-spin rounded-4 opacity-75',
                callStatus!=='CONNECTING' && 'hidden'
            )}>
                
            </span>
            <span>{callStatus==='INACTIVE' ||callStatus==='FINISHED'  ?'CALL' :'....'}</span>
           
            </button>
        ):(
            <button className='btn-disconnect'>
                End
            </button>
        )}

    </div>
    </>
  )
}

export default Agent