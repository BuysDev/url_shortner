import QR from 'qrcode';

export const generateQR = async (text: string) => {
    try {
      const qr = await QR.toDataURL(text);
      return qr;
    } catch (error) {
      console.error('Error generating QR code:', error);
      return null;
    }
}