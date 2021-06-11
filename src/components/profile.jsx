import React from 'react';
import { getCurrentUser } from '../services/authService';

const Profile = () => {
   const user = getCurrentUser()
   if(!user) return null

   return <h1 className="display-6 text-center mt-5">Hello {user.name} 👋</h1>
}
 
export default Profile;