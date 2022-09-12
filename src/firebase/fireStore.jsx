import FirebaseApp from "./context";
import "firebase/firestore";

const db = FirebaseApp.firestore();
export const getColection = (collectionName) => {
  return new Promise(resolve =>{
    db.collection(collectionName).onSnapshot((querySnapshot) => {
      const res = [];
      querySnapshot.docs.forEach((doc) => {
        res.push({
          id: doc.id,
          data: { ...doc.data() },
        });
      });
      resolve(res) ;
    });
  })
};
export  const getDocument = async (collectionName, id) =>{
  try {
    const res = await db.collection(collectionName).doc(id).get();
    return {
      isError: false,
      message: "successful get",
      data: res.data()
    }
  } catch (error) {
    console.error(error)
    return {
      isError: true,
      message: "no get",
      data: error
    }
  }
 
}

export const createSet = async (collectionName,data,id) =>{
  if (!id) {
    id = [data.id]
  }
  const res = {
    isError: false,
    message: 'Registo modificado o agregado',
    data: {id,data}
    };
  return await new Promise((resolve, reject) => {
   db.collection(collectionName)
      .doc((id))
      .set(data, { merge: true })
      .then(() => resolve(res))
      .catch((error) => reject({
        isError: true,
        message: error.code,
        data: error
        }));
  })
}

 
export const setUser = async(user) => {
  try {
   const res = await createSet("Usuarios", user, user.email)
    if (res.isError){
      return {
        isError: true,
        message: "User no create",
        data: res.data
      }
    }
    return {
      isError:false,
      message: "User registrered",
      data: res.data
    }
  } catch (error) {
    return {
      isError:true,
      message: "User no create"
    }
    
  }
};

export  const deleteDocument = async (collectionName, id) =>{
  try {
    const res = await db.collection(collectionName).doc(id).delete();
    return {
      isError: false,
      message: "delete successful ",
      data: res.data()
    }
  } catch (error) {
    console.error(error)
    return {
      isError: true,
      message: "no delete",
      data: error
    }
  }
 
}