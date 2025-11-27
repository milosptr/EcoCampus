import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { XStack } from 'tamagui';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteAccountModal({ isOpen, onClose, onConfirm }: DeleteAccountModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent
        {...({
          borderRadius: 24,
          width: '90%'
        } as any)}
      >
        <AlertDialogHeader>
          <AlertDialogTitle color="#EA715B">Delete Account</AlertDialogTitle>
          <AlertDialogDescription {...({ paddingTop: 8 } as any)}>
            Are you sure you want to delete your account? This action cannot be undone. All your data, progress, and achievements will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <XStack {...({ gap: 8, width: '100%' } as any)}>
            <AlertDialogCancel
              flex={1}
              {...({
                borderRadius: 16,
                borderColor: '#9DBFA8',
                color: '#5F7E68'
              } as any)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onPress={onConfirm}
              flex={1}
              {...({
                borderRadius: 16,
                backgroundColor: '#EA715B',
                color: 'white'
              } as any)}
            >
              Delete
            </AlertDialogAction>
          </XStack>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
