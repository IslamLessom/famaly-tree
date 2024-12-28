import Image from "../../../../public/line.png";
import { LegendContainer, LegendImage, LegendText } from "./Legends.styled";

const Legends = () => {
  return (
    <LegendContainer>
      <LegendImage src={Image} alt="icon" />
      <LegendText>
        Это означает что пара не вместе по каким-то причинам -
      </LegendText>
    </LegendContainer>
  );
};

export default Legends;
