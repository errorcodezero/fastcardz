import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { createTRPCHandle } from 'trpc-sveltekit';
import { handle as authHandle } from './auth';
const trpcHandle: Handle = createTRPCHandle({ router, createContext });

export const handle = sequence(authHandle, trpcHandle); 
