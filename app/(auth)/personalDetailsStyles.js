import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: "20px 30px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    maxWidth: "100%",
    width: "100%",
    height: "auto !important",
    overflowY: "scroll",
    margin: "40px 50px",
  },
 
  formContainer: {
    padding: 15,
    margin: 10,
  },

  //email
  inputTextField: {
    backgroundColor: "#dcdcdc",
    height: 40,
    padding: 10,
    borderRadius: 8,
    marginBottom: 16
  },

  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Adjust alignment
    marginBottom: 16,
  },

  countryCodePicker: {
    backgroundColor: "#dcdcdc",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    marginRight: 8, 

  },
  
  phonenumber: {
    backgroundColor: "#dcdcdc",
    height: 40,
    paddingHorizontal: 10,
    flex: 1, // Ensures it takes up remaining space
    borderRadius: 8,
  },
  

  flRow: {
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: 'space-between',  // Adjusted to space out the inputs
    alignItems: 'center',
    gap: 16
    
  },

  firstName: {
    padding:10,
    flex: 1,  
      backgroundColor: "#dcdcdc",
      height: 40,
      borderRadius: 8,
  
  },

  lastName: {
    padding:10,
    backgroundColor: "#dcdcdc",
    height: 40,
    borderRadius: 8,
    flex: 1,  
  },

  genderPicker: {
    backgroundColor: "#dcdcdc",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    marginRight: 8, 

  },

  dobInput: {
    backgroundColor: "#dcdcdc",
    height: 40,
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },

  professionPicker: {

    backgroundColor: "#dcdcdc",
    height: 40,
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,


  },

  toc: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 16,
    padding: 10
  },


  checkbox: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    margin: 0,
    marginBottom: 16,
  },
  checkboxText: {
    fontSize: 14,
    color: "black",
    fontWeight: "normal",
    
  },
  linkText: {
    color: "#4267B2",
    textDecorationLine: "underline",
  },
  buttonContainer: {
    marginTop: 8,
  },
  button: {
    backgroundColor: "#4267B2",
    height: 50,
    borderRadius: 8,
  },
});
