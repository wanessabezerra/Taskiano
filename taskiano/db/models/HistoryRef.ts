import { collection } from "firebase/firestore";

import { firestore } from "../../services/Firebase";

const HistoryRef = collection(firestore, "history");

export default HistoryRef;
