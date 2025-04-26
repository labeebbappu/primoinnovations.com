import { redirect } from 'next/navigation';

export default function Root() {
  redirect('/home');
  
// The return statement is not needed since redirect() throws an error
}
