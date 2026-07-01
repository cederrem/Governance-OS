import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://governance.pfinvest.local'),
  title: 'PF Invest Governance OS',
  description: 'Mémoire vivante de gouvernance pour PF Invest et ses participations.',
  openGraph: {
    title: 'PF Invest Governance OS',
    description: 'Tableau de bord exécutif, mémoire des sujets, validation IA et préparation automatique des réunions.',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
