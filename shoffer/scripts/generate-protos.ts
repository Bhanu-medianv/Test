// scripts/generate-protos.ts

// Import required modules
import { execSync } from 'child_process';           // To run terminal commands
import { readdirSync, writeFileSync, statSync } from 'fs';  // To read/write files and check file stats
import { join, extname, basename } from 'path';     // To handle path operations

// Define the directory where your .proto files are located
const PROTO_DIR = join(__dirname, '../libs/assets/protos');

// 🔍 Recursively find all .proto files in the given directory
function findProtoFiles(dir: string): string[] {
  const entries = readdirSync(dir); // Read directory contents
  let files: string[] = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry); // Full path of current entry
    const stat = statSync(fullPath);   // Get file/directory info

    if (stat.isDirectory()) {
      // If it's a folder, search inside it (recursive)
      files = files.concat(findProtoFiles(fullPath));
    } else if (extname(fullPath) === '.proto') {
      // If it's a .proto file, add to the list
      files.push(fullPath);
    }
  }
  return files;
}

// 🛠 Use ts-proto to generate TypeScript definitions from the proto file
function generateTypes(protoPath: string) {
  execSync(
    `npx protoc \
    --plugin=protoc-gen-ts_proto=${join(__dirname, '../node_modules/.bin/protoc-gen-ts_proto')} \
    --ts_proto_out=${PROTO_DIR} \
    --ts_proto_opt=outputServices=grpc-js,outputClientImpl=grpc-js \
    --proto_path=${PROTO_DIR} ${protoPath}`,
    { stdio: 'inherit' } // Show output in the terminal
  );
}

// 📦 Create an index.ts in a given directory to export all generated files
function createIndexFile(dir: string) {
  const entries = readdirSync(dir); // List all files in the directory

  // Filter out only .ts files (excluding existing index.ts)
  const tsFiles = entries.filter(
    (f) => f.endsWith('.ts') && f !== 'index.ts'
  );

  if (tsFiles.length === 0) {
    return; // If there are no .ts files, skip
  }

  // Generate export lines like: export * from './filename';
  const exports = tsFiles
    .map((f) => `export * from './${basename(f, '.ts')}';`)
    .join('\n');

  // Write index.ts with all exports
  writeFileSync(join(dir, 'index.ts'), exports + '\n');
}

// 📂 Create a root index.ts that exports all subdirectories in /proto
function updateRootIndexFile() {
  const subDirs = readdirSync(PROTO_DIR).filter((f) =>
    statSync(join(PROTO_DIR, f)).isDirectory()
  );

  // Generate exports like: export * from './user';
  const exports = subDirs
    .map((subDir) => `export * from './${subDir}';`)
    .join('\n');

  // Write to root proto/index.ts
  writeFileSync(join(PROTO_DIR, 'index.ts'), exports + '\n');
}

// 🚀 Main function to run the generation script
function main() {
  const protoFiles = findProtoFiles(PROTO_DIR); // Step 1: Find all .proto files

  const generatedDirs = new Set<string>(); // Track which directories have generated files

  // Step 2: Generate TypeScript code for each proto file
  for (const protoFile of protoFiles) {
    generateTypes(protoFile);
    const dir = join(protoFile, '..'); // Get the directory of this proto file
    generatedDirs.add(dir);            // Mark this directory for index.ts creation
  }

  // Step 3: Create/update index.ts in each directory with generated files
  for (const dir of generatedDirs) {
    createIndexFile(dir);
  }

  // Step 4: Update the root index.ts to export all proto directories
  updateRootIndexFile();
}

// Call the main function to run the script
main();
