'use client'
import React, { useActionState, useEffect } from 'react'
import { useToast } from '../ui/use-toast'
import { actionFunction } from '@/utils/types';
import { useFormState } from 'react-dom';

type FormWrapperType = {
  children:React.ReactNode;
  action:actionFunction;
}

const initialState = {
  message:''
}

function FormWrapper({children,action}:FormWrapperType){
  const {toast} = useToast();
  const [state,formAction] = useFormState(action,initialState);

  useEffect(()=>{

  if(state?.message){
    toast({
     description:state.message
   });
  }
  
  },[state]);

  return (
    <form action={formAction} >
      {children}
    </form> 
)
}

export default FormWrapper
