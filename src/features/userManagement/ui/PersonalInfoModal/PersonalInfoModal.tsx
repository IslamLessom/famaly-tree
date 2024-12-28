import { Button, Form, Input, Modal } from "antd";
import {
  UserInfo,
  UserMoreInfo,
} from "../../../../entities/user/ui/UserMoreInfo/UserMoreInfo";

import { useEffect, useState } from "react";
import { getUserInfo } from "../../api/GetUserInfo/GetUserInfo";
import { updateUserInfo } from "../../api/UpdateUserInfo/UpdateUserInfo";

// Компонент PersonalInfoModal
interface PersonalInfoModalProps {
  visible: boolean;
  onClose: () => void;
  userId: string;
}

export const PersonalInfoModal = ({
  visible,
  onClose,
  userId,
}: PersonalInfoModalProps) => {
  const [form] = Form.useForm();
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const renderFormItem = (name: keyof UserInfo, title: string) => {
    if (isEditing) {
      return (
        <Form.Item
          name={name}
          rules={[
            {
              required:
                name === "fullName" || name === "lastName" || name === "email",
              message: `Поле ${title} обязательно для заполнения`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      );
    }
    return <span>{userData?.[name] || "-"}</span>;
  };
  useEffect(() => {
    if (visible && userId) {
      const fetchUserInfo = async () => {
        try {
          if (!userId.trim()) {
            console.error("userId не может быть пустым");
            return;
          }
          const data = await getUserInfo(userId);
          // Ensure all required fields are present before setting state
          const userInfo: UserInfo = {
            fullName: data.fullName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            city: data.city || "",
            phone: data.phone || "",
            position: data.position || "",
            country: data.country || "",
            birthday: data.birthday || "",
            website: data.website || "",
            comment: data.comment || "",
            hobby: data.hobby || "",
            achievements: data.achievements || "",
          };
          setUserData(userInfo);
          form.setFieldsValue(userInfo);
        } catch (error) {
          console.error(
            "Ошибка при получении информации о пользователе:",
            error
          );
        }
      };
      fetchUserInfo();
    }
  }, [visible, userId, form]);

  const handleSubmit = async (values: UserInfo) => {
    try {
      const updatedValues = {
        ...values,
        userId: userId,
      };
      console.log(updatedValues);

      await updateUserInfo(updatedValues); // Call updateUserInfo directly here
      setUserData(updatedValues);
      setIsEditing(false);
      onClose();
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      form.setFieldsValue(userData);
    }
    setIsEditing(!isEditing);
  };

  return (
    <Modal
      title="Информация о человеке"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button
          key="edit"
          type={isEditing ? "default" : "primary"}
          onClick={handleEditToggle}
        >
          {isEditing ? "Отменить редактирование" : "Редактировать"}
        </Button>,
        isEditing && (
          <Button key="save" type="primary" onClick={() => form.submit()}>
            Сохранить
          </Button>
        ),
        <Button key="cancel" onClick={onClose}>
          Закрыть
        </Button>,
      ].filter(Boolean)}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <UserMoreInfo
          editable={isEditing}
          userId={userId}
          renderFormItem={renderFormItem}
        />
      </Form>
    </Modal>
  );
};
