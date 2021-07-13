export const alphabetically = (a, b) => {
  const al = a.name.toLowerCase();
  const bl = b.name.toLowerCase();

  if (al > bl) return 1;
  return -1;
};

export const membersCount = (a, b) => {
  const al = a.memberCount;
  const bl = b.memberCount;

  return bl - al;
};
