import { FC, ReactNode } from 'react';
import { getClassName } from '../../helpers/getClassName';
import { classNames } from '../../lib/classNames';
import Tappable, { TappableProps } from '../Tappable/Tappable';
import Title from '../Typography/Title/Title';
import Text from '../Typography/Text/Text';
import Subhead from '../Typography/Subhead/Subhead';
import Caption from '../Typography/Caption/Caption';
import { HasAlign } from '../../types';
import { usePlatform } from '../../hooks/usePlatform';
import { AdaptivityProps, SizeType, withAdaptivity } from '../../hoc/withAdaptivity';
import { Platform, IOS, VKCOM } from '../../lib/platform';
import { useExternRef } from '../../hooks/useExternRef';

export interface VKUIButtonProps extends HasAlign {
  mode?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'commerce' | 'destructive' | 'overlay_primary' | 'overlay_secondary' | 'overlay_outline';
  size?: 's' | 'm' | 'l';
  stretched?: boolean;
  before?: ReactNode;
  after?: ReactNode;
}

export interface ButtonProps extends Omit<TappableProps, 'size'>, VKUIButtonProps {}

interface ButtonTypographyProps {
  size: ButtonProps['size'];
  platform: Platform;
  sizeY: AdaptivityProps['sizeY'];
  children?: ButtonProps['children'];
  Component?: TappableProps['Component'];
}

const ButtonTypography: FC<ButtonTypographyProps> = (props: ButtonTypographyProps) => {
  const { size, sizeY, platform, ...restProps } = props;

  switch (size) {
    case 'l':
      if (sizeY === SizeType.COMPACT) {
        return <Text weight="medium" {...restProps} />;
      }

      return <Title level="3" weight="medium" {...restProps} />;
    case 'm':
      if (sizeY === SizeType.COMPACT) {
        return <Subhead weight={platform === VKCOM ? 'regular' : 'medium'} {...restProps} />;
      }

      return <Text weight="medium" {...restProps} />;
    case 's':
    default:
      if (platform === IOS) {
        return <Subhead weight="medium" {...restProps} />;
      }

      if (platform === VKCOM) {
        return <Caption level="1" weight="regular" {...restProps} />;
      }

      if (sizeY === SizeType.COMPACT) {
        return <Caption level="1" weight="medium" {...restProps} />;
      }

      return <Subhead weight="medium" {...restProps} />;
  }
};

const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const platform = usePlatform();
  const { size, mode, stretched, align, children, before, after, getRootRef, Component, sizeY, ...restProps } = props;
  const hasIcons = Boolean(before || after);
  const RenderedComponent = restProps.href ? 'a' : Component;
  const ref = useExternRef(getRootRef);

  return <Tappable {...restProps}
    vkuiClass={
      classNames(
        getClassName('Button', platform),
        `Button--sz-${size}`,
        `Button--lvl-${mode}`,
        `Button--aln-${align}`,
        `Button--sizeY-${sizeY}`,
        {
          ['Button--str']: stretched,
          ['Button--with-icon']: hasIcons,
        },
      )
    }
    getRootRef={ref}
    Component={RenderedComponent}
    activeMode="opacity"
  >
    <span vkuiClass="Button__in">
      {before && <span vkuiClass="Button__before">{before}</span>}
      {children && (
        <ButtonTypography
          size={size}
          sizeY={sizeY}
          platform={platform}
          vkuiClass="Button__content"
          Component="span"
        >
          {children}
        </ButtonTypography>
      )}
      {after && <span vkuiClass="Button__after">{after}</span>}
    </span>
  </Tappable>;
};

Button.defaultProps = {
  mode: 'primary',
  Component: 'button',
  align: 'center',
  size: 's',
  stretched: false,
  stopPropagation: true,
};

export default withAdaptivity(Button, {
  sizeY: true,
});
