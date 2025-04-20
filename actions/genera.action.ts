
import { db } from "@/firebase/admin";
import { redirect } from "next/navigation";


export async function getInterviewByuserId(userid:string){
    
    if(!userid){
        redirect('/sign-in')
    }
    const interviews= await db.collection('interviews')
    .where('userId','==',userid)
    .orderBy('createdAt','desc')
    .get();
    return await interviews.docs.map((doc)=>({
        id:doc.id,
        ...doc.data()
    })) as Interview[];
}

export async function getLatestInterviews(params:GetLatestInterviewsParams){
    const {userId,limit=20}=params;
    const interviews= await db.collection('interviews')
    .orderBy('createdAt','desc')
    .where('finalized','==',true)
    .where('userId','!=',userId)
    .limit(limit)    
    .get();
    return await interviews.docs.map((doc)=>({
        id:doc.id,
        ...doc.data()
    })) as Interview[];
}

export async function getInterviewById(id:string):Promise<Interview |null>{
    const interview =await db.collection('interviews')
    .doc(id)
    .get();
    return interview.data() as Interview | null
}