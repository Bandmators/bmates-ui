import { PropsWithChildren } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface FormProps extends React.ComponentProps<'form'>, PropsWithChildren {
  redirect?: string;
}

export const Form = ({ redirect = '/', ...props }: FormProps) => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const redirect_to: string = decodeURIComponent(searchParams.get('redirect_to') || redirect);

  const handleSubmit = () => {
    console.log('!!');
    navigate(redirect_to);
  };

  return (
    <form onSubmit={handleSubmit} {...props}>
      {props.children}
    </form>
  );
};
