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

Use custom error classes for better error management:

```typescript
import { AppError, createValidationError } from '@/errors/AppError';

// Create custom errors
throw new AppError('Something went wrong', 'CUSTOM_ERROR', 500);
throw createValidationError('Invalid input data');
```

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
