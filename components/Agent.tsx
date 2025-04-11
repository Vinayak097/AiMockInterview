import Image from 'next/image'
import React from 'react'

const Agent = ({userName,userId,type}:AgentProps) => {
    const isSpeaking=true;
  return (

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
  )
}

export default Agent