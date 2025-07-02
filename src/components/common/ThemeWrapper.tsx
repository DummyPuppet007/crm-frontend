// src/components/ThemeWrapper.tsx
import { ConfigProvider, theme } from 'antd';
import { useTheme } from '../../context/ThemeContext';

const { darkAlgorithm, defaultAlgorithm } = theme;

const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { darkMode } = useTheme();
  
  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <div className={`app ${darkMode ? 'dark' : 'light'}`}>
        {children}
      </div>
    </ConfigProvider>
  );
};

export default ThemeWrapper;