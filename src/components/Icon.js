import React from 'react';
import PropTypes from 'prop-types';
import Icons from '../assets/Icons';

const Icon = ({
  name, width, height, color
}) => {
  const SelectedIcon = Icons[name];
  return <SelectedIcon width={width} height={height} color={color} />;
};
Icon.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};
export default Icon;
