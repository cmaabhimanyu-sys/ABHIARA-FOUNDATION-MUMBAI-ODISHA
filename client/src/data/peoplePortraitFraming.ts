type PortraitReference = {
  id: number;
  imageUrl?: string | null;
};

/**
 * All ordinary profile images use their centered crop. These three existing
 * photographs have unusual headroom or full-length framing. Scope each
 * correction to the current file so an owner-uploaded replacement returns to
 * the safe centered default automatically.
 */
export function peoplePortraitFraming(member: PortraitReference): string {
  const image = member.imageUrl ?? "";
  if (member.id === 1 && image.includes("abhimanyu-mallik-maroon-blazer-")) {
    return "scale-[2] object-[center_25%] origin-[50%_25%]";
  }
  if (member.id === 4 && image.includes("4-people-portrait-800x1000.webp")) {
    return "scale-[1.4] object-bottom origin-center";
  }
  if (
    member.id === 91001 &&
    image.includes("subhasis-sahoo-people-portrait-")
  ) {
    return "scale-[2.2] object-top origin-top";
  }
  return "object-center";
}
