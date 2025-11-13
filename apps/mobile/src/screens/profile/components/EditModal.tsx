import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { YStack, XStack } from "tamagui";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  field: string;
  currentValue: string;
  onSave: (value: string) => void;
}

export function EditModal({ isOpen, onClose, field, currentValue, onSave }: EditModalProps) {
  const [value, setValue] = useState(currentValue);

  const handleSave = () => {
    onSave(value);
    onClose();
  };

  const getFieldLabel = (field: string) => {
    const labels: Record<string, string> = {
      fullName: "Full Name",
      age: "Age",
      gender: "Gender",
      university: "University",
      distance: "Distance from Campus",
      transport: "Primary Transport Mode"
    };
    return labels[field] || field;
  };

  const renderInput = () => {
    if (field === 'gender') {
      return (
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger {...({ borderRadius: 12 } as any)}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem index={0} value="Female">Female</SelectItem>
            <SelectItem index={1} value="Male">Male</SelectItem>
            <SelectItem index={2} value="Non-binary">Non-binary</SelectItem>
            <SelectItem index={3} value="Prefer not to say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      );
    }

    if (field === 'transport') {
      return (
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger {...({ borderRadius: 12 } as any)}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem index={0} value="Walk">Walk</SelectItem>
            <SelectItem index={1} value="Bike">Bike</SelectItem>
            <SelectItem index={2} value="Public Transit">Public Transit</SelectItem>
            <SelectItem index={3} value="Car">Car</SelectItem>
            <SelectItem index={4} value="E-Scooter">E-Scooter</SelectItem>
          </SelectContent>
        </Select>
      );
    }

    return (
      <Input
        value={value}
        onChangeText={setValue}
        {...({ borderRadius: 12 } as any)}
        keyboardType={field === 'age' ? 'numeric' : 'default'}
      />
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        {...({
          borderRadius: 24,
          width: '90%'
        } as any)}
      >
        <DialogHeader>
          <DialogTitle color="#5F7E68">Edit {getFieldLabel(field)}</DialogTitle>
        </DialogHeader>

        <YStack {...({ paddingVertical: 16 } as any)}>
          <Label
            {...({
              marginBottom: 8,
              color: '#5F7E68',
              opacity: 0.7
            } as any)}
          >
            {getFieldLabel(field)}
          </Label>
          {renderInput()}
        </YStack>

        <DialogFooter>
          <XStack {...({ gap: 8, width: '100%' } as any)}>
            <Button
              onPress={onClose}
              variant="outline"
              flex={1}
              {...({
                borderRadius: 16,
                borderColor: '#9DBFA8',
                color: '#5F7E68'
              } as any)}
            >
              Cancel
            </Button>
            <Button
              onPress={handleSave}
              flex={1}
              {...({
                borderRadius: 16,
                backgroundColor: '#5F7E68',
                color: 'white'
              } as any)}
            >
              Save
            </Button>
          </XStack>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
