import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      backgroundColor: '#fff',
    },
    
    formContainer: {
      padding: 15,
      gap: 10,
    },

    input: {
      height: 50,
      backgroundColor: '#F3F4F6',
      borderRadius: 8,
      marginBottom: 16,
    },
   
    phoneContainer: {
        flexDirection: 'row', // Horizontal alignment
        alignItems: 'center', // Ensure vertical alignment
        justifyContent: 'space-between', // Distribute space between children
        paddingHorizontal: 10, // Optional padding for the container
        gap: 10, // Space between Picker and CustomInput
      },
      countryCodePicker: {
        flex: 1, // Takes up proportional space
        maxWidth: 100, // Limits maximum width
        height: 40, // Sets consistent height
        borderWidth: 1, // Optional: Add border for better visibility
        borderColor: '#ccc', // Optional: Border color
        borderRadius: 4, // Optional: Rounded corners
      },
      phoneInput: {
        flex: 3, // Takes up more space than the picker
        height: 40, // Same height as the Picker for alignment
        borderWidth: 1, // Optional: Add border for better visibility
        borderColor: '#ccc', // Optional: Border color
        borderRadius: 4, // Optional: Rounded corners
        paddingLeft: 10, // Adds padding for better text visibility
      },
    
    row: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 16,
    },
    halfInput: {
      flex: 1,
      height: 50,
      backgroundColor: '#F3F4F6',
      borderRadius: 8,
    },
    pickerContainer: {
      backgroundColor: '#F3F4F6',
      borderRadius: 8,
      justifyContent: 'center',
      height: 50,
      overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    picker: {
      height: 50,
      backgroundColor: 'transparent',
      ...Platform.select({
        ios: {
          marginTop: -8,
        },
        android: {
          marginTop: -16,
        },
      }),
    },
    checkbox: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      padding: 0,
      margin: 0,
      marginBottom: 16,
    },
    checkboxText: {
      fontSize: 14,
      color: '#6B7280',
      fontWeight: 'normal',
      marginLeft: 8,
    },
    linkText: {
      color: '#4267B2',
      textDecorationLine: 'underline',
    },
    buttonContainer: {
      marginTop: 8,
    },
    button: {
      backgroundColor: '#4267B2',
      height: 50,
      borderRadius: 8,
    },
  });