import zh from '../lang/zh.json';
import en from '../lang/en.json';
import xx from '@/lang';

if (window.__MICRO_APP_ENVIRONMENT__) {
  const appName = (window as any).__MICRO_APP_NAME__;
  const data = (window as any)?.microApp?.getData();

  Object.keys(zh).forEach((key) => {
    data.i18n.addResource(
      'zh',
      'translation',
      `${appName}.${key}`,
      (zh as any)[key]
    );
  });

  Object.keys(en).forEach((key) => {
    data.i18n.addResource(
      'en',
      'translation',
      `${appName}.${key}`,
      (en as any)[key]
    );
  });
}
