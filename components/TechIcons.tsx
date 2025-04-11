import { cn } from '@/lib/utils'
import { getTechLogos } from '@/prepwise_public/prepwise_public/utils'
import Image from 'next/image'
import React from 'react'

const TechIcons = async({techStack}:TechIconProps) => {
  console.log(techStack)
    const techIcons=await getTechLogos(techStack)
  return (
    <div className='flex flex-row'>{techIcons.slice(0,3).map(({tech,url},index)=>(
            <div key={index} className={cn("relative group bg-dark-300 rounded-full p-2 flex-center",index>0 &&
              '-ml-3'
            )}>
            <span className='tech-tooltip'>
                {tech}
            </span>
            <Image src={url} alt={tech} width={100} height={100} className='size-5'></Image>

        </div>
    ))}</div>    
  )
}

export default TechIcons