'use client';

import * as React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider as EmotionCacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// The function to create the Emotion cache
const createEmotionCache = () => createCache({ key: 'mui', prepend: true });

export default function ThemeRegistry({ theme, children }) {
  const [emotionCache] = React.useState(createEmotionCache);

  useServerInsertedHTML(() => {
    const serialized = emotionCache.key + ' ' + Object.keys(emotionCache.inserted).join(' ');
    const styles = Object.values(emotionCache.inserted).join('');

    if (styles.length === 0) return null;

    return (
      <style
        data-emotion={serialized}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return (
    <EmotionCacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </EmotionCacheProvider>
  );
}
