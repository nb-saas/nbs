import { GlobalOutlined, DownOutlined } from '@ant-design/icons';
import { Dropdown, Typography, Row } from 'antd';
import type { MenuProps } from 'antd';
import { useState } from 'react';

const { Text } = Typography;

const SwitchLang = () => {
  const items: MenuProps['items'] = [
    {
      key: 'zh',
      label: (
        <span
          onClick={() => {
            setLang('zh');
          }}
        >
          简体中文
        </span>
      ),
    },
    {
      key: 'en',
      label: (
        <span
          onClick={() => {
            setLang('en');
          }}
        >
          English
        </span>
      ),
    },
  ];
  const [lang, setLang] = useState<string>('zh');

  return (
    <div>
      <Dropdown menu={{ items }}>
        <Row align="middle">
          <GlobalOutlined
            rev={{}}
            style={{ fontSize: '22px', margin: '0 10px' }}
          />
          <Text>{lang == 'zh' ? '简体中文' : 'English'}</Text>
          <DownOutlined
            rev={{}}
            style={{ fontSize: '10px', marginLeft: '10px' }}
          />
        </Row>
      </Dropdown>
    </div>
  );
};

export default SwitchLang;
