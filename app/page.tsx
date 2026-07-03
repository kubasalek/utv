import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/dashboard'); // lub redirect('/auth/login')
}