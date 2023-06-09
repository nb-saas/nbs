import { FC } from 'react';
import styles from './index.module.less';
import SwitchLang from '@/components/switch-lang';
import BgImg from '@/components/bg-img';

/**
 * TODO: 登录页面包含哪些元素: 1. 背景  2. 语言切换  3. 登录表单
 */

const Login: FC = () => {
  return (
    <div className={styles.container}>
      <BgImg />
      <div className={styles.form}></div>
      <div className={styles.lang}>
        <SwitchLang />
      </div>
    </div>
  );
};

export default Login;
