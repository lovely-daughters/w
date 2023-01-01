import path from "path";
import fs from "fs";

const shuffle = (unshuffled: Array<any>) => {
  return unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const fileNames = [
  "hsk1.txt",
  "hsk2.txt",
  "hsk3.txt",
  "hsk4.txt",
  "hsk5.txt",
  "hsk6.txt",
];

const seenCharacterGroups = new Set<string>();
fileNames.forEach((fileName) => {
  console.log(fileName);

  const filePath = path.join(__dirname, "original", fileName);
  const fileBuffer = fs.readFileSync(filePath);

  const fileString = fileBuffer.toString();
  const regexp = /(\p{Script=Han}+)\s+(\p{Script=Han}+)/gu;
  const matches = [...fileString.matchAll(regexp)];

  const characterGroups = new Set<string>();
  matches.forEach((match) => {
    const simplified = match[1];
    const traditional = match[2];

    if (simplified.length == traditional.length) {
      for (var index = 0; index < simplified.length; index++) {
        const characterGroup = `${simplified[index]}${traditional[index]}`;
        if (!seenCharacterGroups.has(characterGroup)) {
          characterGroups.add(characterGroup);
          seenCharacterGroups.add(characterGroup);
        }
      }
    }
  });
  const cgArray = [...characterGroups.values()];
  const shuffledCGArray = shuffle(cgArray);

  for (const cg of shuffledCGArray) {
    console.log(cg);
  }
});
