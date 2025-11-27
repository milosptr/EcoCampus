import { XStack } from "tamagui";
export {
  DropdownMenu as Menubar,
  DropdownMenuTrigger as MenubarTrigger,
  DropdownMenuContent as MenubarContent,
  DropdownMenuItem as MenubarItem,
  DropdownMenuCheckboxItem as MenubarCheckboxItem,
  DropdownMenuRadioItem as MenubarRadioItem,
  DropdownMenuLabel as MenubarLabel,
  DropdownMenuSeparator as MenubarSeparator,
  DropdownMenuShortcut as MenubarShortcut,
  DropdownMenuGroup as MenubarGroup,
  DropdownMenuPortal as MenubarPortal,
  DropdownMenuSub as MenubarSub,
  DropdownMenuSubContent as MenubarSubContent,
  DropdownMenuSubTrigger as MenubarSubTrigger,
  DropdownMenuRadioGroup as MenubarRadioGroup,
} from "./dropdown-menu";

export function MenubarMenu(props: React.ComponentProps<typeof XStack>) {
  return <XStack {...(props as any)} />;
}
