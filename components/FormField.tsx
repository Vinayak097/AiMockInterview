"use client"
import React from 'react'
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control, Controller, FieldValues } from 'react-hook-form'


interface FormFieldProps <T extends FieldValues>{
  control :Control<T>;
  name:string;
  label:string;
  placeholder:string;
  type: 'text' | 'email' | 'password' | 'file';

}
const FormField = ({control , name ,label , placeholder,type}:FormFieldProps<T>) => {
  return (
    <Controller
      
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className=''>
            <FormLabel className='label'>{label}</FormLabel>
            <FormControl>
              <Input className='py-5 rounded-full' type={type} placeholder={placeholder} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
  )
}

export default FormField