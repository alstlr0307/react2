// src/components/gallery.tsx
'use client';

import { useState } from 'react';
import { Carousel } from 'acme-carousel';

export default function Gallery() {
  const [isOpen, setIsOpen] = useState(false);

  // 예제용 이미지 목록 (public/images에 파일을 두거나 외부 URL 사용)
  const items = [
    { src: 'https://picsum.photos/id/1015/800/600', alt: 'Landscape 1' },
    { src: 'https://picsum.photos/id/1016/800/600', alt: 'Landscape 2' },
    { src: 'https://picsum.photos/id/1018/800/600', alt: 'Landscape 3' },
  ];

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>View pictures</button>
      {/* Works, since Carousel is used within a Client Component */}
      {isOpen && <Carousel items={items} />}
    </div>
  );
}
