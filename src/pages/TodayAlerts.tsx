import React, { FC, useEffect, useState } from "react";
import { homeOutline, logOut, logOutOutline } from "ionicons/icons";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonItem,
  IonIcon,
  IonCardTitle,
  IonCardSubtitle,
  IonAlert,
  IonRouterLink,
} from "@ionic/react";
import "./TodayAlerts.css";
import { getAllData, deleteData } from "../firebaseConfig";

const TodayAlerts: FC = () => {
  const [alertsData, setAlertsData] = useState([
    { key: "", value: { time: "", station: "", bus: "" } },
  ]);
  const [showAlert, setShowAlert] = useState("");

  useEffect(() => {
    const temp = async () => {
      await getAllData("Alert", setAlertsData);
    };
    temp();
  }, []);

  const deleteAlert = async (key: string) => {
    await deleteData("Alert", key);
    await getAllData("Alert", setAlertsData);
  };

  return (
    <IonPage>
      <IonRouterLink
        color="secondary"
        href="/"
        onClick={() => localStorage.removeItem("logged")}
        style={{
          marginLeft: "auto",
          marginRight: "0.5rem",
          marginTop: "0.5rem",
        }}
      >
        <IonIcon
          icon={logOutOutline}
          style={{
            color: "red",
            width: "1.5rem",
            height: "1.5rem",
            marginLeft: "auto",
            marginRight: "0.5rem",
            marginTop: "0.5rem",
          }}
          onClick={() => localStorage.removeItem("logged")}
        />
      </IonRouterLink>
      <IonContent>
        <h1>Alertas de Hoy</h1>

        <IonGrid>
          <IonRow>
            <IonCol>
              <div>Hora</div>
            </IonCol>
            <IonCol>
              <div>Estacion</div>
            </IonCol>
            <IonCol>
              <div>Bus</div>
            </IonCol>
          </IonRow>
          {alertsData.map((item) => {
            return (
              <IonRow onClick={() => setShowAlert(item.key)} key={item.key}>
                <IonCol col-6>
                  <div>{item.value.time}</div>
                </IonCol>
                <IonCol>
                  <div>{item.value.station}</div>
                </IonCol>
                <IonCol>
                  <div>{item.value.bus}</div>
                </IonCol>
              </IonRow>
            );
          })}
        </IonGrid>
        <IonAlert
          isOpen={showAlert ? true : false}
          onDidDismiss={() => setShowAlert("")}
          header={"Estas Seguro?!"}
          message={
            "Estas a punto de ayudar a una persona, recuerda que.... <strong>Te estará esperando</strong>!!!"
          }
          buttons={[
            {
              text: "Cancelar",
              role: "cancel",
              cssClass: "secondary",
              handler: () => {},
            },
            {
              text: "Okay",
              handler: () => {
                deleteAlert(showAlert);
              },
            },
          ]}
        />
      </IonContent>
      <IonCardSubtitle style={{ margin: "0 auto", marginBottom: "1.5rem" }}>
        🤗 Haz click en la alerta para ir a tomarla
      </IonCardSubtitle>
      <IonItem routerLink="/">
        <div className="bottom-navigation">
          <IonIcon
            icon={homeOutline}
            style={{
              color: "red",
              width: "1.5rem",
              height: "1.5rem",
            }}
          />
          <IonCardSubtitle>Dashboard</IonCardSubtitle>
        </div>
      </IonItem>
    </IonPage>
  );
};

export default TodayAlerts;
