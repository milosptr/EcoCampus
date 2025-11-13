import * as React from "react";
import { XStack, YStack, styled, Input as TamaguiInput } from "tamagui";
import { Feather } from "@expo/vector-icons";

const OTPContainer = styled(XStack, {
  alignItems: "center",
  gap: "$2",
} as any);

const OTPGroupContainer = styled(XStack, {
  alignItems: "center",
  gap: "$1",
} as any);

const OTPSlotContainer = styled(YStack, {
  width: 36,
  height: 36,
  borderWidth: 1,
  borderColor: "$borderColor",
  backgroundColor: "$background",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "$2",
  variants: {
    isActive: {
      true: {
        borderColor: "$blue9",
        shadowColor: "$blue9",
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
    },
    hasError: {
      true: {
        borderColor: "$red9",
      },
    },
  } as const,
} as any);

type InputOTPProps = {
  value?: string;
  onChange?: (value: string) => void;
  length?: number;
  disabled?: boolean;
  children?: React.ReactNode;
};

const OTPContext = React.createContext<{
  value: string;
  onChange: (value: string) => void;
  length: number;
  disabled?: boolean;
}>({
  value: "",
  onChange: () => {},
  length: 6,
});

function InputOTP({
  value = "",
  onChange = () => {},
  length = 6,
  disabled = false,
  children,
  ...props
}: InputOTPProps & React.ComponentProps<typeof OTPContainer>) {
  return (
    <OTPContext.Provider value={{ value, onChange, length, disabled }}>
      <OTPContainer opacity={disabled ? 0.5 : 1} {...props}>
        {children}
      </OTPContainer>
    </OTPContext.Provider>
  );
}

function InputOTPGroup({ children, ...props }: React.ComponentProps<typeof OTPGroupContainer>) {
  return (
    <OTPGroupContainer {...props}>
      {children}
    </OTPGroupContainer>
  );
}

function InputOTPSlot({
  index,
  ...props
}: { index: number } & React.ComponentProps<typeof OTPSlotContainer>) {
  const { value, onChange, disabled } = React.useContext(OTPContext);
  const char = value[index] || "";
  const isActive = value.length === index;

  const inputRef = React.useRef<any>(null);

  return (
    <OTPSlotContainer
      {...({ isActive } as any)}
      onPress={() => {
        if (!disabled && inputRef.current) {
          inputRef.current.focus();
        }
      }}
      {...props}
    >
      <TamaguiInput
        ref={inputRef}
        value={char}
        onChangeText={(text) => {
          const newValue = value.split("");
          newValue[index] = text.slice(-1);
          onChange(newValue.join(""));
        }}
        maxLength={1}
        keyboardType="number-pad"
        {...({ textAlign: "center" } as any)}
        fontSize="$5"
        width="100%"
        height="100%"
        borderWidth={0}
        {...({ backgroundColor: "transparent" } as any)}
        padding="$0"
        disabled={disabled}
        focusStyle={{
          borderWidth: 0,
        }}
      />
    </OTPSlotContainer>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<typeof YStack>) {
  return (
    <YStack {...props}>
      <Feather name="minus" size={16} />
    </YStack>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
