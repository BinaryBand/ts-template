import 'dotenv/config';
import { greet } from '@utils/greeter';

const message: String = greet('World');
console.log(message);

console.log('Environment Variables:');
console.log('-----------------------');
console.log(`NODE_ENV: ${process.env['SUPER_SECRETIVE_SECRET']}`);
