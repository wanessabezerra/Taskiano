import { collection } from "firebase/firestore";

import { firestore } from "../../services/Firebase";

const ProjectRef = collection(firestore, "project");

export default ProjectRef;
