import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

export default (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { className, disabled, children } = props;
  const classes = classNames('btn-primary', {
    'btn-primary-disabled': disabled,
    className,
  });

  return (
    <button className={classes} onClick={props.onClick} disabled={disabled}>
      <span className="text">{children}</span>
    </button>
  );
};
