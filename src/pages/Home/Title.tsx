import classNames from 'classnames';

const Title = (props: any) => {
  const classes = classNames('s-title', props.className);
  return <span className={classes}>{props.children}</span>;
};

export default Title;
