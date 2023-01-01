import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';

export default function RecoilObserver({ node, onChange }) {
  const value = useRecoilValue(node);

  useEffect(() => onChange(value), [onChange, value]);
  return null;
}

RecoilObserver.propTypes = {
  node: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
