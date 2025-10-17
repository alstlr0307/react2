// src/ui/like-button.tsx
'use client';

import { useState } from 'react';

export default function LikeButton({ likes }: { likes: number }) {
  // 낙관적 업데이트용 상태
  const [count, setCount] = useState<number>(likes ?? 0);
  const [isLiking, setIsLiking] = useState(false);

  const handleClick = async () => {
    // 클릭 시 즉시 반영 (낙관적 업데이트)
    setIsLiking(true);
    setCount((c) => c + 1);

    // 실제 요청 (API 호출 시뮬레이션)
    await new Promise((r) => setTimeout(r, 300));

    // 예: 실제 API 호출 예시
    // await fetch('/api/like', { method: 'POST', body: JSON.stringify({ id }) });

    setTimeout(() => setIsLiking(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLiking}
      aria-pressed={isLiking}
    >
      👍 {count}
    </button>
  );
}
