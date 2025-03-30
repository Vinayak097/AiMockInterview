import React from 'react'
import dayjs from 'dayjs'
import Image from 'next/image';
import { getRandomInterviewCover } from '@/prepwise_public/prepwise_public/utils';
import { Button } from './ui/button';
import Link from 'next/link';
const InterviewCard = ({interviewId,userId,role,type,techstack,createdAt}:InterviewCardProps) => {
    const feedback=null as Feedback |null
    const normelizedType=/mix/gi.test(type)? 'Mixed':type;
    const formattedDate= dayjs(feedback?.createdAt || createdAt ||Date.now()).format('MMM D, YYYY')
  return (
    <div className='card-border w-[300px] max-sm:w-full min-h-96' >
        <div className='card-interview'>
            <div className=''>
            <div className='absolute top-0 righ-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600'>
                <p className='batch-text'>
                    {normelizedType}
                </p>
            </div>
            <Image src={getRandomInterviewCover()} alt='coverinterveiw image' height={96} width={96} 
            className='rounded-full object-fit size-[90px]' >
            </Image>
            <h3 className='mt-5 capitalize'>
                {role} Interview
            </h3>
            <div className=' flex flex-row gap-5 mt-3'>
                <div className='flex flex-row gap-2 '>
                    <Image src={'/calender.svg'} alt='calender'
                    width={22} height={22}></Image>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                    <Image src="/start.svg" alt="star" width={22} height={22}></Image>
                    <p>{feedback?.totalScore || '-----'}/100</p>
                </div>
            </div>

            <p className='line-clamp-2 mt-5'>
                {feedback?.finalAssessment || "You haven't taken the interview yet. Take it now to improve your skills." }
            </p>
            </div>

            <div className='flex flex '>
                <p>Tech icons</p>

                <Button className='btn-primary'>
                    <Link href={feedback? `/interview/${interviewId}/feedback`:
                    `/interview/${interviewId}`
                }>
                    {feedback? 'Check Feedback':'View Interview'}
                </Link>
                </Button>

            </div>
        </div>
        
    </div>
  )
}

export default InterviewCard