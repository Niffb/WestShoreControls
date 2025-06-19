import { redirect } from 'next/navigation'

export default function Products() {
  // Redirect to home page since we're restructuring to use brand-specific pages
  redirect('/')
} 