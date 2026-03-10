import { db, sql } from "astro:db";
import fs from "fs";
import path from "path";

export default async function () {
  console.log("Applying prices from clean-pricing.sql...");

  const sqlFile = path.join(process.cwd(), "clean-pricing.sql");
  if (!fs.existsSync(sqlFile)) {
    console.error("clean-pricing.sql not found at", sqlFile);
    process.exit(1);
  }

  const sqlContent = fs.readFileSync(sqlFile, "utf-8");

  // Split by semicolons, but ignore semicolons inside comments or strings
  // A simple split by ';' followed by newline works for this specific file format
  const statements = sqlContent
    .split(";")
    .map((stmt) => stmt.trim())
    .filter((stmt) => stmt.length > 0 && !stmt.startsWith("-- =")); // Filter out empty and just separator comments

  console.log(`Found ${statements.length} SQL statements to execute.`);

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < statements.length; i++) {
    let stmt = statements[i];

    // Ensure statement ends with semicolon if it doesn't have one
    if (!stmt.endsWith(";")) {
      stmt += ";";
    }

    console.log(`\nExecuting statement ${i + 1}/${statements.length}...`);

    try {
      await db.run(sql.raw(stmt));
      console.log("✅ Success");
      successCount++;
    } catch (error) {
      console.error("❌ Error executing statement:");
      console.error(stmt);
      console.error(error);
      errorCount++;
    }
  }

  console.log(`\n--- Execution Summary ---`);
  console.log(`Total statements: ${statements.length}`);
  console.log(`Successful: ${successCount}`);
  console.log(`Errors: ${errorCount}`);

  if (errorCount > 0) {
    process.exit(1);
  }
}
