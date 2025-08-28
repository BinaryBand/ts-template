# TypeScript Template

A clean, modern TypeScript template with best practices and modular architecture.

## Features

- 🚀 **TypeScript** with strict configuration
- 📦 **Rollup** for bundling with development/production modes
- 🧪 **Jest** for testing with TypeScript support
- 📝 **TypeDoc** for documentation generation
- 🛠️ **Path mapping** with clean imports (`@/` for src, `@public/` for public)
- 🏗️ **Modular architecture** with clear separation of concerns
- 🔧 **Configuration management** with environment variables
- 📊 **Structured logging** with configurable levels
- ❌ **Error handling** with custom error classes
- 🔒 **Type safety** with comprehensive TypeScript configuration

## Project Structure

```
src/
├── config/          # Configuration management
├── core/           # Core business logic (add your modules here)
├── errors/         # Custom error classes
├── services/       # External service integrations (add your services here)
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── index.ts        # Application entry point

tests/              # Test files
public/             # Public assets and constants
```

## Quick Start

1. **Clone and install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables** (optional):

   ```bash
   cp .env.example .env  # Create your .env file
   ```

3. **Start development:**

   ```bash
   npm run dev         # Build with watch mode
   npm start           # Build and run
   ```

4. **Run tests:**
   ```bash
   npm test            # Run tests once
   npm run test:watch  # Run tests in watch mode
   npm run test:coverage # Run with coverage report
   ```

## Available Scripts

- `npm start` - Build and run the application
- `npm run dev` - Build in watch mode for development
- `npm run build` - Build for production
- `npm run clean` - Clean dist and docs directories
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run typecheck` - Type check without building
- `npm run docs` - Generate documentation

## Configuration

The template includes a simple configuration system in `src/config/index.ts`:

```typescript
import { config } from '@/config';

// Access configuration values
console.log(config.nodeEnv); // 'development' | 'production' | 'test'
console.log(config.logLevel); // 'debug' | 'info' | 'warn' | 'error'
console.log(config.secretKey); // From SUPER_SECRETIVE_SECRET env var
```

## Logging

Use the built-in logger for consistent logging:

```typescript
import { logger } from '@/utils/logger';

logger.info('Application started');
logger.error('Something went wrong', error);
logger.debug('Debug information', { data: 'example' });
```

## Error Handling

Use the strictly-typed error handling system with predefined error types and typed metadata:

```typescript
import { AppError } from '@/errors/AppError';

// Validation errors with typed metadata
throw AppError.validation('Email is required', {
  field: 'email',
  constraint: 'required',
});

// Not found errors with required metadata
throw AppError.notFound('User not found', {
  resourceType: 'user',
  resourceId: 123,
});

// Database errors with operation context
throw AppError.database('Connection failed', {
  operation: 'connect',
  table: 'users',
});

// Authentication errors with context
throw AppError.authentication('Token expired', {
  authMethod: 'token',
  reason: 'expired',
});

// Authorization errors with permission context
throw AppError.authorization('Access denied', {
  userId: '123',
  resource: 'users',
  action: 'delete',
  requiredPermissions: ['admin'],
});

// External service errors with service details
throw AppError.externalService('API call failed', {
  serviceName: 'payment-api',
  endpoint: '/charges',
  statusCode: 500,
});

// Timeout errors with operation details
throw AppError.timeout('Request timed out', {
  operation: 'database-query',
  timeoutMs: 5000,
  elapsedMs: 5200,
});

// Custom errors with specific status codes
throw AppError.custom('Business logic error', 'CUSTOM_CODE', 422);

// Error checking with type safety
const error = AppError.database('Connection failed', { operation: 'select' });
if (error.isType('DATABASE_ERROR')) {
  console.log('Database issue detected');
  console.log('Operation:', error.metadata?.operation); // Type-safe metadata access
}

// Convert any error to AppError
import { toAppError, isAppError } from '@/errors/AppError';
const appError = toAppError(someUnknownError);
```

**Available Error Types with Typed Metadata:**

- `VALIDATION_ERROR` (400) - `{ field?, value?, constraint? }`
- `NOT_FOUND` (404) - `{ resourceType, resourceId, searchParams? }`
- `AUTHENTICATION_ERROR` (401) - `{ authMethod?, userId?, reason? }`
- `AUTHORIZATION_ERROR` (403) - `{ userId, resource, action, requiredPermissions? }`
- `CONFLICT` (409) - `{ resourceType, conflictingField, existingValue }`
- `DATABASE_ERROR` (500) - `{ operation, table?, constraint? }`
- `EXTERNAL_SERVICE_ERROR` (502) - `{ serviceName, endpoint?, statusCode?, responseTime? }`
- `TIMEOUT_ERROR` (408) - `{ operation, timeoutMs, elapsedMs? }`
- `CONFIGURATION_ERROR` (500) - `{ configKey, expectedType?, actualValue? }`
- `RATE_LIMIT_EXCEEDED` (429) - `{ limit, windowMs, retryAfterMs? }`
- `INTERNAL_SERVER_ERROR` (500) - No specific metadata
- `SERVICE_UNAVAILABLE` (503) - No specific metadata

## Path Mapping

The template uses path mapping for clean imports:

```typescript
import { logger } from '@/utils/logger'; // src/utils/logger.ts
import { config } from '@/config'; // src/config/index.ts
import { constants } from '@public/constants.json'; // public/constants.json
```

## Customization

### Adding New Modules

1. **Core business logic** → `src/core/`
2. **External services** → `src/services/`
3. **Utilities** → `src/utils/`
4. **Types** → `src/types/`

### Environment Variables

Add your environment variables to the configuration system:

1. Update the `AppConfig` interface in `src/types/common.ts`
2. Add the variable to `src/config/index.ts`
3. Update validation as needed

### Adding Dependencies

```bash
# Production dependencies
npm install package-name

# Development dependencies
npm install --save-dev package-name
```

## Build Output

The build process creates:

- `dist/bundle.js` - Main application bundle
- `dist/bundle.js.map` - Source map (development only)
- `docs/` - Generated documentation (via `npm run docs`)

## License

MIT License - see [LICENSE](LICENSE) file for details.
