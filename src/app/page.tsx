import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect ke page index
  redirect('/index');
}