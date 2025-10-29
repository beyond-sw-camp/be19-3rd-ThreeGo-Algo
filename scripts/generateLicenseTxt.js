// scripts/generateLicenseTxt.js
import { execSync } from "child_process";
import fs from "fs";

// license-checker 실행해서 JSON 형태로 받기
console.log("라이선스 정보를 수집 중입니다...");
const result = execSync("npx license-checker --production --json", {
    encoding: "utf8",
});

const licenses = JSON.parse(result);

// 2️LICENSE.txt 문자열로 정리
let output = `
Algo Open Source Licenses
© 2025 ThreeGo. All rights reserved.

This software uses open source libraries distributed under various licenses.
Details of each license are provided below.
`;
output += "=====================================================\n\n";

Object.entries(licenses).forEach(([pkg, info]) => {
    output += `Package: ${pkg}\n`;
    output += `License: ${info.licenses || "Unknown"}\n`;
    if (info.repository) output += `Repository: ${info.repository}\n`;
    if (info.publisher) output += `Author: ${info.publisher}\n`;
    output += "-----------------------------------------------------\n";
});

// 3️LICENSE.txt 파일로 저장
fs.writeFileSync("LICENSE.txt", output, "utf8");
console.log("LICENSE.txt 파일이 성공적으로 생성되었습니다!");
