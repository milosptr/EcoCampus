import { Avatar as TamaguiAvatar, Image } from "tamagui";

export function Avatar(props: React.ComponentProps<typeof TamaguiAvatar>) {
  return (
    <TamaguiAvatar
      circular
      size="$4"
      {...props}
    />
  );
}

export function AvatarImage(props: React.ComponentProps<typeof Image>) {
  return <TamaguiAvatar.Image asChild><Image {...props} /></TamaguiAvatar.Image>;
}

export function AvatarFallback(props: React.ComponentProps<typeof TamaguiAvatar.Fallback>) {
  return (
    <TamaguiAvatar.Fallback
      backgroundColor="$backgroundHover"
      alignItems="center"
      justifyContent="center"
      {...(props as any)}
    />
  );
}
