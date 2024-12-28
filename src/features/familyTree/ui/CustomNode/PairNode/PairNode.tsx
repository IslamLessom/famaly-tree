import { memo, useState } from "react";
import { Position } from "@xyflow/react";
import Image from "../../../../../../public/image.png";
import {
  AgePerson,
  ContainerChild,
  FullContainer,
  HandleStyle,
  NamePerson,
  Node,
  NodeContainer,
  NodeImage,
  PairContinerForImageStyle,
  PairContinerForInfoUserStyle,
} from "./PairNode.styled";
import { PersonalInfoModal } from "../../../../userManagement/ui/PersonalInfoModal/PersonalInfoModal";

export const PairNode = memo(({ data }: { data: any }) => {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatBirthday = (dateString: string | number | Date | null) => {
    if (!dateString) return "";
    return new Date(dateString)
      .toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, ".");
  };

  const { members = [] } = data;
  const [firstMember, secondMember] = members;

  const handleMemberClick = (memberId: string) => {
    setSelectedMemberId(memberId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMemberId(null);
  };

  return (
    <NodeContainer>
      <Node>
        <HandleStyle type="target" position={Position.Top} />
        <FullContainer>
          <ContainerChild>
            <PairContinerForImageStyle>
              <NodeImage
                src={Image}
                alt=""
                onClick={() =>
                  firstMember?._id && handleMemberClick(firstMember._id)
                }
                style={{ cursor: "pointer" }}
              />
              <NodeImage
                src={Image}
                alt=""
                onClick={() =>
                  secondMember?._id && handleMemberClick(secondMember._id)
                }
                style={{ cursor: "pointer" }}
              />
            </PairContinerForImageStyle>
            <PairContinerForInfoUserStyle>
              <div
                onClick={() =>
                  firstMember?._id && handleMemberClick(firstMember._id)
                }
                style={{ cursor: "pointer" }}
              >
                <NamePerson style={{ color: "red" }}>
                  {firstMember?.name}
                </NamePerson>
                <AgePerson>{formatBirthday(firstMember?.birthday)}</AgePerson>
              </div>
              <div
                onClick={() =>
                  secondMember?._id && handleMemberClick(secondMember._id)
                }
                style={{ cursor: "pointer" }}
              >
                <NamePerson>{secondMember?.name}</NamePerson>
                <AgePerson>{formatBirthday(secondMember?.birthday)}</AgePerson>
              </div>
            </PairContinerForInfoUserStyle>
          </ContainerChild>
        </FullContainer>
        <HandleStyle type="source" position={Position.Bottom} />
      </Node>

      {selectedMemberId && (
        <PersonalInfoModal
          visible={isModalOpen}
          onClose={handleCloseModal}
          userId={selectedMemberId}
        />
      )}
    </NodeContainer>
  );
});
