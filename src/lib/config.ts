import { QueryClient } from '@tanstack/react-query';

let BACKEND_URL = 'http://localhost:3000/api';

if (process.env.NEXT_PUBLIC_BACKEND_URL) {
	BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60 * 60 * 24,
			retry: 1,
		},
	},
});

export { BACKEND_URL, queryClient };
