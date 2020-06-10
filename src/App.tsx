import React from "react";
import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonTabBar, IonTabs } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import MainPage from "./pages/MainPage";
/* import TodayAlerts from "./pages/TodayAlerts"; */
import TodayAlerts from "./pages/TodayAlerts";
import Camera from "./pages/Camera";
// import Tab3 from "./pages/Tab3";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/alertas-hoy" component={TodayAlerts} exact={true} />
          <Route path="/" exact={true} component={MainPage} />
          <Route path="/camera" exact={true} component={Camera} />
        </IonRouterOutlet>
        <IonTabBar></IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
