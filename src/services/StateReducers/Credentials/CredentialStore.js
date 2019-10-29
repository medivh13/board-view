import { createStore } from 'redux';
import credentialReducer from './CredentialReducer';

const credentialStore = createStore(credentialReducer);

export default credentialStore;
