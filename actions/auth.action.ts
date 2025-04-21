'use server'
import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const ONE_WEk=60*60*24*7*1000

export async function Signup(params:SignUpParams) {
    const {uid,email,name}    =params;
    try{
        const userRecord=await db.collection('users').doc(uid).get();
        if(userRecord.exists){
            return {
                success:false,
                message:'User alerady exist please signin instead'
            }
        }
        await db.collection('users').doc(uid).set({
            email,
            name,
            
        })

    }catch(error){
        console.error('error creting user :',error )
        if(error && typeof error === 'object' && 'code' in error && error.code === 'auth/email-already-exists'){
            return {
                success:false,
                message:'Email already exists'
            }
        }
        return {
            success:false,
            message:'Something went wrong'
        }
    }

}

export async function setSessionCookies(idToken:string){
    const cookieSession=await cookies();
    const sessionCookie=await auth.createSessionCookie(idToken ,{expiresIn :ONE_WEk});

    cookieSession.set('session',sessionCookie,{maxAge:ONE_WEk,
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:'lax',
        path:'/'
    })
}
export async function Signin(params:SignInParams){
    const {email,idToken}=params;
    try{
        const userRecord= await auth.getUserByEmail(email);
        if(!userRecord){
            return{
                success:false,
                message:'User does not exist , create an account'
            }
        }
        
        await setSessionCookies(idToken);
    }catch(e){
        console.log(e ,'signin function')
    }

}

export async function getCurrentUser():Promise<User|null>{
    
    const cookieSession=await cookies();
    const sessionCookie=cookieSession.get('session')?.value;
    
    if(!sessionCookie){
        return null;
    }
    try{
        const decodeToken=await auth.verifySessionCookie(sessionCookie,true);
    
        const userRecord =await db.collection('users').doc(decodeToken.uid).get();
        console.log(userRecord , 'user')
        if(!userRecord) return null;
        return {...userRecord.data(),id:userRecord.id} as User;
    }catch(e){
        console.log(e,'get current user')
        return null
    }
    
}

export async function isAuthenticated(){
    const user=await getCurrentUser();
    return !!user;
}
