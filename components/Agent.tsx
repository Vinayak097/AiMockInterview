'use client'
import { cn } from '@/lib/utils';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Vapi from "@vapi-ai/web";
import { useRouter } from 'next/navigation';
import { vapi } from '@/lib/vapi.sdk';
import { interviewer } from '@/constants';
import { createFeedback } from '@/actions/genera.action';

enum CallStatus{
    INACTIVE='INACTIVE',
    ACTIVE='ACTIVE',
    CONNECTING='CONNECTING',
    FINISHED='FINISHED'
}
interface SavedMessages{
    role:'user'|'system'|'assistant',
    content:string
}
const Agent = ({userName,userId,type,questions,interviewId}:AgentProps) => {
    const router=useRouter()
    console.log(interviewId ,  'agenet int4eview id ');
    
    const [isSpeaking,setisSpeaking]=React.useState(false)  
    const [callStatus, setCallstatus]=useState(CallStatus.INACTIVE)
    const [messages,setMessages]=useState<SavedMessages[]>([])
    
    useEffect(()=>{
        const oncallStart=()=>setCallstatus(CallStatus.ACTIVE)
        const oncallEnd=()=>setCallstatus(CallStatus.INACTIVE);

        const onMessage=(message:Message)=>{
            if(message.type=='transcript' && message.transcriptType=='final'){
                const newMessage={role:message.role,content:message.transcript}
                setMessages((prev)=>[...prev,newMessage])
            }
        }

        const onSpeechStart=()=>setisSpeaking(true)
        const onSpeechEnd=()=>setisSpeaking(false)
        const onError=(e:Error)=>console.log(e, 'error in agenet')

        vapi.on('call-start',oncallStart)
        vapi.on('call-end' , oncallEnd)
        vapi.on('message' , onMessage)
        vapi.on('speech-start',onSpeechStart)
        vapi.on('speech-end',onSpeechEnd)
        vapi.on('error',onError)    

        return   ()=>{
            vapi.off('call-start',oncallStart)
            vapi.off('call-end' , oncallEnd)
            vapi.off('message' , onMessage)
            vapi.off('speech-start',onSpeechStart)
            vapi.off('speech-end',onSpeechEnd)
            vapi.off('error',onError)
        }
    },[])
    const handleGenerateFeedback= async (message:SavedMessages[])=>{
        if (!interviewId || !userId) {
            console.error('Missing interviewId or userId');
            router.push('/');
            return;
        }
        console.log('Generate feedback here');
        const {success ,feedbackId:id }=await createFeedback({
            interviewId:interviewId,
            userId:userId,
            transcript:message,
            
        }   )
        if(success && id ){
            router.push(`/interview/${interviewId}/feedback`)
        }else{
            console.log('Error saving feedback')
            router.push('/')
        }

    }
    useEffect(()=>{
        if(callStatus===CallStatus.FINISHED){
            if(type=='generate'){
                router.push('/')
            }else{
                handleGenerateFeedback(messages)
            }
        }
        if(callStatus===CallStatus.FINISHED){
            router.push('/')
        }
    },[messages,callStatus,userId,type])

    const handleCall= async ()=>{
        console.log('caling');
        setCallstatus(CallStatus.CONNECTING)
        
        try{
            if(type=='generate'){
                await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!,{variableValues :{
                    userid:userId,
                    userName
                }})
            
            }else{
                let formattedquestions=['']
                if(questions){
                    formattedquestions=questions
                    .map((question=>`- ${question}`))
                    
                }
                await vapi.start(interviewer ,{
                    variableValues:{
                        questions:formattedquestions
                    }
                })
            }
            
            

        }catch(e){
            console.log(e, 'vapi start')
            setCallstatus(CallStatus.INACTIVE)
        }
        
        console.log("callsas")
    }
    
    const handleDisconnect=()=>{
        setCallstatus(CallStatus.FINISHED)
        vapi.stop()
    }

    const isInactiveorFinished=callStatus===CallStatus.INACTIVE || callStatus===CallStatus.FINISHED;


    const lastMessages=messages[messages.length-1]?.content
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
            <button onClick={handleCall} className='relative btn-call'><span className={cn('absolute animate-spin rounded-4 opacity-75',
                callStatus!=='CONNECTING' && 'hidden'
            )} >
                
            </span>
            <span>{isInactiveorFinished  ?'CALL' :'....'}</span>
           
            </button>
        ):(
            <button className='btn-disconnect' onClick={handleDisconnect}>
                End
            </button>
        )}

    </div>
    </>
  )
}

export default Agent