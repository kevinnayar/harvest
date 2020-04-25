import * as React from 'react';
import { Link } from 'react-router-dom';
import { Display2 } from 'baseui/typography';

export default (props: { link?: string }) => {
  return props.link ? (
    <Link to={props.link}>
      <Display2 marginBottom="scale500">Harvest</Display2>
    </Link>
  ) : (
    <Display2 marginBottom="scale500">Harvest</Display2>
  );
};
