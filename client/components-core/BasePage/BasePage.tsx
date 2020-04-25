import * as React from 'react';
import { Block, BlockProps } from 'baseui/block';
import Header from '../../components-core/Header/Header';
import Footer from '../../components-core/Footer/Footer';

export default (props: { children: any }) => {
  const wrapperBlockProps: BlockProps = {
    paddingLeft: '5%',
    paddingRight: '5%',
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
  };
  const headerBlockProps: BlockProps = {
    paddingTop: '5%',
    paddingBottom: '5%',
  }
  const footerBlockProps: BlockProps = {
    paddingTop: '5%',
    paddingBottom: '5%',
  };

  return (
    <Block {...wrapperBlockProps}>
      <Block {...headerBlockProps}><Header /></Block>
      {props.children}
      <Block {...footerBlockProps}><Footer /></Block>
    </Block>
  );
}
