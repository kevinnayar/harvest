import * as React from 'react';
import { Link } from 'react-router-dom';
import { ParagraphXSmall } from 'baseui/typography';

export default (props: { link?: string }) => {
  const date = new Date();
  return props.link ? (
    <Link to={props.link}>
      <ParagraphXSmall>&copy; {date.getFullYear()} Harvest</ParagraphXSmall>
    </Link>
  ) : (
    <ParagraphXSmall>&copy; {date.getFullYear()} Harvest</ParagraphXSmall>
  );
};
