import path from "path";

/**
 * Upload file using input[type="file"]
 *
 * @param {Page} page
 * @param {string} inputLocator
 * @param {string} filePath (relative or absolute)
 
    //Usage
    await uploadFile(page, "#fileUpload", "files/document.pdf");
    
 */
async function uploadFile(page, inputLocator, filePath) {
  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(process.cwd(), filePath);

  const fileInput = page.locator(inputLocator);
  await fileInput.waitFor({ state: "attached" });

  await fileInput.setInputFiles(absolutePath);
}

module.exports = { uploadFile };