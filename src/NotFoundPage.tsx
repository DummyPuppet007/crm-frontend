import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        className="w-full max-w-md"
        extra={
          <Button 
            type="primary" 
            onClick={() => navigate("/dashboard")}
            className="mt-4"
          >
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;
