import axios from "axios";
import { message } from "antd";

const API_URL = "http://localhost:8000";

interface UserUpdateData {
  userId: string;
  fullName?: string;
  lastName?: string;
  city?: string;
  country?: string;
  birthday?: string;
  website?: string;
  comment?: string;
  position?: string;
  hobby?: string;
  achievements?: string;
  email?: string;
  phone?: string;
}

export const updateUserInfo = async (data: UserUpdateData) => {
  try {
    const { userId, ...userData } = data;

    if (!userId || typeof userId !== "string") {
      throw new Error("Некорректный ID пользователя");
    }

    console.log("Отправляемые данные:", { userId, userData }); // Для отладки

    const response = await axios.put(
      `${API_URL}/user-info/${userId}`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    message.success("Информация успешно обновлена");
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении данных:", error);
    message.error("Ошибка при обновлении данных");
    throw error;
  }
};
