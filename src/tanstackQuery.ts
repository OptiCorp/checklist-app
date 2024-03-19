import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            throwOnError: (error) => {
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        return error.response?.status >= 500;
                    }
                }
                return true;
            },
            retry: 2,
        },
    },
});
