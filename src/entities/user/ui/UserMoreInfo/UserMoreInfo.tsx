import { Col, Row } from "antd";

import { Divider } from "antd";

// Интерфейс для информации о пользователе
export interface UserInfo {
  fullName: string;
  lastName: string;
  city: string;
  country: string;
  birthday: string;
  website: string;
  comment: string;
  position: string;
  hobby: string;
  achievements: string;
  email: string;
  phone: string;
}

// Компонент UserMoreInfo
interface UserMoreInfoProps {
  userId: string;
  editable?: boolean;
  renderFormItem?: (name: keyof UserInfo, title: string) => React.ReactNode;
}

export const UserMoreInfo = ({
  renderFormItem = (title: string) => <span>{title}</span>,
}: UserMoreInfoProps) => {
  const fieldConfig = [
    { name: "fullName", title: "Полное Имя", span: 12 },
    { name: "lastName", title: "Фамилия", span: 12 },
    { name: "city", title: "Город", span: 12 },
    { name: "country", title: "Страна", span: 12 },
    { name: "birthday", title: "День рождения", span: 12 },
    { name: "website", title: "Личный сайт", span: 12 },
    { name: "comment", title: "Комментарий", span: 12 },
    { name: "position", title: "Место работы", span: 12 },
    { name: "hobby", title: "Хобби", span: 12 },
    { name: "achievements", title: "Достижения", span: 12 },
    { name: "email", title: "Email", span: 12 },
    { name: "phone", title: "Телефон", span: 12 },
  ];

  const renderSection = (fields: any, title: any) => (
    <>
      {title && (
        <>
          <Divider />
          <p className="site-description-item-profile-p">{title}</p>
        </>
      )}
      <Row>
        {fields.map(
          ({
            name,
            title,
            span,
          }: {
            name: keyof UserInfo;
            title: string;
            span: number;
          }) => (
            <Col key={name} span={span}>
              <div className="site-description-item-profile-wrapper">
                <p className="site-description-item-profile-p-label">
                  {title}:
                </p>
                {renderFormItem(name, title)}
              </div>
            </Col>
          )
        )}
      </Row>
    </>
  );

  return (
    <div>
      {renderSection(fieldConfig.slice(0, 7), "Основная информация")}
      {renderSection(fieldConfig.slice(7, 10), "Место работы-хобби")}
      {renderSection(fieldConfig.slice(10), "Контакты")}
    </div>
  );
};
