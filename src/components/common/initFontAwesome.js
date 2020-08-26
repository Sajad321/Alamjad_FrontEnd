import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLink,
  faPowerOff,
  faUser,
  faUserCircle,
  faSignInAlt,
  faArrowRight,
  faPlus,
  faMinus,
  faBars,
  faChartLine,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

function initFontAwesome() {
  library.add(faLink);
  library.add(faUserCircle);
  library.add(faUser);
  library.add(faPowerOff);
  library.add(faSignInAlt);
  library.add(faArrowRight);
  library.add(faPlus);
  library.add(faMinus);
  library.add(faBars);
  library.add(faChartLine);
  library.add(faUsers);
}

export default initFontAwesome;
