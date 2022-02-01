import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { colors } from '../../Styles/colors';

const BottomSheet = ({
  refSheet,
  height,
  closeOnDragDown,
  children,
  style,
}) => {
  return (
    <RBSheet
      ref={refSheet}
      closeOnDragDown={closeOnDragDown}
      height={height}
      customStyles={{
        wrapper: {
          backgroundColor: "transparent"
        },
        draggableIcon: {
          backgroundColor: "#000"
        },
        container: {
          ...style,
          backgroundColor: colors.backgroundColor,
        },
      }}
    >
      {children}
    </RBSheet>
  );
};
export default BottomSheet;
