import { Button } from "antd";
import { PersonalInfoModal } from "../PersonalInfoModal/PersonalInfoModal";
import { updateUserInfo } from "../../api/UpdateUserInfo/UpdateUserInfo";
import { useState } from "react";
import { UserInfo } from "../../../../entities/user/ui/UserMoreInfo/UserMoreInfo";

// Компонент ButtonModal
interface ButtonModalProps {
  userId: string;
}

export const ButtonModal = ({ userId }: ButtonModalProps) => {
  const [visible, setVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const showModal = (editing: boolean) => {
    setIsEditing(editing);
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
    setIsEditing(false);
  };

  const handleSave = async (values: UserInfo) => {
    try {
      console.log(userId);
      await updateUserInfo({ ...values, userId });
    } catch (error) {
      console.error("Ошибка при обновлении информации:", error);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      {isEditing ? (
        <>
          <Button
            style={{ marginTop: "10px" }}
            type="primary"
            onClick={() => showModal(true)}
          >
            Редактировать информацию
          </Button>
          <PersonalInfoModal
            visible={visible}
            onClose={handleClose}
            onSave={handleSave}
            isEditing={isEditing}
            userId={userId}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
