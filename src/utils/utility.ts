import fs from "fs";
import path from "path";

export function loadTemplate(templateName: string, vars: any = {}) {
  const templatePath = path.join(process.cwd(), "src", "templates", templateName);

  let html = fs.readFileSync(templatePath, "utf8");
  // Replace all {{PLACEHOLDER}} occurrences
  for (const key in vars) {
    const value = vars[key];
    const regex = new RegExp(`{{${key}}}`, "g");
    html = html.replace(regex, value);
  }

  return html;
}

export const convertStringAmountToNumber = (amount: string): number => {
  const numericString = amount.replace(/[^0-9.]/g, "");
  return parseFloat(numericString);
};
