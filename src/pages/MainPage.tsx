import React, { FC, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonInput,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonCardContent,
  IonImg,
} from "@ionic/react";
import "./MainPage.css";
import { loginUser } from "../firebaseConfig";
import { toast } from "../toast";

const MainPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  async function login() {
    if (email && password) {
      const res = await loginUser(email, password);
      console.log("se vienenenene", res);
      if (!res) {
        toast("Las credenciales no coinciden o no existen");
      } else {
        setIsAuth(true);
      }
      console.log(`${res ? "login success" : "login failed"}`);
      console.log(res);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>TM Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {isAuth ? (
          <>
            <IonImg src="https://image.flaticon.com/icons/svg/564/564619.svg" />
            <IonTitle>"Manten presionado para</IonTitle>
            <IonTitle>activar la alerta"</IonTitle>
          </>
        ) : (
          <div className="container">
            <IonCard style={{ padding: "40px 0" }}>
              <IonCardHeader>
                <IonCardTitle className="tm-title">Iniciar Sesión</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <IonInput
                  className="input-tm"
                  value={email}
                  placeholder="Correo Electronico"
                  type="email"
                  onIonChange={(e) => setEmail(e.detail.value!)}
                />
                <IonInput
                  className="input-tm"
                  value={password}
                  placeholder="Contraseña"
                  type="password"
                  onIonChange={(e) => setPassword(e.detail.value!)}
                />
                <IonButton className="input-btn" onClick={login} type="submit">
                  Login
                </IonButton>
              </IonCardContent>
            </IonCard>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default MainPage;
