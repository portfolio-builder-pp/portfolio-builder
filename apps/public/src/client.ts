import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@portfolio-builder/api';

export const TRPCClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${import.meta.env.PUBLIC_API_BASE_URL}:${
        import.meta.env.PUBLIC_API_PORT
      }/trpc`,
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: 'include',
        });
      },
    }),
  ],
});
