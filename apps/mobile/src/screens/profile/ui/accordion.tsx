import { Accordion as TamaguiAccordion, YStack, XStack } from "tamagui";
import { Feather } from "@expo/vector-icons";

export const Accordion = TamaguiAccordion;

export function AccordionItem(props: React.ComponentProps<typeof TamaguiAccordion.Item>) {
  return (
    <TamaguiAccordion.Item
      borderBottomWidth={1}
      borderBottomColor="$borderColor"
      {...props}
    />
  );
}

export function AccordionTrigger({
  children,
  ...props
}: React.ComponentProps<typeof TamaguiAccordion.Trigger>) {
  return (
    <TamaguiAccordion.Trigger unstyled {...(props as any)}>
      <XStack
        {...({
          py: "$4",
          jc: "space-between",
          ai: "center",
          width: "100%",
        } as any)}
      >
        <XStack flex={1}>{children}</XStack>
        <Feather name="chevron-down" size={16} color="#666" />
      </XStack>
    </TamaguiAccordion.Trigger>
  );
}

export const AccordionContent = TamaguiAccordion.Content;
export const AccordionHeader = TamaguiAccordion.Header;
