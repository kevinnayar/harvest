import * as React from 'react';
import { useState, useEffect } from 'react';
import { timeTrimUtc } from '../../../utils/numberUtils';
import useAuth from '../../hooks/useAuth/useAuth';
import usePlant from '../../hooks/usePlant/usePlant';
import config from '../../config';

import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import { Block, BlockProps } from 'baseui/block';
import { Select, Value } from 'baseui/select';
import { Datepicker } from 'baseui/datepicker';
import { $StyleProp } from 'styletron-react';

const AddPlant = () => {
  const { jwtToken, userId, onAuthCheck, userState } = useAuth();
  const { plantCreateXferStatus, onPlantCreate } = usePlant();

  const [plantName, setPlantName] = useState('');
  const [plantCategory, setPlantCategory] = useState<Value>([{ label: 'Vegetables', id: 'vegetables' }]);
  const [plantDate, setPlantDate] = React.useState<Date>();

  const centerStyle: $StyleProp<BlockProps> = { textAlign: 'center' };
  const marginStyle: $StyleProp<BlockProps> = { marginBottom: '16px' };

  useEffect(() => {
    if (!userState.authenticated) {
      onAuthCheck();
    }
  }, [userState.authenticated]);

  return (
    <Block width="100%" maxWidth="760px">
      <form>
        <Block $style={{ ...marginStyle }}>
          <FormControl label={() => 'Plant'}>
            <Input
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                const target = e.target as HTMLInputElement;
                setPlantName(target.value);
              }}
            />
          </FormControl>
          <Block $style={{ ...marginStyle }}>
            <FormControl label={() => 'Planting Category'}>
              <Select
                options={[
                  { label: 'Vegetables', id: 'vegetables' },
                  { label: 'Fruit Trees', id: 'fruitTrees' },
                  { label: 'Herbs', id: 'herbs' },
                ]}
                labelKey="label"
                valueKey="id"
                value={plantCategory}
                onChange={({ value }) => setPlantCategory(value)}
                required
                clearable={false}
              />
            </FormControl>
          </Block>
          <Block $style={{ ...marginStyle }}>
            <FormControl label={() => 'Planting Date'}>
              <Datepicker
                value={plantDate}
                onChange={({ date }) => setPlantDate(Array.isArray(date) ? date[0] : date)}
                clearable
              />
            </FormControl>
          </Block>
          <Block $style={{ ...centerStyle, ...marginStyle }}>
            <Button
              disabled={!plantName}
              type="button"
              onClick={async (_e) => {
                if (jwtToken && userId) {
                  const category = plantCategory[0].id as string;
                  const datePlantedMaybe: void | number = !!plantDate
                    ? timeTrimUtc(plantDate.getTime())
                    : undefined;
                  onPlantCreate(jwtToken, userId, plantName, category, datePlantedMaybe);
                }
              }}
            >
              Add Plant
            </Button>
          </Block>
        </Block>
      </form>
    </Block>
  );
};

export default AddPlant;