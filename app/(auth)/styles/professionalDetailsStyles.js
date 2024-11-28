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


  linkText: {
    color: "#4267B2",
    textDecorationLine: "underline",
  },

  buttonContainer: {
    marginTop: 8,
  },
   

  flRow: {
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },

  // Consolidated button container styles
  buttonContainer: {
    backgroundColor: "#dcdcdc",
    height: 40,
    width: 100,
    borderRadius: 8,
  },

  // Button style with explicit text color
  button: {
    backgroundColor: "#dcdcdc", // Match container background
    borderRadius: 8
  },

  // Text style to ensure black text
  buttonTitle: {
    color: 'black',
    alignContent: 'center'
  },

  message: {
    fontSize: 16,
    color: '#000',
    marginBottom: 16,
    lineHeight: 24,
  },
  boldText: {
    fontWeight: 'bold',
  },
  resendLink: {
    fontSize: 16,
    color: '#007bff', // Blue link color
    
    marginBottom: 16
  },

  fileName: {
    marginTop: 5,
    marginBottom: 10,
    fontSize: 14,
    color: '#666',
  },



 



});


export default styles;
