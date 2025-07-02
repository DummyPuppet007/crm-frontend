import { Button } from 'antd';
import type { ButtonProps } from 'antd';
import React from 'react';

interface CreateButtonProps extends Omit<ButtonProps, 'onClick'> {
  label: string;
  onClick: () => void;
}

const CreateButton: React.FC<CreateButtonProps> = ({ label, onClick, ...props }) => {
  return (
    <Button
      type="primary"
      style={{ fontSize: '1rem', padding: '0.5rem 1rem', height: 'auto' }}
      onClick={onClick}
      {...props}
    >
      {`Create ${label}`}
    </Button>
  );
};

export default CreateButton;
