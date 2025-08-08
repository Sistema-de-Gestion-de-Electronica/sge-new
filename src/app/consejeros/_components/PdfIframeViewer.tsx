'use client';

type Props = { file: string };

export default function PdfIframeViewer({ file }: Props) {
  return (
    <div className="w-full h-[80vh] border rounded shadow">
      <iframe
        src={file}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title="Visor de PDF"
      />
    </div>
  );
}
