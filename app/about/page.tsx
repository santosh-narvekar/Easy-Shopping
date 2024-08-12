import Description from "@/components/form/Description";
import FormInput from "@/components/form/FormInput";
import FormWrapper from "@/components/form/FormWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchProfile, updateProfileAction } from "@/utils/actions"
import { SubmitButton } from "@/utils/Button";
import Image from "next/image";
import { LuUser2 } from "react-icons/lu";

async function AboutPage(){
  const profile = await fetchProfile();
  const name = 'image'
  console.log(profile);
 
  const userIcon = <LuUser2 className="w-24 h-24 bg-primary rounded text-white mb-4"/>

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">user profile</h1>
      
      <div className="border p-8 rounded-md">

      <FormWrapper action={updateProfileAction}>
        {
          profile?.image?<Image src={profile.image} alt={profile.name} width={100} height={100}  className='rounded object-cover mb-4 w-24 h-24' /> : userIcon
        }

        <div className="mb-2">
        <Label htmlFor={name} className="capitalize">
          Image
        </Label>
        <Input id={name} name={name} type="file" required accept="image/*" className="max-w-xs" />
        </div>

        <div className="grid md:grid-cols-2 gap-4 my-4">
          <FormInput type='text' name='firstName' label="First Name" defaultValue={profile.firstName} />
          <FormInput type='text' name='lastName' label='Last Name' defaultValue={profile.lastName} />
          <FormInput type='text' name="username" label='Username' defaultValue={profile.username} />
        </div>

          <Description name="address" labelText="address (10-1000 Words)" defaultValue={profile.address}/>

          <SubmitButton text='Update Profile' className="mt-8"  />
      </FormWrapper>
      </div>

    </section>
  )
}

export default AboutPage
