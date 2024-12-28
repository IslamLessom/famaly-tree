import { memo, useState } from "react";
import { Position } from "@xyflow/react";
import Image from "../../../../../../public/image.png";
import {
  AgePerson,
  ContainerChild,
  ContainerPerson,
  FullContainer,
  HandleStyle,
  NamePerson,
  Node,
  NodeContainer,
  NodeImage,
} from "./CustomNode.styled";
import { PersonalInfoModal } from "../../../../userManagement/ui/PersonalInfoModal/PersonalInfoModal";

// Интерфейс для члена
interface Member {
  _id: string;
  name: string;
  birthday: string | Date;
  [key: string]: any;
}

// Интерфейс для пропсов CustomNode
interface CustomNodeProps {
  data: {
    member: Member;
  };
}

// Компонент CustomNode
export const CustomNode = memo(({ data }: CustomNodeProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { member } = data;

  const formatBirthday = (date: string | Date): string => {
    try {
      return new Date(date)
        .toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, ".");
    } catch {
      return "";
    }
  };

  const formattedDate = formatBirthday(member.birthday);

  return (
    <NodeContainer>
      <div onClick={() => setIsModalOpen(true)} style={{ cursor: "pointer" }}>
        <Node>
          <HandleStyle type="target" position={Position.Top} />
          <FullContainer>
            <ContainerChild>
              <NodeImage src={Image} alt={member.name} />
              <ContainerPerson>
                <NamePerson>{member.name}</NamePerson>
                <AgePerson>{formattedDate}</AgePerson>
                <AgePerson>13.06.2023</AgePerson>
              </ContainerPerson>
            </ContainerChild>
          </FullContainer>
          <HandleStyle type="source" position={Position.Bottom} />
        </Node>
      </div>

      <PersonalInfoModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={member._id}
      />
    </NodeContainer>
  );
});
