//firebase appを全部使えるようにする
import firebase from "firebase";
import "firebase/firestore";
import config from "~/firebaseConfig";

// 初期設定を追加
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
export default firebase;
