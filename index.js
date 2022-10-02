import React, { useState, useEffect, memo, Component } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  text,
}) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      onClick={()=>onClickHandler(index)}
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({
  items,
}) => {
  const [selectedIndex,setSelectedIndex] = useState();

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = index => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem key={index}
          onClickHandler={handleClick}
          text={item.text}
          index={index}
          isSelected={selectedIndex}
        />
      ))}
    </ul>
  )
};

WrappedListComponent.propTypes = {
  items: PropTypes.array(PropTypes.shape({
    text: PropTypes.string.isRequired,
  })),
};

WrappedListComponent.defaultProps = {
  items: null,
};

const List = memo(WrappedListComponent);

export default List;




// 1.Explain what the simple List component does.
// Ans : The component consist of menu items which is basically responsible for rendering the items using map function.

// 2.What problems / warnings are there with code?
// ANS : (i)usestate is function which takes initial value as an argument and return the current state as first parameter
//  and set method as 2nd parameter. but here we can see the code returns set method as a first parameter
//  so the order is not maintained.
 
//  (ii)We should use arrow function to call event  handler rather directly calling event handler as it will automatically get executed
//  (iii)propTypes.shapeOf() is an invalid syntax . We should use PropTypes.shape().


// 3.Please fix, optimize, and/or modify the component as much as you think is necessary.
// ANS: Whenever making lists of components in Javascript, users must use a special word attribute called "key". React uses keys to indicate whether
//  additional burdens have been modified, removed, or altered. Or, to put it another way, designers may say that keywords
//   are applied to identify the components in collections.We should use index as a key which provides a unique value to all items.



