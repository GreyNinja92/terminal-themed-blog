'use client';

import { useState, useMemo, useCallback } from 'react';
import { ShellProvider, useShell } from './ShellContext';
import BootSequence from './BootSequence';
import TitleBar from './TitleBar';
import StatusBar from './StatusBar';
import CommandPalette, { Command } from './CommandPalette';
import Toast from './Toast';
import MatrixRain from './MatrixRain';
import Snake from './Snake';
import HomeScreen from '@/components/home/HomeScreen';
import ContactScreen from '@/components/home/ContactScreen';
import WritingScreen from '@/components/writing/WritingScreen';
import { SITE } from '@/lib/data';

function ShellInner() {
  const [booted, setBooted] = useState(false);
  const {
    tab, setTab, theme, setTheme, matrix, setMatrix,
    palette, setPalette, snake, setSnake,
    toast, showToast, fortune, uptime,
    focusedProject, setFocused,
  } = useShell();

  const cmds = useMemo<Command[]>(() => [
    { id: 'home',     label: 'go home (~)',            icon: '❯', hint: 'about + work',     run: () => setTab('home') },
    { id: 'writing',  label: 'go to ~/writing',        icon: '❯', hint: 'blog',             run: () => setTab('writing') },
    { id: 'contact',  label: 'go to ~/contact',        icon: '❯', hint: 'how to reach me',  run: () => setTab('contact') },
    { id: 'resume',   label: 'download résumé',        icon: '↓', hint: 'resume.pdf',       run: () => { window.open(SITE.links.resume, '_blank'); showToast('↓ RÉSUMÉ', 'opening resume.pdf…'); } },
    { id: 'github',   label: 'open GitHub',            icon: '↗', hint: '@GreyNinja92',     run: () => window.open(SITE.links.github, '_blank') },
    { id: 'linkedin', label: 'open LinkedIn',          icon: '↗', hint: 'in/saksham',       run: () => window.open(SITE.links.linkedin, '_blank') },
    { id: 'twitter',  label: 'open Twitter',           icon: '↗', hint: '@sakshamkhatod',   run: () => window.open(SITE.links.twitter, '_blank') },
    { id: 'email',    label: 'email me',               icon: '✉', hint: SITE.email,         run: () => window.open('mailto:' + SITE.email) },
    { id: 't-green',  label: 'theme: green (phosphor)',icon: '◉', hint: 'default',          run: () => setTheme('green') },
    { id: 't-amber',  label: 'theme: amber (CRT)',     icon: '◉', hint: '80s',              run: () => setTheme('amber') },
    { id: 't-blue',   label: 'theme: blue',            icon: '◉', hint: 'cool',             run: () => setTheme('blue') },
    { id: 'matrix',   label: 'toggle matrix rain',     icon: '⟐', hint: 'why not',          run: () => setMatrix((m) => !m) },
    { id: 'fortune',  label: 'random fortune',         icon: '◈', hint: 'wisdom',           run: fortune },
    { id: 'snake',    label: 'play snake',             icon: '◼', hint: 'esc to quit',      run: () => setSnake(true) },
    { id: 'sudo',     label: 'sudo make me a sandwich',icon: '⚠', hint: 'no',               run: () => showToast('PERMISSION DENIED', 'saksham is not in the sudoers file. this incident will be reported.') },
    { id: 'whoami',   label: 'whoami',                 icon: '?', hint: 'obviously',        run: () => showToast('WHOAMI', `${SITE.name} · ${SITE.role} @ ${SITE.company}`) },
    { id: 'coffee',   label: '☕ buy me a coffee',     icon: '☕', hint: 'caffeine',         run: () => showToast('☕ THANKS', 'appreciated — but a conversation is worth more. email me.') },
    { id: 'help',     label: 'help',                   icon: '?', hint: 'keyboard',         run: () => showToast('HELP', '⌘K palette · j/k in blog · / search · ESC close · try the konami code') },
  ], [fortune, showToast, setTab, setTheme, setMatrix, setSnake]);

  if (!booted) return <BootSequence onDone={() => setBooted(true)}/>;

  return (
    <div
      className="crt"
      style={{ display: 'grid', gridTemplateRows: '38px 1fr 22px', height: '100vh', overflow: 'hidden' }}
    >
      <TitleBar
        tab={tab} setTab={setTab}
        theme={theme} setTheme={setTheme}
        onFortune={fortune}
        onMatrix={() => setMatrix((m) => !m)}
        matrix={matrix}
        uptime={uptime}
        onPalette={() => setPalette((p) => !p)}
      />
      <div key={tab} className="fade-in" style={{ minHeight: 0, overflow: 'hidden' }}>
        {tab === 'home'    && <HomeScreen openTab={setTab} focusedProject={focusedProject} setFocused={setFocused}/>}
        {tab === 'writing' && <WritingScreen showToast={showToast}/>}
        {tab === 'contact' && <ContactScreen/>}
      </div>
      <StatusBar tab={tab}/>
      <CommandPalette open={palette} onClose={() => setPalette(false)} cmds={cmds}/>
      <MatrixRain on={matrix}/>
      <Toast toast={toast}/>
      {snake && <Snake onClose={() => setSnake(false)}/>}
    </div>
  );
}

export default function AppShell() {
  return (
    <ShellProvider>
      <ShellInner/>
    </ShellProvider>
  );
}
