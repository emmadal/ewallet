const paydunya = require('paydunya');
import {
  PAYDUNYA_MASTER_KEY,
  PAYDUNYA_PUBLIC_KEY,
  PAYDUNYA_PRIVATE_KEY,
  PAYDUNYA_TOKEN,
  MODE,
} from '@env';

const setup = new paydunya.Setup({
  masterKey: PAYDUNYA_MASTER_KEY,
  privateKey: PAYDUNYA_PRIVATE_KEY,
  publicKey: PAYDUNYA_PUBLIC_KEY,
  token: PAYDUNYA_TOKEN,
  mode: MODE, // Optionnel. Utilisez cette option pour les paiements tests.
});
