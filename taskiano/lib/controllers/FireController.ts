import {
  doc,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  DocumentData,
  CollectionReference,
  setDoc,
  DocumentReference,
  Timestamp,
  query,
  where,
} from "firebase/firestore";
import { SchemaOf } from "yup";

interface IFireController {
  ref: CollectionReference<DocumentData>;
  schema: SchemaOf<any>;
  _name: string;
}

class FireController<T> {
  ref: CollectionReference<DocumentData>;
  schema: SchemaOf<any>;
  _name: string;

  constructor(props: IFireController) {
    this.ref = props.ref;
    this.schema = props.schema;
    this._name = props._name;
  }

  public castDate(date?: Timestamp): Date | any {
    if (date instanceof Timestamp) {
      return date.toDate();
    } else {
      return date;
    }
  }

  public async Validator(data: T, schema: SchemaOf<any> = this.schema) {
    try {
      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err: any) {
      console.error(this._name);
      throw new Error(err);
    }
  }

  public async index(): Promise<[any, T][]> {
    const data: [any, T][] = [];
    const docs = await getDocs(this.ref);

    docs.forEach((_doc) => {
      data.push([_doc.id, _doc.data() as T]);
    });

    return data;
  }

  public async get(_id: any): Promise<T | undefined> {
    if (!_id) return;

    const docRef = doc(this.ref, _id);
    const docSnap = await getDoc(docRef);

    return docSnap.exists()
      ? { ...(docSnap.data() as T), id: docRef.id }
      : undefined;
  }

  public async getDocsWithProperty(
    prop: string,
    value: any,
    ref?: CollectionReference<DocumentData>
  ): Promise<T[]> {
    const q = query(ref ?? this.ref, where(prop, "==", value));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((_doc) => {
      return { id: _doc.id, ...(_doc.data() as T) };
    });
  }

  public async getDocsOfUser(userId?: string): Promise<T[]> {
    if (!userId) return [];

    return this.getDocsWithProperty("userId", userId);
  }

  public async delete(_id: any): Promise<void> {
    if (!_id) return;

    await deleteDoc(doc(this.ref, _id));
  }

  protected async setDoc(docRef: DocumentReference, data: T) {
    await setDoc(docRef, data);
    return docRef;
  }

  public async create(data: T, id?: string): Promise<T> {
    await this.Validator(data);

    const docRef = id
      ? await this.setDoc(doc(this.ref, id), data)
      : await addDoc(this.ref, data);

    return { id: docRef.id, ...data };
  }

  public async update(_id: any, data: T): Promise<T | undefined> {
    if (!_id) return;
    await this.Validator(data);
    const docRef = doc(this.ref, _id);

    await updateDoc(doc(this.ref, _id), data);

    const docSnap = await getDoc(docRef);

    return { ...(docSnap.data() as T), id: docRef.id };
  }
}

export default FireController;
