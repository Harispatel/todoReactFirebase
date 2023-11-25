import { DB_NAME } from "./data";

export const FetchPost = async ({ getDocs, collection, db, handleFetched }) => {
  await getDocs(collection(db, DB_NAME)).then((querySnapshot) => {
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    if (newData.length > 0) {
      handleFetched(newData);
    }
  });
};

// Adding TODO into Firebase
export const addTodo = async ({
  e,
  todoText,
  user,
  addDoc,
  collection,
  db,
  handleAdded,
}) => {
  e.preventDefault();
  if (todoText !== "") {
    try {
      await addDoc(collection(db, DB_NAME), {
        todo: todoText,
        userId: user?.email,
        isCompleted: false,
        isDeleted: false,
      });
      handleAdded();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
};

export const handleDelete = async ({ data, deleteDoc, doc, db, fetchData }) => {

  //window.confirm("Are you sure you want to delete?");
  console.log("Deleting", data?.id);
  try {
    // const userRef = doc(db, DB_NAME, data?.id);
    await deleteDoc(doc(db, DB_NAME, data?.id));
    if (data?.id) {
      fetchData();
    }
    console.log(data?.id);
  } catch (err) {
    console.log(err);
  }
};

export const handleChange = async ({
  e,
  data,
  doc,
  db,
  updateDoc,
  fetchData,
}) => {
  const userRef = doc(db, DB_NAME, data?.id);
  let value =
    data?.isCompleted == true && e?.target?.checked == false ? false : true;
  await updateDoc(userRef, {
    isCompleted: value,
  });
  if (data?.id) {
    fetchData();
  }
};

export const handleRecycle = async ({
  data,
  doc,
  db,
  updateDoc,
  fetchData,
}) => {
  // alert("Do you want to Restore?");
  console.log("RECYCLING", data);
  //window.confirm("Are you sure you want to delete?");
  try {
    //   await deleteDoc(doc(db, DB_NAME, data?.id));
    const userRef = doc(db, DB_NAME, data?.id);
    await updateDoc(userRef, {
      isDeleted: data.isDeleted == true ? false : true,
    });
    if (data?.id) {
      console.log("RESTORED AND FETCHED")
      fetchData();
    }
    console.log(data?.id);
  } catch (err) {
    console.log(err);
  }
};
