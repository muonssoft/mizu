import FirebaseApp from "./context";
import { translateError } from "./customErrorAuth";
import { setUser, createSet, getDocument } from "./fireStore";

export const socialLogin = async (provider) => {
  const data = {};
  await FirebaseApp.auth()
    .signInWithPopup(provider)
    .then(async (res) => {
      data.photoURL = res.user.photoURL;
      data.name = res.user.displayName;
      data.uid = res.user.uid;
      data.id = res.user.email;
      data.correo = res.user.email;
      const document = await getDocument("Usuarios", data.uid);
      typeof document.data === "undefined"
        ? await createSet("Usuarios", data, data.uid)
        : alert("Ya tienes creada una cuenta con ese correo");
    })
    .catch((error) => {
      console.error(error);
    });
};
export const loginGoogle = async (provider) => {
  const data = {};
  await FirebaseApp.auth()
    .signInWithPopup(provider)
    .then(async (res) => {
      data.photoURL = res.user.photoURL;
      data.name = res.user.displayName;
      data.uid = res.user.uid;
      data.id = res.user.email;
      data.correo = res.user.email;
      const document = await getDocument("Usuarios", data.uid);
      typeof document.data === "undefined"
        ? alert("Debes registrar una cuenta")
        : console.log("ok");
    })
    .catch((error) => {
      console.error(error);
    });
};

export const loginMail = async (user) => {
  try {
    await FirebaseApp.auth().signInWithEmailAndPassword(
      user.email,
      user.password
    );
    await FirebaseApp.auth().currentUser.updateProfile;
    // FIXME registara los datos con firestore
    return {
      isError: false,
      message: "Existos",
    };
  } catch (error) {
    const message = translateError(error.code);
    return {
      isError: true,
      message,
    };
  }
};

export const signOut = async () => {
  try {
    await FirebaseApp.auth().signOut();
  } catch (error) {
    console.error(error);
  }
};

export const UserRegister = async (user) => {
  try {
    const res = await FirebaseApp.auth().createUserWithEmailAndPassword(
      user.email,
      user.password
    );

    await FirebaseApp.auth().currentUser.updateProfile({
      displayName: `${user.name} ${user.lastname}`,
      photoURL: user.photoURL,
    });

    delete user.password;
    user.uid = res.user.uid;
    await setUser(user);

    return {
      isError: false,
      message: "login succesfull",
      data: res.user,
    };
  } catch (error) {
    console.error(error);
    return {
      isError: true,
      message: translateError(error.code),
      data: {},
    };
  }
};
