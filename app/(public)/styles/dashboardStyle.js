import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

 container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 16,
  },


  statsContainer: {
    alignItems: 'center',
    height: '5%',
    marginBottom: 25
    
  },

 
  topicsContainer: {
    width: '100%',
  },

  profileCardContainer: {
    marginTop: 50,
    width: '100%',
  },

  logoutButton: {

    backgroundColor: '#ff4444',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginTop: 20,

  },

  headerContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  greetingText: {
    fontSize: 16,
    fontWeight: '500',
  },

    
  });

  export default styles;