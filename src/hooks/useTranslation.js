import { useTranslation as useI18nTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();
  const user = useSelector((state) => state.auth.user);
  const userLanguage = user?.language || localStorage.getItem('appLanguage') || 'en';

  useEffect(() => {
    if (i18n && i18n.language !== userLanguage) {
      i18n.changeLanguage(userLanguage);
    }
  }, [userLanguage, i18n]);

  const translate = (key, defaultText) => {
    const translated = t(key);
    if (translated === key && defaultText !== undefined) {
      return defaultText;
    }
    return translated;
  };

  return { t: translate, currentLanguage: userLanguage, i18n };
};

