import { useState } from "react";
import { YStack, Text } from "tamagui";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

interface EditEmailPageProps {
  currentEmail: string;
  onSave: (email: string) => void;
}

export function EditEmailPage({ currentEmail, onSave }: EditEmailPageProps) {
  const [email, setEmail] = useState(currentEmail);
  const [saved, setSaved] = useState(false);

  const handleSafeSave = () => {
    try {
      if (onSave) {
        onSave(email);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      console.warn("Error in onSave (EditEmailPage):", e);
    }
  };

  return (
    <YStack {...({ gap: "$6" } as any)}>
      <YStack
        {...({
          backgroundColor: "white",
          borderRadius: "$8",
          padding: "$6",
          shadowColor: "$shadowColor",
          shadowOpacity: 0.05,
          shadowRadius: 10,
        } as any)}
      >
        <Label
          {...({
            marginBottom: "$2",
            color: "#5F7E68",
            opacity: 0.7,
            fontSize: "$4",
          } as any)}
        >
          Email Address
        </Label>

        <Input
          value={email}
          onChangeText={setEmail}
          {...({
            borderRadius: "$4",
          } as any)}
          placeholder="your.email@example.com"
          keyboardType="email-address"
        />

        <Text
          {...({
            marginTop: "$4",
            color: "#5F7E68",
            opacity: 0.6,
            fontSize: "$3",
          } as any)}
        >
          We'll send a verification email before updating it.
        </Text>

        {saved && (
          <Text
            {...({
              marginTop: "$3",
              color: "#5F7E68",
              fontSize: "$4",
            } as any)}
          >
            Email saved successfully.
          </Text>
        )}
      </YStack>

      <Button
        onPress={handleSafeSave}
        {...({
          width: "100%",
          borderRadius: "$6",
          height: 48,
          backgroundColor: "#5F7E68",
          color: "white",
        } as any)}
      >
        Save Email
      </Button>
    </YStack>
  );
}

