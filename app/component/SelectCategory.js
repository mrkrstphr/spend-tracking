import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import PropTypes from 'prop-types';
import React from 'react';
import { highlightText } from 'lib';
import { useAccounts } from 'query';

export function itemsEqual(a, b) {
  return a.id === b.id;
}

export const filterCategories = (query, category, _index, exactMatch) => {
  const normalizedName = category.name.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  if (exactMatch) {
    return normalizedName === normalizedQuery;
  }
  return normalizedName.indexOf(normalizedQuery) >= 0;
};

export default function SelectCategory({ onChange, value }) {
  const { loading: accountsLoading, accounts } = useAccounts();

  return (
    <Select
      itemsEqual={itemsEqual}
      onItemSelect={onChange}
      items={accountsLoading ? [] : accounts}
      itemPredicate={filterCategories}
      itemRenderer={(category, { handleClick, modifiers, query }) => {
        if (!modifiers.matchesPredicate) {
          return null;
        }
        return (
          <MenuItem
            active={modifiers.active}
            disabled={modifiers.disabled}
            label={category.type}
            key={category.id}
            text={highlightText(category.name, query)}
            onClick={handleClick}
          />
        );
      }}
    >
      <Button
        icon="category"
        rightIcon="caret-down"
        text={value ? `${value.name}` : '(No selection)'}
      />
    </Select>
  );
}

SelectCategory.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};
