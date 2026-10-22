// Publishes the site to GitHub Pages: `npm run publish:pages`.
//
// Builds the static site with the repository name as base path (project sites live at
// https://<user>.github.io/<repo>/), then force-pushes the contents of out/ to the gh-pages
// branch, which GitHub Pages serves. Uses your existing git credentials; no workflow needed.
// Set SITE_URL first if the site has a custom domain.
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "out");
const run = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", cwd: ROOT, ...opts });
const read = (cmd, cwd = ROOT) => execSync(cmd, { cwd }).toString().trim();

const remote = read("git remote get-url origin");
const match = remote.match(/github\.com[/:]([^/]+)\/([^/.]+)(\.git)?$/);
if (!match) throw new Error(`origin is not a GitHub repository: ${remote}`);
const [, owner, repo] = match;

const custom = process.env.SITE_URL;
const basePath = custom ? "" : `/${repo}`;
const siteUrl = custom || `https://${owner.toLowerCase()}.github.io`;
const commit = read("git rev-parse --short HEAD");

console.log(`Building for ${siteUrl}${basePath}/ ...`);
run("npm run build", { env: { ...process.env, NEXT_PUBLIC_BASE_PATH: basePath, SITE_URL: siteUrl } });

// Without this file GitHub Pages runs Jekyll, which drops the _next/ folder.
fs.writeFileSync(path.join(OUT, ".nojekyll"), "");

console.log("Pushing out/ to the gh-pages branch ...");
fs.rmSync(path.join(OUT, ".git"), { recursive: true, force: true });
const git = (cmd) => run(`git ${cmd}`, { cwd: OUT });
git("init -q -b gh-pages");
git("add -A");
git(`-c user.name="${read("git config user.name")}" -c user.email="${read("git config user.email")}" commit -q -m "Publish site from ${commit}"`);
git(`push --force --quiet ${remote} gh-pages`);
fs.rmSync(path.join(OUT, ".git"), { recursive: true, force: true });

console.log(`Done. Live in a minute or two at ${siteUrl}${basePath}/`);
