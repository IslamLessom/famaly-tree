import React, { useEffect, useState } from "react";
import { List, Typography, Spin, message } from "antd";
import axios from "axios";
import {
  SpouseContainerStyle,
  SpouseEditContainerStyle,
} from "./SpouseEdit.styled";

const { Title } = Typography;

interface ItemProps {
  _id: string;
  spouse1: string; // ID of spouse1
  spouse2: string; // ID of spouse2
  isDivorced: boolean; // Changed to boolean for better representation
}

interface FamilyMember {
  _id: string;
  name: string; // Assuming each family member has a name field
}

function SpouseEdit() {
  const [spouses, setSpouses] = useState<ItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const spousesResponse = await axios.get(
          "http://localhost:8000/spouses"
        );
        setSpouses(spousesResponse.data); // Assuming response.data is an array of spouse objects

        // Fetch family members
        const membersResponse = await axios.get("http://localhost:8000/tree");
        setFamilyMembers(membersResponse.data);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/spouses/${id}`);
      setSpouses(spouses.filter((spouse) => spouse._id !== id)); // Update state to remove deleted spouse
      message.success("Spouse deleted successfully!");
    } catch (error) {
      console.error("Error deleting spouse:", error);
      message.error("Failed to delete spouse.");
    }
  };

  if (loading) return <Spin size="large" />; // Show loading spinner while fetching data

  // Create a map for quick lookup of family member names by ID
  const memberMap = familyMembers.reduce((acc, member) => {
    acc[member._id] = member.name; // Assuming each member has an _id and name
    return acc;
  }, {} as Record<string, string>);

  return (
    <SpouseEditContainerStyle>
      <SpouseContainerStyle>
        <Title level={4}>List of Spouses</Title>
        <List
          bordered
          dataSource={spouses}
          renderItem={(item: ItemProps) => (
            <List.Item
              actions={[
                <a key="list-loadmore-edit">edit</a>,
                <a
                  key="list-loadmore-delete"
                  onClick={() => handleDelete(item._id)}
                >
                  delete
                </a>,
              ]}
            >
              <Typography.Text mark>Id: {item._id}</Typography.Text>{" "}
              <Typography.Text mark>
                Source: {memberMap[item.spouse1] || item.spouse1}{" "}
                {/* Display name instead of ID */}
              </Typography.Text>
              {"   "}
              <Typography.Text mark>
                Target: {memberMap[item.spouse2] || item.spouse2}
                {"   "}
                {/* Display name instead of ID */}
              </Typography.Text>
              {"  "}
              <Typography.Text mark>
                isDivorced: {item.isDivorced}
              </Typography.Text>{" "}
            </List.Item>
          )}
        />
      </SpouseContainerStyle>
    </SpouseEditContainerStyle>
  );
}

export default SpouseEdit;
