export const capitliseName = (name: string): string => {
  const firstName = name.split(" ")[0].toLowerCase();
  const lastName = name.split(" ")[1].toLowerCase();
  firstName[0].toUpperCase();
  lastName[0].toUpperCase();

  return firstName + " " + lastName;
};
