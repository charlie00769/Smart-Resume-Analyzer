const fs = require("fs");
const pdfParse = require("pdf-parse");

const skillsDB = [
  "python",
  "java",
  "javascript",
  "react",
  "node.js",
  "mongodb",
  "machine learning",
  "sql",
  "html",
  "css",
];

const analyzeResume = async (filePath) => {

  const dataBuffer = fs.readFileSync(filePath);

  const pdfData = await pdfParse(dataBuffer);

  const text = pdfData.text.toLowerCase();

  let foundSkills = [];

  skillsDB.forEach((skill) => {
    if (text.includes(skill)) {
      foundSkills.push(skill);
    }
  });

  const atsScore = Math.min(foundSkills.length * 10, 100);

  return {
    atsScore,
    skills: foundSkills,
  };
};

module.exports = analyzeResume;