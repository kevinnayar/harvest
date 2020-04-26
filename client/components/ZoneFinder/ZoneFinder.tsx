import * as React from 'react';
import { useState } from 'react';
import useZone from '../../hooks/useZone/useZone';

import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Heading, HeadingLevel } from 'baseui/heading';
import { Paragraph2 } from 'baseui/typography';
import { Button } from 'baseui/button';
import { Block, BlockProps } from 'baseui/block';
import { Notification, KIND } from 'baseui/notification';
import { ListItem, ListItemLabel } from 'baseui/list';
import { CheckIndeterminate } from 'baseui/icon';
import { $StyleProp } from 'styletron-react';

import { TypeEntityZone } from '../../../types/entityTypes';
import { TypeApiXferStatus } from '../../../types/baseTypes';

const ZoneFinderHeader = () => {
  const centerStyle: $StyleProp<BlockProps> = { textAlign: 'center' };
  const marginStyle: $StyleProp<BlockProps> = { marginBottom: '30px' };

  return (
    <HeadingLevel>
      <Heading styleLevel={2} $style={{ ...centerStyle, ...marginStyle }}>
        Let's get started
      </Heading>
      <Heading styleLevel={5} $style={{ ...centerStyle, ...marginStyle }}>
        Enter your zipcode to find out your plant hardiness zone
      </Heading>
    </HeadingLevel>
  );
}

const ZoneFinderForm = (props: {
  zipcode: string,
  zoneXferStatus: TypeApiXferStatus,
  setZipcode: (zipcode: string) => void,
  onZoneSave: (zipcode: string) => void,
}) => {
  const centerStyle: $StyleProp<BlockProps> = { textAlign: 'center' };
  const marginStyle: $StyleProp<BlockProps> = { marginBottom: '30px' };

  return (
    <form>
      <Block $style={{ ...marginStyle }}>
        <FormControl label={() => 'Zipcode'}>
          <Input
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              const target = e.target as HTMLInputElement;
              props.setZipcode(target.value);
            }}
          />
        </FormControl>
        <Block $style={{ ...centerStyle, ...marginStyle }}>
          <Button
            disabled={!props.zipcode}
            type="button"
            isLoading={props.zoneXferStatus.requested}
            onClick={(_e) => props.onZoneSave(props.zipcode)}
          >
            Submit
          </Button>
        </Block>
      </Block>
    </form>
  );
}

const ZoneFinderResultList = (props: { title: string, list: string[]}) => {
  const marginStyle: $StyleProp<BlockProps> = { marginBottom: '30px' };

  return props.list.length ? (
    <Block $style={{ ...marginStyle }}>
      <Heading styleLevel={6}>
        {props.title}
      </Heading>
      {props.list.map((v) => (
        <ListItem key={v} artwork={(props) => <CheckIndeterminate {...props} />}>
          <ListItemLabel>{v}</ListItemLabel>
        </ListItem>
      ))}
    </Block>
  ) : null;
}

const ZoneFinderResult = (props: { zoneState: TypeEntityZone }) => {
  const centerStyle: $StyleProp<BlockProps> = { textAlign: 'center' };
  const marginStyle: $StyleProp<BlockProps> = { marginBottom: '30px' };
  const { title, description, planting, temperature, vegetables, fruitTrees, herbs } = props.zoneState;

  return (
    <HeadingLevel>
      <Heading styleLevel={2} $style={{ ...centerStyle, ...marginStyle }}>
        You are in {title}.
      </Heading>
      <Paragraph2 $style={{ ...centerStyle, ...marginStyle }}>{description}</Paragraph2>
      <Paragraph2 $style={{ ...centerStyle, ...marginStyle }}>{planting}</Paragraph2>
      <ZoneFinderResultList title="Temperatures" list={temperature} />
      <ZoneFinderResultList title="Vegetables" list={vegetables} />
      <ZoneFinderResultList title="Fruit Trees" list={fruitTrees} />
      <ZoneFinderResultList title="Herbs" list={herbs} />
    </HeadingLevel>
  );
};

const ZoneFinderError = (props: { error: string }) => (
  <Notification
    kind={KIND.negative}
    overrides={{
      Body: {
        style: () => {
          return {
            margin: '0 auto',
          };
        },
      },
      InnerContainer: {
        style: () => {
          return {
            margin: '0 auto',
          };
        },
      },
    }}
  >
    {() => props.error}
  </Notification>
);

const ZoneFinder = () => {
  const [ zipcode, setZipcode ] = useState('');
  const { zoneState, zoneXferStatus, onZoneSave } = useZone();

  return (
    <Block width="100%" maxWidth="760px">
      <ZoneFinderHeader />
      <ZoneFinderForm
        zipcode={zipcode}
        zoneXferStatus={zoneXferStatus}
        setZipcode={setZipcode}
        onZoneSave={onZoneSave}
      />
      {zoneXferStatus.succeeded && zoneState && (
        <ZoneFinderResult zoneState={zoneState} />
      )}
      {zoneXferStatus.failed && (
        <ZoneFinderError error={zoneXferStatus.error} />
      )}
    </Block>
  );
};

export default ZoneFinder;


