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
  IonIcon,
} from "@ionic/react";
import "./MainPage.css";
import { compass } from "ionicons/icons";
import ReactMapGL from "react-map-gl";
import { Geolocation, Geoposition } from "@ionic-native/geolocation";

const MainPage: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [station, setStation] = useState([]);
  const [wagon, setWagon] = useState([]);
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tm Alert</IonTitle>
        </IonToolbar>
      </IonHeader>

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
                    En estos momentos el personal de seguridad se dirige a
                    prestarte ayuda, por favor espera en el lugar
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
                    <IonLabel>Vagon</IonLabel>
                    <IonSelect
                      value={wagon}
                      placeholder="Select One"
                      onIonChange={(e) => setWagon(e.detail.value)}
                      mode="ios"
                    >
                      <IonSelectOption value="1">Vagon 1</IonSelectOption>
                      <IonSelectOption value="2">Vagon 2</IonSelectOption>
                      <IonSelectOption value="3">Vagon 3</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                  {location ? (
                    <IonItem>
                      <ReactMapGL
                        width={300}
                        height={200}
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
                      location &&
                        console.log(
                          `Location: (${location.coords.latitude}, ${location.coords.longitude} ), Vagon:${wagon}, Estacion: ${station} `
                        );
                      setStation([]);
                      setWagon([]);
                      setLocation(undefined);
                      setSubmited(true);
                    }}
                    color="tm-color-main"
                    className="modal__close-button"
                    disabled={!(location && wagon && station)}
                  >
                    Activar Alarma
                  </IonButton>
                </div>
              </>
            )}
          </IonCard>
        </IonModal>
        <IonImg
          src="https://image.flaticon.com/icons/svg/564/564619.svg"
          onClick={() => setShowModal(true)}
        />
        <IonTitle>"Manten presionado para</IonTitle>
        <IonTitle>activar la alerta"</IonTitle>
      </IonContent>
    </IonPage>
  );
};

export default MainPage;
