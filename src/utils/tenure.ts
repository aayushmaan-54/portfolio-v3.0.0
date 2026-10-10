// Length of a role as "1 yr 1 mo", rounded to the nearest month.
// endDate null means ongoing (measured to build time).
const tenure = (startDate: string, endDate: string | null) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  const anchor = new Date(start);
  anchor.setMonth(start.getMonth() + months);
  const leftoverDays = (end.getTime() - anchor.getTime()) / 86_400_000;
  if (leftoverDays >= 15) months += 1;
  if (leftoverDays < -15) months -= 1;
  months = Math.max(months, 1);

  const years = Math.floor(months / 12);
  const rest = months % 12;

  return [years && `${years} yr`, rest && `${rest} mo`]
    .filter(Boolean)
    .join(" ");
};

export default tenure;
