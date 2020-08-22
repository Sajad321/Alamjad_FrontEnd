import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLink,
  faPowerOff,
  faUser,
  faSignInAlt,
  faArrowRight,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

function initFontAwesome() {
  library.add(faLink);
  library.add(faUser);
  library.add(faPowerOff);
  library.add(faSignInAlt);
  library.add(faArrowRight);
  library.add(faPlus);
  library.add(faMinus);
}

export default initFontAwesome;
