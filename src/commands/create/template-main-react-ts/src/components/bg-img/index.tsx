import styles from './index.module.less';

const BgImg = () => {
  return (
    <div
      className={styles.bg}
      style={{
        backgroundImage:
          'url(https://images.tuyacn.com/rms-static/537a3fd0-1b5a-11ec-b7af-2d39f353debc-1632283530317.jpg?tyName=login.jpg)',
      }}
    ></div>
  );
};

export default BgImg;
