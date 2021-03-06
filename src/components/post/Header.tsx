import styled from "@emotion/styled";
import { caption, h5 } from "../../style/text";

type Props = {
  title: string;
  date: string;
  className?: string
}

function Header({ title, date, className }: Props) {
  return (
    <div className={className}>
      <Title>{title}</Title>
      <Date>{date}</Date>
    </div>
  )
}

const Title = styled.h5`
  ${h5};
  margin: 0;
`

const Date = styled.span`
  ${caption}
`

export default Header