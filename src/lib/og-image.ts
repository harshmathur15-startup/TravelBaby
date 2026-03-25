import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const FONT_URL = 'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-600-normal.woff';

let fontData: ArrayBuffer | null = null;

async function loadFont(): Promise<ArrayBuffer> {
  if (fontData) return fontData;
  const res = await fetch(FONT_URL);
  fontData = await res.arrayBuffer();
  return fontData;
}

export async function generateOgImage(title: string, description?: string): Promise<Buffer> {
  const font = await loadFont();

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          padding: '60px',
          background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 50%, #c7d2fe 100%)',
          fontFamily: 'Inter',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                fontSize: '48px',
                fontWeight: 600,
                color: '#1e1b4b',
                lineHeight: 1.2,
                maxWidth: '900px',
              },
              children: title,
            },
          },
          description
            ? {
                type: 'div',
                props: {
                  style: {
                    fontSize: '24px',
                    color: '#4338ca',
                    marginTop: '20px',
                    lineHeight: 1.4,
                    maxWidth: '800px',
                  },
                  children: description,
                },
              }
            : null,
        ].filter(Boolean),
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: font,
          weight: 600,
          style: 'normal',
        },
      ],
    },
  );

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
  });

  return Buffer.from(resvg.render().asPng());
}
