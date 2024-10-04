export const transformNameInitials = (name) => {
  const nameArray = name.split(" ");
  const initials = nameArray
    .map((name) => name.charAt(0).toUpperCase())
    .join("");
  return initials;
};

export const firstLetterUppercase = (text) => {
  if (text) {
    let splitText = text?.split(" ");

    if (splitText.length > 1) {
      const uppercaseArray = splitText.map((text) => {
        return text[0].toUpperCase() + text.slice(1, text.length);
      });

      return uppercaseArray.join(" ");
    }

    return text[0].toUpperCase() + text.slice(1, text.length);
  }
};
