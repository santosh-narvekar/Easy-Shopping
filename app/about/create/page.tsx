import Description from "@/components/form/Description"
import FormInput from "@/components/form/FormInput"
import FormWrapper from "@/components/form/FormWrapper"
import { createProfileAction } from "@/utils/actions"
import { SubmitButton } from "@/utils/Button"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

async function CreateProfilePage(){
  const user = await currentUser();
  if(user?.privateMetadata?.hasProfile) redirect('/')

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">new user</h1>
      <div className="border p-8 rounded-md">
        <FormWrapper action={createProfileAction}>
          <div className = " grid md:grid-cols-2 gap-4 mt-4 ">
            <FormInput type="text" name='firstName' label="First Name" defaultValue={user?.firstName!} />


            <FormInput type="text" name='lastName' label="Last Name" defaultValue={user?.lastName!} />
            
            <FormInput type='text' name='username' label='Username' defaultValue="" />
          </div>

            <Description name="address" labelText="address (10-1000 Words)"  />

          <SubmitButton text="Create Profile" className='mt-8 text-primary'/>

        </FormWrapper>
      </div>
    </section>
  )
}

export default CreateProfilePage