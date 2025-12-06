import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,   
    justifyContent: "center",
    alignItems: "center",
  },
  Button: {
    marginTop: 20,
    padding: 5,
    backgroundColor: "#6CC24A",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    borderRadius: 10,
    color: "white",
    fontSize: 40,
  },
  red : {
    backgroundColor: "Red"
  },
  textGreen: {
    color: "#6CC24A"
  },
  textWhite: {
    color: "#fff"
  }
});

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Background lembut
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 22,
    color: '#34495e',
    marginBottom: 40,
    fontWeight: '500',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#6CC24A',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  textButton: {
    marginTop: 16,
    alignSelf: 'center',
  },
});

export const registerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 22,
    color: '#34495e',
    marginBottom: 40,
    fontWeight: '500',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#6CC24A',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  textButton: {
    marginTop: 16,
    alignSelf: 'center',
  },
});

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  profileCard: {
    margin: 16,
    marginTop: 16,
    borderRadius: 16,
    elevation: 4,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    backgroundColor: '#6CC24A',
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  formCard: {
    margin: 16,
    borderRadius: 16,
    elevation: 4,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: 8,
    backgroundColor: '#6CC24A',
    borderRadius: 8,
  },
  logoutButton: {
    margin: 16,
    marginTop: 8,
    borderColor: '#E53935',
    borderWidth: 1,
  },
  logoutButtonText: {
    color: '#E53935',
  },
});

export const tabLayoutstyles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0,
    elevation: 10,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    height: Platform.OS === 'ios' ? 85 : 65,
    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
    paddingTop: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  header: {
    backgroundColor: '#6CC24A',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export const historyStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  historyContainer: {
    padding: 16,
  },
  card: {
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  brandText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  seriesText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  priceContainer: {
    backgroundColor: '#f0f9f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6CC24A',
  },
  divider: {
    marginVertical: 12,
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  specContainer: {
    marginBottom: 16,
  },
  specText: {
    fontSize: 14,
    color: '#666',
  },
  probContainer: {
    marginBottom: 12,
  },
  probBarContainer: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    marginBottom: 6,
  },
  probBar: {
    height: '100%',
    backgroundColor: '#6CC24A',
    borderRadius: 3,
  },
  probText: {
    fontSize: 12,
    color: '#666',
  },
  dateText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
});

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#6CC24A',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  formCard: {
    margin: 16,
    marginTop: -20,
    borderRadius: 16,
    elevation: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
  },
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 16,
  },
  selectorText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  divider: {
    marginVertical: 16,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 4,
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#6CC24A',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  optionTextSelected: {
    color: 'white',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#6CC24A',
    borderRadius: 8,
  },
  textButton: {
    alignSelf: 'center',
    marginTop: 8,
  },
  resultCard: {
    margin: 16,
    borderRadius: 16,
    elevation: 4,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  resultPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6CC24A',
    marginBottom: 12,
  },
  probContainer: {
    marginBottom: 12,
  },
  probBarContainer: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 8,
  },
  probBar: {
    height: '100%',
    backgroundColor: '#6CC24A',
    borderRadius: 4,
  },
  probText: {
    fontSize: 14,
    color: '#555',
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#43A047',
    marginTop: 4,
    marginBottom: 8,
  },
  specSummary: {
    fontSize: 12,
    color: '#777',
    marginTop: 8,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 16,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  modalItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#f8f9fa',
  },
  modalItemSelected: {
    backgroundColor: '#6CC24A',
  },
  modalItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  modalItemSelectedText: {
    color: 'white',
  },
});