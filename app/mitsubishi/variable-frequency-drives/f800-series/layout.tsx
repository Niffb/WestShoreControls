import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mitsubishi FR-F800 Series Inverters | West Shore Controls',
  description: 'Specialized Mitsubishi FR-F800 Series variable frequency drives optimized for HVAC, fan and pump applications with enhanced energy efficiency features.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
} 