import { Button } from 'antd';
import type { ButtonProps } from 'antd';
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface CreateButtonProps extends Omit<ButtonProps, 'onClick'> {
  label: string;
  onClick: () => void;
}

const CreateButton: React.FC<CreateButtonProps> = ({ label, onClick, ...props }) => {
  const { darkMode } = useTheme();
  
  return (
    <Button
      type="primary"
      style={{ 
        fontSize: '1rem', 
        padding: '0.5rem 1rem',
        backgroundColor: darkMode ? '#1d4ed8' : '#1890ff',
      }}
      onClick={onClick}
      {...props}
    >
      {`Create ${label}`}
    </Button>
  );
};

export default CreateButton;
