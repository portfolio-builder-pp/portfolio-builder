import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@portfolio-builder/api';

export const TRPCClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000/trpc',
    }),
  ],
});
