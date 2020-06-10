import React, { FC, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonModal,
  IonButton,
  IonImg,
  IonItem,
  IonSelect,
  IonLabel,
  IonSelectOption,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonInput,
  IonIcon,
  IonText,
} from "@ionic/react";
import "./MainPage.css";
import { loginUser, loginGoogle, saveData } from "../firebaseConfig";
import { toast } from "../toast";
import { compass, logOutOutline, alertCircleOutline } from "ionicons/icons";
import ReactMapGL from "react-map-gl";
import { Geolocation, Geoposition } from "@ionic-native/geolocation";
import { LottieSplashScreen } from "@ionic-native/lottie-splash-screen/ngx";

const MainPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(
    JSON.parse(localStorage.getItem("logged") || "false") === true || false
  );
  const [showModal, setShowModal] = useState(false);
  const [station, setStation] = useState([]);
  const [bus, setBus] = useState([]);
  const [submited, setSubmited] = useState(false);
  const [location, setLocation] = useState<Geoposition>();

  const stationsList = [
    { value: "marly", label: "Marly" },
    { value: "calle45", label: "Calle 45" },
    { value: "toberin", label: "Toberin" },
    { value: "portalNorte", label: "Portal Norte" },
  ];

  const getCurrentLocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      console.log(position);
      setLocation(position);
    } catch (e) {
      alert(e);
    }
  };

  async function login() {
    if (email && password) {
      const res = await loginUser(email, password);
      if (!res) {
        toast("Las credenciales no coinciden o no existen");
      } else {
        localStorage.setItem("logged", "true");
        setIsAuth(true);
      }
      console.log(`${res ? "login success" : "login failed"}`);
      console.log(res);
    }
  }
  async function googleLoggin() {
    await loginGoogle(setIsAuth);
    localStorage.setItem("logged", "true");
  }

  return (
    <IonPage>
      {isAuth ? (
        <IonIcon
          icon={logOutOutline}
          style={{
            color: "red",
            width: "1.5rem",
            height: "1.5rem",
            marginRight: "1rem",
            marginLeft: "auto",
            marginTop: "1rem",
          }}
          onClick={() => {
            localStorage.removeItem("logged");
            setEmail("");
            setPassword("");
            setIsAuth(false);
          }}
        />
      ) : (
        ""
      )}
      <IonContent>
        {isAuth ? (
          <>
            <IonContent>
              <IonModal isOpen={showModal}>
                <IonCard className="modal-content">
                  {submited ? (
                    <>
                      <IonCardHeader className="card-header--submit">
                        <IonImg
                          src="https://image.flaticon.com/icons/svg/753/753344.svg"
                          onClick={() => setShowModal(true)}
                        />
                        <IonCardTitle>Alarma Activada</IonCardTitle>
                        <IonCardSubtitle>
                          En estos momentos el personal de seguridad esta
                          informado y pronto se dirigirá a prestarte ayuda, por
                          favor espera en el lugar
                        </IonCardSubtitle>
                      </IonCardHeader>
                      <IonCardContent>
                        <IonButton
                          onClick={() => {
                            setSubmited(false);
                            setShowModal(false);
                          }}
                          color="tm-color-main"
                          className="modal__close-button--submited"
                        >
                          Ok
                        </IonButton>
                      </IonCardContent>
                    </>
                  ) : (
                    <>
                      <IonCardHeader>
                        <IonCardTitle>Datos de la alerta</IonCardTitle>
                      </IonCardHeader>
                      <div className="form__container">
                        <IonItem>
                          <IonLabel>Estacion</IonLabel>
                          <IonSelect
                            value={station}
                            placeholder="Select One"
                            onIonChange={(e) => setStation(e.detail.value)}
                            mode="ios"
                            color="tm-"
                          >
                            {stationsList.map((station, index) => (
                              <IonSelectOption
                                key={index}
                                value={station.value}
                                color="tm-color-main"
                              >
                                {station.label}
                              </IonSelectOption>
                            ))}
                          </IonSelect>
                        </IonItem>
                        <IonItem>
                          <IonLabel>Bus</IonLabel>
                          <IonSelect
                            value={bus}
                            placeholder="Select One"
                            onIonChange={(e) => setBus(e.detail.value)}
                            mode="ios"
                          >
                            <IonSelectOption value="B12">B12</IonSelectOption>
                            <IonSelectOption value="H20">H20</IonSelectOption>
                            <IonSelectOption value="F28">F28</IonSelectOption>
                          </IonSelect>
                        </IonItem>
                        {location ? (
                          <IonItem>
                            <ReactMapGL
                              width={300}
                              height={150}
                              latitude={location.coords.latitude || 37.757}
                              longitude={location.coords.longitude || -122.4376}
                              zoom={13}
                              mapboxApiAccessToken={
                                "pk.eyJ1IjoicHJpbWVyZnV0IiwiYSI6ImNrOHoxcHFjaTFlNGMzbGxkN20zZjMxNmkifQ.8UCCP45HlyOn-7rCubsUwg"
                              }
                            />
                          </IonItem>
                        ) : (
                          <IonItem
                            onClick={() => {
                              getCurrentLocation();
                            }}
                          >
                            <IonIcon icon={compass} />
                            <IonLabel>Incluir Geolocalizacion</IonLabel>
                          </IonItem>
                        )}
                        <IonButton
                          onClick={() => {
                            console.log("Data send");
                            const time = new Date();
                            saveData(
                              {
                                station,
                                bus,
                                location: location ? location : "",
                                time: time.toLocaleTimeString(),
                              },
                              "Alert"
                            );
                            location &&
                              console.log(
                                `Location: (${location.coords.latitude}, ${location.coords.longitude} ), Vagon:${bus}, Estacion: ${station} `
                              );
                            setStation([]);
                            setBus([]);
                            setLocation(undefined);
                            setSubmited(true);
                          }}
                          color="tm-color-main"
                          className="modal__close-button"
                          disabled={!(bus && station)}
                        >
                          Activar Alarma
                        </IonButton>
                      </div>
                    </>
                  )}
                </IonCard>
              </IonModal>
              <div style={{ height: "100%" }}>
                <IonCardTitle>Bienvenido a Tm App</IonCardTitle>

                <IonImg
                  src="https://i.ibb.co/pnj4sWV/animation-640-kb9l4w4d.gif"
                  onClick={() => setShowModal(true)}
                />
                <IonCardSubtitle>"Manten presionado para</IonCardSubtitle>

                <IonCardSubtitle>activar la alerta"</IonCardSubtitle>
                <IonCardSubtitle> 🙋 </IonCardSubtitle>
              </div>
            </IonContent>
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
                <div className="button__list">
                  <IonButton
                    className="input-btn"
                    onClick={login}
                    type="submit"
                  >
                    Login
                  </IonButton>
                  <IonButton
                    className=" google-button"
                    onClick={googleLoggin}
                    type="submit"
                    fill="clear"
                  >
                    <IonImg
                      src="https://img.icons8.com/color/480/google-logo.png"
                      alt="google icon"
                      class="google-button__icon"
                    />
                    Google
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        )}
      </IonContent>
      {isAuth ? (
        <IonItem routerLink="/alertas-hoy">
          <div className="bottom-navigation">
            <IonIcon
              icon={alertCircleOutline}
              style={{
                color: "red",
                width: "1.5rem",
                height: "1.5rem",
              }}
            />
            <IonCardSubtitle>Alertas de Hoy</IonCardSubtitle>
          </div>
        </IonItem>
      ) : (
        ""
      )}
    </IonPage>
  );
};

export default MainPage;
