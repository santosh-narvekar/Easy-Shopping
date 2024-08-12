'use client'
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label"
import { Button } from "../ui/button";

function ImageInput({defaultValue}:{defaultValue?:string}) {
  const name = 'image';
  const [handleImageUpdate,setHandleImageUpdate] = useState(false);

  const handleUpdate=()=>{
    setHandleImageUpdate(!handleImageUpdate)
  }
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize ">Image {defaultValue && '(already selected)'} </Label>
      {
        defaultValue && !handleImageUpdate?
        <Button onClick={handleUpdate} variant={'outline'} className="max-w-xs bg-blue-500 text-white" >
            Update Image
         </Button>
        :
        <div className="flex items-center gap-2">
          <Input id={name} name={name} type="file" required accept="image/*" className="max-w-xs" />  
          {
          defaultValue && <Button variant={'destructive'} onClick={handleUpdate} className = " max-w-xs bg-red-300 text-white " >
            Close
         </Button>
          }
        </div>
      }
    </div>
  )
}

export default ImageInput
