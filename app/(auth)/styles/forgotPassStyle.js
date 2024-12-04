import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: "20px 30px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    maxWidth: "100%",
    width: "100%",
    height: "auto !important",
    overflowY: "scroll",
    margin: "40px 50px",
    marginTop: 100
  },

  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1a365d',
    marginBottom: 40,
  },

  forgotPassword: {
    color: '#4267B2',
    textAlign: 'right',
    marginTop: 8,
    marginBottom: 16,
  },
 
  formContainer: {
    padding: 15,
    marginTop: 0,
    marginHorizontal: 10,
    marginBottom: 0,
  },

  //email
  inputTextField: {
    backgroundColor: "#dcdcdc",
    height: 40,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  },


  buttonContainer: {
    marginTop: 8,
  },
  button: {
    backgroundColor: "#4267B2",
    height: 50,
    borderRadius: 8,
  },

 
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#dcdcdc",
    height: 40,
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  
  },
  inputPassField: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    
  },
  iconContainer: {
    
  },

  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
    marginLeft: 10,
  },




});

export default styles;
