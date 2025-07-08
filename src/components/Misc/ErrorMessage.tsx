import { Alert } from "antd";
import React from "react";

export default function ErrorMessage({
    message,
    description,
    onClose,
}: {
    message: string;
    description: string;
    onClose: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {

  return (
    <Alert
      message={message}
      description={description}
      type="error"
      closable
      onClose={onClose}
    />
  );
}
