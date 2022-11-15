import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyleInput = styled.input`
  &:hover {
    color: red;
  }
`;

const Test = styled.div`
  color: blue;
`;

const Div = styled.div`
  background-color: yellow;

  .uru {
    color: green;
  }
`;

function Input({ value, ...props }) {
  const ref = useRef();
  useEffect(() => {
    const rules = document.styleSheets[0].cssRules;

    document.styleSheets[0].insertRule(
      '.uru:hover { line-height: 1.5; font-size: 1.5em; }',
      rules.length,
    );

    for (let i = 0; i < rules.length; i += 1) {
      // console.log(rules[i].style.backgroundColor);
    }
  }, []);

  const button = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    background: '#1890ff',
    color: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
    transition: '.3s background',

    // '&:hover': {
    //   background: '#40a9ff',
    //   color: 'red',
    // },
  };

  return (
    <React.Fragment ref={ref}>
      {/* <Div> */}
      <StyleInput
        datacustomattribute="👋"
        // style={button}
        value={value}
        {...props}
      />
      <div className="uru">hihi</div>
      {/* </Div> */}
    </React.Fragment>
  );
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Input;
