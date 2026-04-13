import { useState, useRef, useEffect } from "react";
import arrowDown from "../../assets/arrow-down.png";
import arrowDownError from "../../assets/arrow-down-error.png";
import {
  Wrapper,
  Header,
  Label,
  Value,
  List,
  Item,
  ItemContent,
} from "../../styles/Dropdown.styles";

const Dropdown = ({ options, placeholder, value, onChange, suffix, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Wrapper ref={ref}>
      <Header isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} error={error}>
        <Label active={isOpen || value} error={error}>
          {placeholder}
        </Label>

        <Value>{value ? `${value}${suffix ? ` ${suffix}` : ""}` : ""}</Value>
        <img src={error ? arrowDownError : arrowDown} alt="arrow-down" />
      </Header>

      {isOpen && (
        <List>
          {options.map((opt) => (
            <Item
              key={opt}
              selected={opt === value}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
            >
              <ItemContent selected={opt === value}>
                {opt}
                {suffix}
              </ItemContent>
            </Item>
          ))}
        </List>
      )}
    </Wrapper>
  );
};

export default Dropdown;
