import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

// 서버 렌더/하이드레이션 중엔 false, 그 뒤엔 true. 테마처럼 클라이언트에서만 아는 값을 쓸 때 사용.
export const useMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
