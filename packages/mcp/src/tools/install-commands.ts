import { resolveDependencies } from '../registry/resolver';

export function handleGetInstallCommands(params: {
  target: string;
  type?: 'component' | 'block' | 'template' | undefined;
  method?: 'cli' | 'npm' | 'pnpm' | 'yarn' | undefined;
}) {
  const { target, type = 'component', method = 'cli' } = params;
  const resolution = resolveDependencies(target, type ?? 'component');

  if (method === 'cli' || !method) {
    const cliCmd =
      type === 'block'
        ? `npx soraui add block ${target}`
        : type === 'template'
        ? `npx soraui add template ${target}`
        : `npx soraui add ${target}`;

    return {
      target,
      type: type ?? 'component',
      method: 'cli',
      command: cliCmd,
      dependenciesToInstall: resolution.resolvedComponents,
      notes: 'Copies component/block code directly into your local components directory (Own Your UI).',
    };
  }

  const pkgManager = method === 'yarn' ? 'yarn add' : method === 'pnpm' ? 'pnpm add' : 'npm install';
  const npmCmd = `${pkgManager} @soraui/react @soraui/core @soraui/hooks`;

  return {
    target,
    type: type ?? 'component',
    method,
    command: npmCmd,
    dependenciesToInstall: resolution.resolvedComponents,
    notes: 'Installs compiled pre-packaged SoraUI SDK into node_modules.',
  };
}
