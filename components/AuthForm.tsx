"use client"
import React from 'react'
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { ControllerFieldState, ControllerRenderProps, FieldValues, useForm, UseFormStateReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import FormField from './FormField'
import { useRouter } from 'next/navigation'
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).optional(),
  email: z.string().email({
    message: "Please enter a valid email address."
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters."
  })
})

   
const AuthForm = ({type}:{type:string}) => {
  const router=useRouter(); 
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
      })
      function onSubmit(values: z.infer<typeof formSchema>) {
        try{
          if(type=='sign-up'){
            toast.success('Account created successfully')
            router.push('/');
            console.log("singup"  , values)

          }else{
            toast.success('Signin successfully')
            router.push('/');
            console.log('singin ' , values)

          }
        }catch(e){
          console.error(e)
          toast.error(`there was an error : ${e}`)
        }
        
      }
      const isSignin=type==='sign-in'
  return (
    <div className='card-border lg:min-w-[566px] '>
        <div className='flex flex-col gap-6 card py-14 px-10'>
            <div className='flex flex-row gap-2 justify-center '>
                <Image src="/logo.svg" alt="logo" height={32} width={38}></Image>
                <h2>PrepWise</h2>
            </div>
            <h3>Practice job interview with AI</h3>

        
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6  ">
        {!isSignin && 
        <FormField label='Name' type='text' control={form.control} placeholder="Name"  name='name' ></FormField>}
        <FormField label='Email' type='email' control={form.control} placeholder='Email' name='email'></FormField>
        <FormField label='Password' type='password' control={form.control} placeholder='Password' name='password'></FormField>
      <Button className='' type="submit">Submit</Button>
    </form>
  </Form>

  <p className='text-center'>
          {!isSignin ? "Already have an account?" : "No account yet?"} 
          <Link 
            className='font-bold text-user-primary ml-1' 
            href={!isSignin ? "/sign-in" : "/sign-up"}
          >
            {isSignin ? "Sign Up" : "Sign In"}
          </Link>
        </p>

  </div>
  </div>
  )
}

export default AuthForm