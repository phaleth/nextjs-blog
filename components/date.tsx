import { parseISO, format } from 'date-fns';

export default ({ dateString }: { dateString: string }): JSX.Element => {
  const date: Date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
};
