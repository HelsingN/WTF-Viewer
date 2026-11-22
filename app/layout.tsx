import type { Metadata } from 'next';
import './globals.css';
import './reader.css';
export const metadata:Metadata={title:'WTF Viewer · AI CapEx Signals',description:'Evidence, events and Challenger 2.1 research workflow. RU / EN.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ru"><body>{children}</body></html>}
