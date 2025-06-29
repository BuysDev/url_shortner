'use client'

import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QrCodeIcon, LinkIcon, ArrowBigRightIcon } from 'lucide-react'
import { useState } from "react";
import { generateQR } from '@/functions/generate/qrCodeGenerate'

type ILink = 'SHORT' | 'QR'

export default function Home() {
  const [link, setLink] = useState<ILink>('SHORT')
  const [textValue, setTextValue] = useState<string>('');
  const [linkValue, setLinkValue] = useState<string>('');
  const [qrCode, setQrCode] = useState<string | null>(null);

  const QRGen = async (text: string): Promise<void> => {
    generateQR(text).then(data => {
      if (data) {
        setQrCode(data);
      } else {
        setQrCode(null);
      }
    })
  }

  return (
    <>
      <NavBar />
      <main className="flex flex-col items-center justify-center h-80 p-4">
        <div className="flex flex-col items-center text-center gap-4 mt-36">
          <h1 className="text-2xl font-bold">Short links. Huge impact.</h1>
          <p>Shorten, share, and track smarter with our link & QR code platform.</p>
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <Button variant={link === 'SHORT' ? 'default' : 'outline'} onClick={() => setLink('SHORT')} className="p-6">
              <LinkIcon />
              Short Link
            </Button>
            <Button onClick={() => setLink("QR")} variant={link === 'QR' ? 'default' : 'outline'} className="p-6">
              <QrCodeIcon />
              QR Code
            </Button>
          </div>
        </div>
        <div className="mt-12 w-full rounded-md max-w-md">
          {
            link === 'SHORT' ? (
              <div className="flex flex-col gap-4 p-6 border rounded-md">
                <div>
                  <h1 className="text-xl font-bold">Shorten a long link</h1>
                  <p className="text-sm text-muted-foreground">Enter a long URL to shorten it.</p>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <Input value={linkValue} onChange={(e) => setLinkValue(e.target.value)} type="url" placeholder="Enter text for URL..." />
                  <Button variant={'outline'}><ArrowBigRightIcon /> Get your link for free</Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 p-6 border rounded-md">
                <div>
                  <h1 className="text-xl font-bold">Create a QR Code</h1>
                  <p className="text-sm text-muted-foreground">Enter a text to generate a QR code.</p>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <Input value={textValue} onChange={(e) => setTextValue(e.target.value)} className="w-[50%]" type="url" placeholder="Enter text for QR Code..." />
                  <Button onClick={() => QRGen(textValue)} className="w-[50%]" variant={'outline'}><ArrowBigRightIcon /> Get your QR Code for free</Button>
                </div>
                {
                  qrCode && (
                    <div className="mt-4">
                      <img src={qrCode} alt="QR Code" className="w-full rounded-md" />
                    </div>
                  )
                }
              </div>
            )
          }
        </div>
      </main>
    </>
  );
}