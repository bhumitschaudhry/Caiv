#!/usr/bin/env node
import * as p from '@clack/prompts';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import pc from 'picocolors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SKILL_CONTENT = fs.readFileSync(path.join(__dirname, 'SKILL.md'), 'utf8');

async function main() {
  p.intro(pc.bgCyan(pc.black(' GET-CAIV Installer ')));

  const projectDir = process.cwd();
  const homeDir = os.homedir();

  const tools = [
    { value: 'pi', label: 'Pi / GSD', hint: 'Installs as a global skill' },
    { value: 'claudecode', label: 'Claude Code', hint: 'Appends to ~/.clauderules' },
    { value: 'cursor', label: 'Cursor', hint: 'Appends to .cursorrules in current project' },
    { value: 'windsurf', label: 'Windsurf', hint: 'Appends to .windsurfrules in current project' },
    { value: 'gemini', label: 'Gemini CLI', hint: 'Installs to ~/.gemini/skills' },
    { value: 'antigravity', label: 'Antigravity', hint: 'Installs to ~/.antigravity/skills' },
    { value: 'opencode', label: 'Opencode', hint: 'Installs to ~/.opencode/skills' },
    { value: 'codex', label: 'Codex', hint: 'Installs to ~/.codex/skills' },
  ];

  const selectedTools = await p.multiselect({
    message: 'Select tools to install CAIV to:',
    options: [
      { value: 'all', label: 'Install to ALL tools', hint: 'Recommended' },
      ...tools
    ],
    required: true,
  });

  if (p.isCancel(selectedTools)) {
    p.cancel('Installation cancelled.');
    process.exit(0);
  }

  const selection = selectedTools as string[];
  const toolsToInstall = selection.includes('all') 
    ? tools.map(t => t.value) 
    : selection;

  const s = p.spinner();
  s.start('Installing CAIV...');

  for (const tool of toolsToInstall) {
    try {
      switch (tool) {
        case 'pi':
          const piPath = path.join(homeDir, '.agents', 'skills', 'get-caiv');
          if (!fs.existsSync(piPath)) fs.mkdirSync(piPath, { recursive: true });
          fs.writeFileSync(path.join(piPath, 'SKILL.md'), SKILL_CONTENT);
          break;
        case 'claudecode':
          const claudePath = path.join(homeDir, '.clauderules');
          appendToFile(claudePath, SKILL_CONTENT);
          break;
        case 'cursor':
          const cursorPath = path.join(projectDir, '.cursorrules');
          appendToFile(cursorPath, SKILL_CONTENT);
          break;
        case 'windsurf':
          const windsurfPath = path.join(projectDir, '.windsurfrules');
          appendToFile(windsurfPath, SKILL_CONTENT);
          break;
        case 'gemini':
          const geminiPath = path.join(homeDir, '.gemini', 'skills');
          if (!fs.existsSync(geminiPath)) fs.mkdirSync(geminiPath, { recursive: true });
          fs.writeFileSync(path.join(geminiPath, 'get-caiv.md'), SKILL_CONTENT);
          break;
        case 'antigravity':
          const antiPath = path.join(homeDir, '.antigravity', 'skills');
          if (!fs.existsSync(antiPath)) fs.mkdirSync(antiPath, { recursive: true });
          fs.writeFileSync(path.join(antiPath, 'get-caiv.md'), SKILL_CONTENT);
          break;
        case 'opencode':
          const openPath = path.join(homeDir, '.opencode', 'skills');
          if (!fs.existsSync(openPath)) fs.mkdirSync(openPath, { recursive: true });
          fs.writeFileSync(path.join(openPath, 'get-caiv.md'), SKILL_CONTENT);
          break;
        case 'codex':
          const codexPath = path.join(homeDir, '.codex', 'skills');
          if (!fs.existsSync(codexPath)) fs.mkdirSync(codexPath, { recursive: true });
          fs.writeFileSync(path.join(codexPath, 'get-caiv.md'), SKILL_CONTENT);
          break;
      }
    } catch (err: any) {
      p.log.error(`Failed to install to ${tool}: ${err.message}`);
    }
  }

  s.stop('Installation complete!');

  p.note(
    pc.green('CAIV is now installed.') + 
    '\n' + 
    'To toggle it, just send ' + pc.bold('/caiv') + ' in your tool\'s chat.',
    'Ready to vibe'
  );

  p.outro(pc.cyan('Keep it brief. Happy coding!'));
}

function appendToFile(filePath: string, content: string) {
  const markerStart = '# --- CAIV SKILL ---';
  const markerEnd = '# --- END CAIV SKILL ---';
  
  let existingContent = '';
  if (fs.existsSync(filePath)) {
    existingContent = fs.readFileSync(filePath, 'utf8');
  }

  // Remove any previous versions using the markers
  const regex = new RegExp(`\\n?${markerStart}[\\s\\S]*?${markerEnd}\\n?`, 'g');
  const cleanedContent = existingContent.replace(regex, '').trim();

  const newBlock = `\n\n${markerStart}\n${content}\n${markerEnd}\n`;
  const finalContent = cleanedContent ? cleanedContent + newBlock : newBlock.trimStart();
  
  fs.writeFileSync(filePath, finalContent);
}

main().catch(console.error);
