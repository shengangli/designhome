import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Design Studio',
  description: 'Get in touch with our team to discuss your next project. We create exceptional digital experiences.',
  openGraph: {
    title: 'Contact | Design Studio',
    description: 'Get in touch with our team to discuss your next project. We create exceptional digital experiences.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}