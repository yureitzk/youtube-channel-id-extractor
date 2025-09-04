'use client';

import type { ThemeProviderProps } from 'next-themes';
import { NextUIProvider } from '@nextui-org/system';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { NextRouter } from 'next/router';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
	router?: NextRouter;
}

declare module '@react-types/shared' {
	interface RouterConfig {
		routerOptions: NonNullable<
			Parameters<ReturnType<typeof useRouter>['push']>[1]
		>;
	}
}

export function Providers({ children, themeProps }: ProvidersProps) {
	const router = useRouter();

	return (
		<NextUIProvider navigate={router.push}>
			<NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
		</NextUIProvider>
	);
}
