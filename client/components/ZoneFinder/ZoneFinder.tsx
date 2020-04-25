import * as React from 'react';
import { useState } from 'react';
import useZone from '../../hooks/useZone/useZone';

import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Heading, HeadingLevel } from 'baseui/heading';
import { Paragraph3 } from 'baseui/typography';
import { Button } from 'baseui/button';
import { Block, BlockProps } from 'baseui/block';
import { $StyleProp } from 'styletron-react';

const ZoneFinder = () => {
  const [ zipcode, setZipcode ] = useState('');
  const { zoneState, zoneXferStatus, onZoneSave } = useZone();

  const centerStyle: $StyleProp<BlockProps> = { textAlign: 'center' };
  const marginStyle: $StyleProp<BlockProps> = { marginBottom: '30px' };

  return (
    <form>
      <HeadingLevel>
        <Heading styleLevel={2} $style={{ ...centerStyle, ...marginStyle }}>
          Let's get started
        </Heading>
        <Heading styleLevel={5} $style={{ ...centerStyle, ...marginStyle }}>
          Enter your zipcode to find out your plant hardiness zone
        </Heading>
      </HeadingLevel>
      <Block $style={{ ...marginStyle }}>
        <FormControl label={() => 'Zipcode'}>
          <Input
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              const target = e.target as HTMLInputElement;
              setZipcode(target.value);
            }}
          />
        </FormControl>
        <Button
          disabled={!zipcode}
          isLoading={zoneXferStatus.requested}
          onClick={(e) => {
            e.preventDefault();
            onZoneSave(zipcode);
          }}
        >
          Submit
        </Button>
      </Block>

      {zoneXferStatus.succeeded && zoneState && (
        <HeadingLevel>
          <Heading styleLevel={5} $style={{ ...centerStyle, ...marginStyle }}>
            Your Plant Hardiness Zone is {zoneState.zone}.
          </Heading>
          <Paragraph3 $style={{ ...centerStyle, ...marginStyle }}>
            For zipcode {zoneState.zipcode}, the average annual extreme minimum temperature ranges from{' '}
            {zoneState.tRange}&deg; F.
          </Paragraph3>
        </HeadingLevel>
      )}

      {zoneXferStatus.failed && (
        <Paragraph3 $style={{ ...centerStyle, ...marginStyle }}>{zoneXferStatus.error}</Paragraph3>
      )}
    </form>
  );
};

export default ZoneFinder;


