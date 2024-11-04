import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import {
  AdminContainer,
  Container,
  ContainerBlock,
  CreateContainer,
  Title,
} from "./Admin.styled";
import { FamilyMembers } from "../../widgets/FamilyMembers/FamilyMembers";
import { FamilyMember, IFamilyNode } from "./types/Types";
import FamilyMemberForm from "../../widgets/FamilyMemberForm/FamilyMemberForm";
import axios from "axios";
import SpouseEdit from "../../widgets/SpouseEdit/SpouseEdit";
import { Tabs, TabsProps } from "antd";

const Admin = () => {
  const [activeFamilyMemberId, setActiveFamilyMemberId] = useState<
    string | null
  >(null);
  const [familyMembers, setFamilyMembers] = useState<Array<FamilyMember>>([]);
  const [familyNodes, setFamilyNodes] = useState<IFamilyNode[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/tree");
        setFamilyMembers(response.data);
        setFamilyNodes(
          response.data.map((node: any) => {
            // FIX
            const { _id, __v, ...rest } = node;

            return {
              id: _id,
              data: {
                rest,
              },
            };
          })
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreateFamilyMember = async (
    createdFamilyMember: FamilyMember
  ) => {
    setFamilyMembers((prev) => [
      ...prev,
      {
        _id: uuid(),
        ...createdFamilyMember,
      },
    ]);
  };

  const updateFamilyMember = (updatedMember: FamilyMember) => {
    setFamilyMembers((prev) =>
      prev.map((member) => {
        return member._id === updatedMember?._id ? updatedMember : member;
      })
    );
    setActiveFamilyMemberId(null);
  };

  const onEdit = (_id: string | null) => {
    setActiveFamilyMemberId(_id);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tab 1",
      children: (
        <ContainerBlock>
          <FamilyMemberForm
            onSave={handleCreateFamilyMember}
            familyMembers={familyMembers}
          />
        </ContainerBlock>
      ),
    },
    {
      key: "2",
      label: "Tab 2",
      children: <SpouseEdit />,
    },
  ];
  console.log("famaly memver", familyMembers);
  return (
    <AdminContainer>
      <Container>
        <FamilyMembers
          onEdit={onEdit} // Pass onEdit function
        />
        {activeFamilyMemberId != null ? (
          <CreateContainer>
            <Title>Edit Node</Title>
            <ContainerBlock>
              <FamilyMemberForm
                familyMember={familyMembers.find(
                  (member) => member._id === activeFamilyMemberId
                )}
                familyMembers={familyMembers}
                onSave={updateFamilyMember}
              />
            </ContainerBlock>
          </CreateContainer>
        ) : (
          <CreateContainer>
            <Title>Create Node</Title>
            <Tabs
              style={{ marginLeft: "30px" }}
              defaultActiveKey="1"
              items={items}
            />
            ;
          </CreateContainer>
        )}
      </Container>
    </AdminContainer>
  );
};

export default Admin;
