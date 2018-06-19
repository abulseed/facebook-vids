import { BuildConfig } from './cli/ConsoleUtil';

try {
  BuildConfig();
  process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection. Promise: ', p, ', Reason: ', reason);
  });
} catch (error) {
  console.error('Error', error);
  process.exit(0);
}
