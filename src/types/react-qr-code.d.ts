declare module 'react-qr-code' {
  import { CSSProperties } from 'react';

  interface QRCodeProps {
    value: string;
    size?: number;
    bgColor?: string;
    fgColor?: string;
    level?: 'L' | 'M' | 'Q' | 'H';
    includeMargin?: boolean;
    style?: CSSProperties;
    className?: string;
  }

  const QRCode: React.FC<QRCodeProps>;
  export default QRCode;
}
