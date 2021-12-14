import { collection } from "firebase/firestore";

import { firestore } from "../../services/Firebase";

const TaskRef = collection(firestore, "task");

export default TaskRef;
