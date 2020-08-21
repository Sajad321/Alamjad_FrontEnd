import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLink,
  faPowerOff,
  faUser,
  faSignInAlt,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

function initFontAwesome() {
  library.add(faLink);
  library.add(faUser);
  library.add(faPowerOff);
  library.add(faSignInAlt);
  library.add(faArrowRight);
}

export default initFontAwesome;
