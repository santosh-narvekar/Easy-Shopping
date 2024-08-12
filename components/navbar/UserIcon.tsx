import { fetchProfileImage } from '@/utils/actions';
import { LuUser2 } from 'react-icons/lu';

async function UserIcon() {
  const profileImage = await fetchProfileImage();
  if(profileImage){
  
    return <img src={profileImage} alt={'profile-image-of-user'} className='w-6 h-6 rounded-full object-cover' />
  }

  return (
    <LuUser2 className='w-6 h-6 rounded-full border-[1px] text-white bg-blue-600'/>
 
  )
}

export default UserIcon
