import { db } from "../firebase.config";
import { collection, getDocs } from "firebase/firestore";

const groupsCollection = collection(db, "groups");

class GroupService {
  // getAll = async () => {
  //   const groupsSnapshot = await getDocs(groupsCollection);
  //   const groupsList = groupsSnapshot.docs.map((doc) => ({
  //     ...doc.data(),
  //     id: doc.id,
  //   }));
  //   return groupsList;
  // };

  getAll(params) {
    const queryParams = params
      ? Object.keys(params)
          .map(
            (k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
          )
          .join("&")
      : "";
    return fetch(
      "https://www.primefaces.org/data/customers?" + queryParams
    ).then((res) => res.json());
  }
}
export default new GroupService();
