import { Button, Toaster, useToast } from 'bmates-ui';

export default function ToastPreview() {
  const { toast } = useToast();

  return (
    <>
      <Button
        onClick={() =>
          toast({
            title: 'Project saved',
            description: 'Your latest changes are now available to collaborators.',
            variant: 'success',
            time: 5000,
          })
        }
      >
        Show toast
      </Button>
      <Toaster position="bottom-right" />
    </>
  );
}
