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

  const handleSave = () => {
    onSave(email);
  };

  return (
    <YStack {...({ gap: "$6" } as any)}>
      <YStack {...({ backgroundColor: "white", borderRadius: "$8", padding: "$6", shadowColor: "$shadowColor", shadowOpacity: 0.05, shadowRadius: 10 } as any)}>
        <Label
          {...({
            marginBottom: "$2",
            color: "#5F7E68",
            opacity: 0.7
          } as any)}
        >
          Email Address
        </Label>
        <Input
          value={email}
          onChangeText={setEmail}
          {...({
            borderRadius: "$4"
          } as any)}
          placeholder="your.email@example.com"
          keyboardType="email-address"
        />

        <Text {...({ marginTop: "$4", color: "#5F7E68", opacity: 0.6 } as any)}>
          We'll send a verification email to your new address before updating it.
        </Text>
      </YStack>

      <Button
        onPress={handleSave}
        {...({
          width: "100%",
          borderRadius: "$6",
          height: 48,
          backgroundColor: "#5F7E68",
          color: "white"
        } as any)}
      >
        Save Email
      </Button>
    </YStack>
  );
}
