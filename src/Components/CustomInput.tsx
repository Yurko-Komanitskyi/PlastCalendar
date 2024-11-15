import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

type Props = {
  onClick?: () => void;
};

const CustomDatePickerInput = React.forwardRef<HTMLDivElement, Props>(
  ({ onClick, ...rest }, ref) => (
    <div onClick={onClick} ref={ref} className="custom-date-picker" {...rest}>
      <FaCalendarAlt size={24} color="#007bff" />
    </div>
  ),
);

CustomDatePickerInput.displayName = 'CustomDatePickerInput';
export default CustomDatePickerInput;
