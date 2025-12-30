const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

async function seedDatabase() {
  const uri = process.env.DATABASE_URL;

  if (!uri) {
    console.error('❌ DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db('myportfolio');

    // Clear existing data
    await db.collection('users').deleteMany({});
    await db.collection('posts').deleteMany({});
    await db.collection('categories').deleteMany({});
    await db.collection('tags').deleteMany({});
    await db.collection('comments').deleteMany({});
    await db.collection('likes').deleteMany({});
    console.log('🧹 Cleared existing data');

    // Hash password for admin user
    const hashedPassword = await bcrypt.hash('1997Roma10@', 10);

    // Seed admin user
    const adminUser = {
      name: 'Admin Romarick',
      email: 'admin@gmail.com',
      username: 'admin',
      password: hashedPassword,
      role: 'ADMIN',
      bio: 'Portfolio administrator',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const adminResult = await db.collection('users').insertOne(adminUser);
    const adminId = adminResult.insertedId;
    console.log('👤 Created admin user');

    // Seed categories
    const categories = [
      { name: 'Web Development', slug: 'web-development', description: 'Frontend and backend web development', color: '#3B82F6', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mobile Apps', slug: 'mobile-apps', description: 'iOS and Android applications', color: '#10B981', createdAt: new Date(), updatedAt: new Date() },
      { name: 'UI/UX Design', slug: 'ui-ux-design', description: 'User interface and experience design', color: '#F59E0B', createdAt: new Date(), updatedAt: new Date() },
      { name: 'DevOps', slug: 'devops', description: 'Deployment and infrastructure', color: '#EF4444', createdAt: new Date(), updatedAt: new Date() },
    ];

    const categoryResults = await db.collection('categories').insertMany(categories);
    console.log('📂 Created categories');

    // Seed tags
    const tags = [
      { name: 'React', slug: 'react', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Next.js', slug: 'nextjs', createdAt: new Date(), updatedAt: new Date() },
      { name: 'TypeScript', slug: 'typescript', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Node.js', slug: 'nodejs', createdAt: new Date(), updatedAt: new Date() },
      { name: 'MongoDB', slug: 'mongodb', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tailwind CSS', slug: 'tailwind', createdAt: new Date(), updatedAt: new Date() },
      { name: 'AWS', slug: 'aws', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Docker', slug: 'docker', createdAt: new Date(), updatedAt: new Date() },
    ];

    const tagResults = await db.collection('tags').insertMany(tags);
    console.log('🏷️ Created tags');

    // Seed posts
    const posts = [
      {
        title: 'Building a Modern Portfolio with Next.js 15',
        slug: 'building-modern-portfolio-nextjs-15',
        excerpt: 'Learn how to create a stunning portfolio website using the latest Next.js features, TypeScript, and modern web technologies.',
        content: `# Building a Modern Portfolio with Next.js 15

Next.js 15 brings exciting new features that make building portfolios easier and more performant than ever before.

## Key Features Used

- **App Router**: The new file-based routing system
- **Server Components**: Improved performance and SEO
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first styling for rapid development

## Getting Started

First, create a new Next.js project with TypeScript:

\`\`\`bash
npx create-next-app@latest my-portfolio --typescript --tailwind --app
\`\`\`

## Project Structure

The portfolio follows a clean, scalable architecture:

- \`/app\` - Next.js 15 app directory
- \`/components\` - Reusable UI components
- \`/lib\` - Utility functions and configurations
- \`/types\` - TypeScript type definitions

This structure ensures maintainability and scalability as your portfolio grows.`,
        coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
        published: true,
        featured: true,
        views: 1250,
        readTime: 8,
        publishedAt: new Date('2024-01-15'),
        authorId: adminId,
        categories: [categoryResults.insertedIds[0]], // Web Development
        tags: [tagResults.insertedIds[0], tagResults.insertedIds[1], tagResults.insertedIds[2]], // React, Next.js, TypeScript
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-15'),
      },
      {
        title: 'Mastering MongoDB for Full-Stack Developers',
        slug: 'mastering-mongodb-fullstack-developers',
        excerpt: 'A comprehensive guide to using MongoDB in modern web applications, covering schema design, indexing, and performance optimization.',
        content: `# Mastering MongoDB for Full-Stack Developers

MongoDB has become the go-to database for modern web applications. This guide covers everything you need to know to use it effectively.

## Why MongoDB?

- **Flexible Schema**: Adapt to changing requirements without migrations
- **Scalability**: Horizontal scaling with sharding
- **Performance**: Fast queries with proper indexing
- **Developer Experience**: Native JavaScript objects

## Schema Design Best Practices

### Embedding vs Referencing

Choose the right strategy based on your access patterns:

**Embed when:**
- Data is frequently accessed together
- One-to-one or one-to-few relationships
- Data doesn't change independently

**Reference when:**
- Many-to-many relationships
- Data accessed independently
- Large embedded documents

### Indexing Strategy

Always index fields used in queries:

\`\`\`javascript
// Create indexes for better performance
db.posts.createIndex({ authorId: 1, published: 1 });
db.posts.createIndex({ slug: 1 }, { unique: true });
db.posts.createIndex({ tags: 1 });
\`\`\`

## Performance Optimization

1. **Use appropriate indexes**
2. **Limit query results**
3. **Use aggregation pipelines for complex queries**
4. **Implement pagination**
5. **Monitor slow queries**

MongoDB's flexibility makes it perfect for modern applications that need to evolve quickly.`,
        coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop',
        published: true,
        featured: false,
        views: 890,
        readTime: 12,
        publishedAt: new Date('2024-01-20'),
        authorId: adminId,
        categories: [categoryResults.insertedIds[0]], // Web Development
        tags: [tagResults.insertedIds[4]], // MongoDB
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date('2024-01-20'),
      },
      {
        title: 'Creating Stunning UI Components with Tailwind CSS',
        slug: 'creating-stunning-ui-components-tailwind-css',
        excerpt: 'Learn advanced Tailwind CSS techniques to create beautiful, responsive, and maintainable user interfaces.',
        content: `# Creating Stunning UI Components with Tailwind CSS

Tailwind CSS has revolutionized how we approach styling in modern web development. This guide covers advanced techniques for creating beautiful components.

## Component-First Approach

Instead of page-based styles, think in components:

\`\`\`jsx
function Button({ variant = 'primary', size = 'md', children, ...props }) {
  const baseStyles = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2';
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={\`\${baseStyles} \${variants[variant]} \${sizes[size]}\`}
      {...props}
    >
      {children}
    </button>
  );
}
\`\`\`

## Responsive Design Patterns

Use Tailwind's responsive prefixes effectively:

\`\`\`jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid that adapts to screen size */}
</div>
\`\`\`

## Dark Mode Support

Implement dark mode with Tailwind's dark: prefix:

\`\`\`jsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Content that adapts to theme
</div>
\`\`\`

## Performance Considerations

1. **Purge unused styles** in production
2. **Use @apply** for repeated patterns
3. **Leverage CSS custom properties** for dynamic values
4. **Minimize bundle size** with proper configuration

Tailwind CSS makes it easy to create consistent, beautiful interfaces while maintaining excellent performance.`,
        coverImage: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=400&fit=crop',
        published: true,
        featured: false,
        views: 675,
        readTime: 10,
        publishedAt: new Date('2024-01-25'),
        authorId: adminId,
        categories: [categoryResults.insertedIds[2]], // UI/UX Design
        tags: [tagResults.insertedIds[5]], // Tailwind CSS
        createdAt: new Date('2024-01-22'),
        updatedAt: new Date('2024-01-25'),
      },
      {
        title: 'Deploying Full-Stack Apps to AWS',
        slug: 'deploying-fullstack-apps-aws',
        excerpt: 'Complete guide to deploying modern web applications on AWS with best practices for scalability and cost optimization.',
        content: `# Deploying Full-Stack Apps to AWS

Amazon Web Services (AWS) provides a comprehensive suite of tools for deploying modern web applications. This guide covers the essential services and best practices.

## Core AWS Services for Web Apps

### Compute
- **EC2**: Virtual servers for traditional deployments
- **ECS/Fargate**: Container orchestration without managing servers
- **Lambda**: Serverless functions for API endpoints
- **Amplify**: Complete hosting solution for web apps

### Storage
- **S3**: Object storage for static assets
- **RDS**: Managed relational databases
- **DynamoDB**: NoSQL database for high-performance apps
- **ElastiCache**: In-memory caching

### Networking
- **CloudFront**: CDN for global content delivery
- **API Gateway**: Managed API endpoints
- **Route 53**: DNS management
- **VPC**: Isolated network environments

## Deployment Strategies

### Option 1: Vercel + AWS (Recommended for Next.js)
\`\`\`bash
# Deploy Next.js to Vercel
vercel --prod

# Use AWS RDS for database
# Configure environment variables
\`\`\`

### Option 2: AWS Amplify
\`\`\`bash
# Initialize Amplify project
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
\`\`\`

## Cost Optimization

1. **Use reserved instances** for predictable workloads
2. **Implement auto-scaling** to handle traffic spikes
3. **Use CloudFront** to reduce data transfer costs
4. **Monitor usage** with AWS Cost Explorer
5. **Clean up unused resources** regularly

## Security Best Practices

1. **Use IAM roles** instead of access keys
2. **Enable encryption** for data at rest and in transit
3. **Implement WAF** for application protection
4. **Regular security audits** and updates
5. **Use AWS Config** for compliance monitoring

AWS provides the scalability and reliability needed for production applications.`,
        coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
        published: true,
        featured: false,
        views: 542,
        readTime: 15,
        publishedAt: new Date('2024-02-01'),
        authorId: adminId,
        categories: [categoryResults.insertedIds[3]], // DevOps
        tags: [tagResults.insertedIds[6]], // AWS
        createdAt: new Date('2024-01-28'),
        updatedAt: new Date('2024-02-01'),
      },
      {
        title: 'TypeScript Best Practices for Large Applications',
        slug: 'typescript-best-practices-large-applications',
        excerpt: 'Advanced TypeScript patterns and practices for building maintainable, scalable applications with thousands of lines of code.',
        content: `# TypeScript Best Practices for Large Applications

TypeScript provides excellent tooling for building large-scale applications. This guide covers advanced patterns and best practices.

## Type System Architecture

### Global Types
Create a centralized types directory:

\`\`\`typescript
// types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  published: boolean;
}
\`\`\`

### Generic Constraints
Use generics effectively:

\`\`\`typescript
interface Repository<T extends { id: string }> {
  findById(id: string): Promise<T | null>;
  save(entity: T): Promise<T>;
  delete(id: string): Promise<void>;
}

class UserRepository implements Repository<User> {
  // Implementation
}
\`\`\`

## Module Organization

### Feature-Based Structure
\`\`\`
src/
├── features/
│   ├── auth/
│   │   ├── types.ts
│   │   ├── api.ts
│   │   ├── components/
│   │   └── hooks/
│   └── posts/
│       ├── types.ts
│       ├── api.ts
│       ├── components/
│       └── hooks/
├── shared/
│   ├── types/
│   ├── utils/
│   └── components/
\`\`\`

## Error Handling

### Result Types
Implement proper error handling:

\`\`\`typescript
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

async function createUser(userData: UserInput): Promise<Result<User>> {
  try {
    const user = await db.users.create(userData);
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}
\`\`\`

## Performance Considerations

1. **Use const assertions** for large objects
2. **Implement proper lazy loading**
3. **Use discriminated unions** for type safety
4. **Avoid any type** at all costs
5. **Leverage utility types** (Partial, Pick, Omit, etc.)

TypeScript's type system becomes increasingly valuable as applications grow in complexity.`,
        coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
        published: true,
        featured: false,
        views: 723,
        readTime: 14,
        publishedAt: new Date('2024-02-05'),
        authorId: adminId,
        categories: [categoryResults.insertedIds[0]], // Web Development
        tags: [tagResults.insertedIds[2]], // TypeScript
        createdAt: new Date('2024-02-03'),
        updatedAt: new Date('2024-02-05'),
      },
      {
        title: 'Building Mobile Apps with React Native',
        slug: 'building-mobile-apps-react-native',
        excerpt: 'Complete guide to developing cross-platform mobile applications using React Native and modern development practices.',
        content: `# Building Mobile Apps with React Native

React Native enables developers to build native mobile apps using JavaScript and React. This comprehensive guide covers everything you need to know.

## Why React Native?

- **Cross-platform**: Single codebase for iOS and Android
- **Native performance**: Compiled to native code
- **Hot reloading**: Instant updates during development
- **Large ecosystem**: Extensive library support

## Project Setup

\`\`\`bash
# Create new React Native project
npx react-native@latest init MyMobileApp

# Or use Expo for easier development
npx create-expo-app MyExpoApp
\`\`\`

## Core Concepts

### Components
React Native uses different components than web React:

\`\`\`jsx
import { View, Text, StyleSheet } from 'react-native';

function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
\`\`\`

### Navigation
Use React Navigation for app navigation:

\`\`\`jsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
\`\`\`

## State Management

### Context API
For simple state management:

\`\`\`jsx
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
\`\`\`

### Redux Toolkit
For complex applications:

\`\`\`jsx
import { configureStore, createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 },
  },
});

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});
\`\`\`

## Performance Optimization

1. **Use FlatList** for long lists
2. **Implement pagination** for large datasets
3. **Optimize images** and assets
4. **Use Hermes** JavaScript engine
5. **Profile with Flipper**

React Native provides the tools to build high-quality mobile applications efficiently.`,
        coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
        published: true,
        featured: false,
        views: 456,
        readTime: 16,
        publishedAt: new Date('2024-02-10'),
        authorId: adminId,
        categories: [categoryResults.insertedIds[1]], // Mobile Apps
        tags: [tagResults.insertedIds[0]], // React
        createdAt: new Date('2024-02-08'),
        updatedAt: new Date('2024-02-10'),
      },
      {
        title: 'Docker for Development and Deployment',
        slug: 'docker-development-deployment',
        excerpt: 'Master Docker containerization for consistent development environments and streamlined deployment pipelines.',
        content: `# Docker for Development and Deployment

Docker has revolutionized how we develop and deploy applications. This guide covers essential Docker concepts and best practices.

## Why Docker?

- **Consistency**: Same environment everywhere
- **Isolation**: No dependency conflicts
- **Scalability**: Easy horizontal scaling
- **Portability**: Run anywhere

## Dockerfile Best Practices

### Multi-stage Builds
Reduce final image size:

\`\`\`dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Production stage
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

### Layer Caching
Order commands for optimal caching:

\`\`\`dockerfile
# Copy package files first
COPY package*.json ./
RUN npm install

# Copy source code after
COPY . .
\`\`\`

## Docker Compose for Development

\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
\`\`\`

## Development Workflow

1. **Local development** with hot reloading
2. **Testing** in isolated containers
3. **CI/CD pipelines** with Docker
4. **Production deployment** with orchestration

## Security Considerations

1. **Use official images** as base
2. **Run as non-root user**
3. **Scan images** for vulnerabilities
4. **Keep images updated**
5. **Use secrets** for sensitive data

Docker simplifies the entire development-to-production pipeline.`,
        coverImage: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=400&fit=crop',
        published: true,
        featured: false,
        views: 389,
        readTime: 11,
        publishedAt: new Date('2024-02-15'),
        authorId: adminId,
        categories: [categoryResults.insertedIds[3]], // DevOps
        tags: [tagResults.insertedIds[7]], // Docker
        createdAt: new Date('2024-02-12'),
        updatedAt: new Date('2024-02-15'),
      },
      {
        title: 'API Design Principles and Best Practices',
        slug: 'api-design-principles-best-practices',
        excerpt: 'Learn how to design robust, scalable, and maintainable APIs that provide excellent developer experience.',
        content: `# API Design Principles and Best Practices

Well-designed APIs are crucial for modern web applications. This guide covers the principles and practices for building excellent APIs.

## RESTful Design Principles

### Resource-Based URLs
Use nouns for resources, not verbs:

\`\`\`
✅ Good
GET /api/users/123
POST /api/users
PUT /api/users/123
DELETE /api/users/123

❌ Bad
GET /api/getUser/123
POST /api/createUser
PUT /api/updateUser/123
DELETE /api/deleteUser/123
\`\`\`

### HTTP Methods
Use appropriate HTTP methods:

- **GET**: Retrieve resources
- **POST**: Create new resources
- **PUT**: Update entire resources
- **PATCH**: Partial updates
- **DELETE**: Remove resources

## Response Formats

### Consistent Structure
Always return consistent response formats:

\`\`\`json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "errors": null
}
\`\`\`

### Error Handling
Provide meaningful error responses:

\`\`\`json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "email": "Must be a valid email address"
    }
  }
}
\`\`\`

## Authentication & Authorization

### JWT Tokens
Secure your APIs with JWT:

\`\`\`javascript
const token = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);
\`\`\`

### Rate Limiting
Protect against abuse:

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});
\`\`\`

## Documentation

### OpenAPI Specification
Document your APIs properly:

\`\`\`yaml
openapi: 3.0.0
info:
  title: My API
  version: 1.0.0
paths:
  /users:
    get:
      summary: Get all users
      responses:
        '200':
          description: Successful response
\`\`\`

## Performance Optimization

1. **Pagination** for large datasets
2. **Caching** with appropriate headers
3. **Compression** (gzip)
4. **Database indexing**
5. **Connection pooling**

## Versioning

Handle API evolution gracefully:

\`\`\`
/api/v1/users
/api/v2/users
\`\`\`

Or use headers:

\`\`\`
Accept: application/vnd.myapi.v2+json
\`\`\`

Well-designed APIs provide excellent developer experience and ensure long-term maintainability.`,
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
        published: true,
        featured: false,
        views: 612,
        readTime: 13,
        publishedAt: new Date('2024-02-20'),
        authorId: adminId,
        categories: [categoryResults.insertedIds[0]], // Web Development
        tags: [tagResults.insertedIds[3]], // Node.js
        createdAt: new Date('2024-02-18'),
        updatedAt: new Date('2024-02-20'),
      }
    ];

    const postResults = await db.collection('posts').insertMany(posts);
    console.log('📝 Created 7 blog posts');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`- 1 Admin user created`);
    console.log(`- ${categories.length} Categories created`);
    console.log(`- ${tags.length} Tags created`);
    console.log(`- ${posts.length} Posts created`);

    console.log('\n🔐 Admin Login:');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the seed function
seedDatabase();