import { Text, TextInput, View, TouchableOpacity } from 'react-native';

const SearchBox = ({ setDestination, setMaxPrice, handleSearch }) => {
  
  return (
    <View style={styles.makeMargin}>
      <Text style={[styles.headingText, { marginBottom: 10 }]}>
        Search Packages
      </Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder='Destination City'
          onChangeText={setDestination}
        />
        <TextInput
          style={styles.input}
          placeholder='Max Price'
          onChangeText={setMaxPrice}
          keyboardType='numeric'
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SearchBox;

const styles = {
  containerHome: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  containerOtherScreen: {
    flex: 1,
    backgroundColor: 'grey',
  },
  searchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 1,
  },
  makeMargin: {
    marginBottom: 20,
    marginTop: 1,
  },
  input: {
    height: 28,
    width: '35%',
    borderColor: 'white',
    color: 'white',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    marginTop: 8,
    borderRadius: 5,
    marginRight: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 8,
    width: '90%',
  },
  line: {
    height: 1.8,
    width: '80%',
    backgroundColor: 'white',
    marginTop: 6,
  },
  signOutContainer: {
    flexDirection: 'row',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  signOutWelcomeContainer: {
    marginRight: 10,
    marginBottom: 7,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  headingText: {
    fontSize: 16,
    paddingTop: 10,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'yellow',
  },
  logo: {
    width: '15%',
    height: 50,
    marginRight: 2,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 6,
  },
  buttonText: {
    opacity: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'yellow',
  },
  item: {
    paddingTop: 20,
  },
  searchButton: {
    height: 25,
    backgroundColor: '#007AFF',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
  welcomeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  signOutText: {
    color: 'black',
    fontSize: 10,
    fontWeight: 'bold',
  },
  buttonImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
};
