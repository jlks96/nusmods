// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import type { State } from 'reducers';
import type { ModuleCodeMap } from 'types/reducers';

import { modulePage } from 'views/routes/paths';
import { replaceWithNode } from 'utils/react';

type Props = {
  children: string,
  moduleCodes: ModuleCodeMap,
  className?: string,
};

// Look for strings that look like module codes - eg.
// ACC1010  - 3 chars, 4 digits, no suffix
// CS1010FC - 2 chars, 4 digits, 2 chars
// CS2014R  - 2 chars, 4 digits, 1 char
// BMA 5001 - 3 chars, space, 4 digits
const MODULE_CODE_REGEX = /\b(\w{2,3}\s*\d{4}\w{0,2})\b/g;

export function LinkModuleCodesComponent(props: Props) {
  const { children, moduleCodes, className } = props;

  return replaceWithNode(children, MODULE_CODE_REGEX, (part, i) => {
    const code = part.replace(/\s*/g, '');
    const module = moduleCodes[code];
    if (!module) return part;
    return (
      <Link
        className={className}
        title={module.ModuleTitle}
        to={modulePage(code, module.ModuleTitle)}
        key={i}
      >
        {part}
      </Link>
    );
  });
}

// Type annotation is workaround for https://github.com/flowtype/flow-typed/issues/1269
// Exclude dispatch from props
export default connect(
  (state: State) => ({
    moduleCodes: state.moduleBank.moduleCodes,
  }),
  null,
)(LinkModuleCodesComponent);
