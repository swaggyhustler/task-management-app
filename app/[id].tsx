import { RootState } from "@/redux/store";
import { editTodo } from "@/redux/todoSlice";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useFormik } from "formik";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const Status = ["InProgress", "OnHold", "Completed", "InReview"];
const Priority = ["High", "Medium", "Low"];

const EditTodo = () => {
    const { id } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const todo = useSelector((state: RootState) => state.todo);
  const targetTodo = todo.find((todo)=>todo.id.toString()===id)

  const validationSchema = Yup.object().shape({
    status: Yup.string()
      .oneOf(Status, "Please enter valid details")
      .required("Please enter valid status"),
    priority: Yup.string()
      .oneOf(Priority, "Please enter valid details")
      .required("Please enter valid priority"),
    title: Yup.string()
      .max(20, "Enter less than 10 characters")
      .required("Please enter title"),
  });

  const formik = useFormik({
    initialValues: {
      title: targetTodo?.title,
      status: targetTodo?.status,
      priority: targetTodo?.priority,
      date: targetTodo?.date, 
      completed: targetTodo?.completed,
      id: id,
    },
    validationSchema,
    onSubmit: (values) => {
    dispatch(editTodo(values));
    router.push('/TaskList');
    console.log(values);
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Title</Text>
          {formik.touched.title && formik.errors.title && (
            <Text style={styles.error}>{formik.errors.title}</Text>
          )}
          <TextInput
            style={styles.textInput}
            value={formik.values.title}
            onChangeText={formik.handleChange("title")}
          />
        </View>

        <View>
          <Text style={{ fontWeight: "bold" }}>Status</Text>
          <View>
            {Status.map((status) => {
              return (
                <TouchableOpacity
                  key={status}
                  onPress={() => formik.setFieldValue("status", status)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View
                    style={[
                      styles.radio,
                      formik.values.status === status
                        ? { backgroundColor: "black" }
                        : "",
                    ]}
                  ></View>
                  <Text>{status}</Text>
                </TouchableOpacity>
              );
            })}
            {formik.touched.status && formik.errors.status && (
              <Text style={styles.error}>{formik.errors.status}</Text>
            )}
          </View>
        </View>

        <View>
          <Text style={{ fontWeight: "bold" }}>Priority</Text>
          <View>
            {Priority.map((priority) => {
              return (
                <TouchableOpacity
                  key={priority}
                  onPress={() => formik.setFieldValue("priority", priority)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View
                    style={[
                      styles.radio,
                      formik.values.priority === priority
                        ? { backgroundColor: "black" }
                        : null,
                    ]}
                  ></View>
                  <Text>{priority}</Text>
                </TouchableOpacity>
              );
            })}
            {formik.touched.priority && formik.errors.priority && (
              <Text style={styles.error}>{formik.errors.priority}</Text>
            )}
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Date</Text>
          <TextInput
            style={styles.textInput}
            value={formik.values.date}
            onChangeText={formik.handleChange("date")}
          />
          {formik.touched.date && formik.errors.date && (
            <Text>{formik.errors.date}</Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => formik.handleSubmit()}
        >
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  formContainer: {
    gap: 10,
    paddingHorizontal: 20,
  },
  inputWrapper: {},
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  inputLabel: {
    fontWeight: "bold",
  },
  btn: {
    width: "100%",
    backgroundColor: "black",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  radio: {
    borderRadius: 20,
    width: 20,
    height: 20,
    borderWidth: 2,
    margin: 5,
  },
  error: {
    color: "red",
    fontWeight: 500,
  },
});

export default EditTodo;
