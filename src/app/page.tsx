// import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/dashboard/overview');
}