import React, { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { store, persistor } from './store/store';
import { AppRouter } from './routes/router';
import { getTheme } from './theme';
import { translations } from './services/translations';

const GlobalTranslator = () => {
  const { user } = useSelector((state) => state.auth);
  const currentLanguage = user?.language || localStorage.getItem('appLanguage') || 'en';

  useEffect(() => {
    if (currentLanguage === 'en') return;

    const dict = translations[currentLanguage];
    if (!dict) return;

    const sortedKeys = Object.keys(dict).sort((a, b) => b.length - a.length);

    const translateString = (text) => {
      const trimmed = text.trim();
      if (!trimmed) return text;

      if (dict[trimmed]) {
        const leadingWhitespace = text.match(/^\s*/)?.[0] || '';
        const trailingWhitespace = text.match(/\s*$/)?.[0] || '';
        return leadingWhitespace + dict[trimmed] + trailingWhitespace;
      }

      let result = text;
      for (const key of sortedKeys) {
        if (key.length < 3) continue;
        if (result.includes(key)) {
          result = result.split(key).join(dict[key]);
        }
      }
      return result;
    };

    const translateElementAttributes = (element) => {
      if (element.placeholder && typeof element.placeholder === 'string') {
        const trimmed = element.placeholder.trim();
        if (dict[trimmed]) {
          element.placeholder = dict[trimmed];
        } else {
          for (const key of sortedKeys) {
            if (key.length >= 3 && element.placeholder.includes(key)) {
              element.placeholder = element.placeholder.split(key).join(dict[key]);
            }
          }
        }
      }

      const ariaLabel = element.getAttribute('aria-label');
      if (ariaLabel && typeof ariaLabel === 'string') {
        const trimmed = ariaLabel.trim();
        if (dict[trimmed]) {
          element.setAttribute('aria-label', dict[trimmed]);
        }
      }

      if ((element.tagName === 'INPUT' && (element.type === 'button' || element.type === 'submit')) || element.tagName === 'BUTTON') {
        if (element.value && typeof element.value === 'string') {
          const trimmed = element.value.trim();
          if (dict[trimmed]) {
            element.value = dict[trimmed];
          }
        }
      }
    };

    const walk = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const val = node.nodeValue;
        if (val && val.trim()) {
          const translated = translateString(val);
          if (translated !== val) {
            node.nodeValue = translated;
          }
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const tagName = node.tagName.toLowerCase();
        if (tagName !== 'script' && tagName !== 'style') {
          translateElementAttributes(node);
          node.childNodes.forEach(walk);
        }
      }
    };

    walk(document.body);

    const observer = new MutationObserver((mutations) => {
      observer.disconnect();

      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(walk);
        } else if (mutation.type === 'characterData') {
          const node = mutation.target;
          const val = node.nodeValue;
          if (val && val.trim()) {
            const translated = translateString(val);
            if (translated !== val) {
              node.nodeValue = translated;
            }
          }
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [currentLanguage]);

  return null;
};

const ThemeApp = () => {
  const mode = useSelector((state) => state.ui.themeMode);
  const theme = React.useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalTranslator />
      <AppRouter />
    </ThemeProvider>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeApp />
      </PersistGate>
    </Provider>
  );
}
