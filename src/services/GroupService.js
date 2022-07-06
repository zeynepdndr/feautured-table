import { db } from "../firebase.config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { dataToFirestoreTimestamp } from "../utils/dateConverter";

// The following class is to get groups from firestore and add new groups to firestore.

const groupsCollection = collection(db, "groups");

class GroupService {
  getAll = async () => {
    const groupsSnapshot = await getDocs(groupsCollection);
    const groupsList = groupsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return groupsList;
  };

  addGroup = async (items) => {
    let creationDate = Date.now();
    const min = 1;
    const max = 100;
    const groupNumber = min + parseInt(Math.random() * (max - min));

    await addDoc(groupsCollection, {
      orders: items,
      createdDate: dataToFirestoreTimestamp(creationDate),
      groupNumber: groupNumber,
    });

    console.log("Order added", items);
  };
}
export default new GroupService();
