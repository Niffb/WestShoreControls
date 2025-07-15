import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mitsubishi Variable Frequency Drives | West Shore Controls',
  description: 'Explore our range of premium Mitsubishi variable frequency drives, including A800, F800, and other series for various industrial applications.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
} 